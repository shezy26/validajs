/**
 * Rule Engine
 * Manages and executes validation rules
 */

import * as rules from "./index.js";

export class RuleEngine {
  constructor() {
    this.rules = new Map();
    this.registerDefaultRules();
  }

  registerDefaultRules() {
    for (const [name, ruleFn] of Object.entries(rules)) {
      this.register(name, ruleFn);
    }
  }

  register(name, validator) {
    if (typeof validator !== "function") {
      throw new Error(`Validator for rule "${name}" must be a function`);
    }
    this.rules.set(name, validator);
  }

  validate(ruleName, value, params = [], allValues = {}, fieldName = "") {
    const validator = this.rules.get(ruleName);

    if (!validator) {
      console.warn(`Validation rule "${ruleName}" not found`);
      return true;
    }

    try {
      return validator(value, params, allValues, fieldName);
    } catch (error) {
      console.error(`Error executing validation rule "${ruleName}":`, error);
      return false;
    }
  }

  has(ruleName) {
    return this.rules.has(ruleName);
  }

  getAllRules() {
    return Array.from(this.rules.keys());
  }

  unregister(ruleName) {
    return this.rules.delete(ruleName);
  }
}
