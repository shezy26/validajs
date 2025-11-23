/**
 * ValidaJS Core Validator
 * Framework-agnostic validation engine
 */

import { RuleEngine } from "../rules/RuleEngine.js";
import { parseRule } from "../utils/parser.js";
import { defaultMessages } from "../utils/messages.js";

export class Validator {
  constructor(schema, options = {}) {
    this.schema = schema;
    this.options = {
      realtime: true,
      validateOnBlur: true,
      validateOnInput: true,
      validateOnSubmit: true,
      messages: {},
      ...options,
    };

    this.ruleEngine = new RuleEngine();
    this.errors = {};
    this.touched = {};
    this.values = {};
    this.customMessages = { ...defaultMessages, ...this.options.messages };
  }

  validateField(fieldName, value, allValues = {}) {
    const rules = this.schema[fieldName];

    if (!rules || !Array.isArray(rules)) {
      return null;
    }

    delete this.errors[fieldName];

    for (const rule of rules) {
      const { name, params } = parseRule(rule);
      const isValid = this.ruleEngine.validate(
        name,
        value,
        params,
        allValues,
        fieldName
      );

      if (!isValid) {
        this.errors[fieldName] = this.getErrorMessage(fieldName, name, params);
        break;
      }
    }

    return this.errors[fieldName] || null;
  }

  validateAll(values) {
    this.errors = {};
    this.values = values;

    for (const fieldName in this.schema) {
      const value = values[fieldName];
      this.validateField(fieldName, value, values);
    }

    return {
      isValid: Object.keys(this.errors).length === 0,
      errors: this.errors,
    };
  }

  getErrorMessage(fieldName, ruleName, params) {
    const customKey = `${fieldName}.${ruleName}`;
    if (this.customMessages[customKey]) {
      return this.formatMessage(
        this.customMessages[customKey],
        fieldName,
        params
      );
    }

    if (this.customMessages[ruleName]) {
      return this.formatMessage(
        this.customMessages[ruleName],
        fieldName,
        params
      );
    }

    const defaultMessage =
      defaultMessages[ruleName] || "The :attribute field is invalid.";
    return this.formatMessage(defaultMessage, fieldName, params);
  }

  formatMessage(message, fieldName, params = []) {
    let formatted = message.replace(
      ":attribute",
      this.formatFieldName(fieldName)
    );

    // Replace specific parameter placeholders first
    if (params.length > 0) {
      formatted = formatted.replace(":min", params[0]);
      formatted = formatted.replace(":size", params[0]);
      formatted = formatted.replace(":other", params[0]);
      formatted = formatted.replace(":date", params[0]);
      formatted = formatted.replace(":digits", params[0]);
      formatted = formatted.replace(":value", params[0]);
    }

    if (params.length > 1) {
      formatted = formatted.replace(":max", params[1]);
    }

    // Replace generic parameter placeholders
    params.forEach((param, index) => {
      formatted = formatted.replace(`:param${index}`, param);
    });

    // Replace :values with comma-separated list
    if (params.length > 0) {
      formatted = formatted.replace(":values", params.join(", "));
    }

    return formatted;
  }

  formatFieldName(fieldName) {
    return fieldName
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  touch(fieldName) {
    this.touched[fieldName] = true;
  }

  isTouched(fieldName) {
    return !!this.touched[fieldName];
  }

  getAllValues() {
    return this.values;
  }

  clearErrors() {
    this.errors = {};
  }

  clearFieldError(fieldName) {
    delete this.errors[fieldName];
  }

  getErrors() {
    return this.errors;
  }

  hasErrors() {
    return Object.keys(this.errors).length > 0;
  }

  getFieldError(fieldName) {
    return this.errors[fieldName] || null;
  }

  reset() {
    this.errors = {};
    this.touched = {};
    this.values = {};
  }
}
