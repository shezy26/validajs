/**
 * ValidaJS - Vanilla JavaScript Adapter
 * DOM-based form validation
 */

import { Validator } from "../core/Validator.js";
import { normalizeSchema } from "../utils/parser.js";

export class ValidaJS extends Validator {
  constructor(formSelector, schema, options = {}) {
    // Don't call super yet if we need to load schema from JSON
    const tempSchema = schema || {};

    super(normalizeSchema(tempSchema), options);

    this.formElement =
      typeof formSelector === "string"
        ? document.querySelector(formSelector)
        : formSelector;

    if (!this.formElement) {
      throw new Error(`Form element not found: ${formSelector}`);
    }

    this.inputs = {};
    this.errorElements = {};

    // Check if schema should be loaded from data-schema attribute
    const schemaPath = this.formElement.getAttribute("data-schema");
    if (schemaPath && !schema) {
      this.loadSchemaFromFile(schemaPath);
    } else {
      this.init();
    }
  }

  async loadSchemaFromFile(path) {
    try {
      const response = await fetch(path);
      const schemaData = await response.json();
      this.schema = normalizeSchema(schemaData);
      this.init();
    } catch (error) {
      console.error("Failed to load schema:", error);
      throw new Error(`Could not load schema from ${path}`);
    }
  }

  init() {
    for (const fieldName in this.schema) {
      const input = this.formElement.querySelector(`[name="${fieldName}"]`);
      if (input) {
        this.inputs[fieldName] = input;
        this.attachEventListeners(fieldName, input);
      }
    }

    if (this.options.validateOnSubmit) {
      this.handleSubmitBound = (e) => this.handleSubmit(e);
      this.formElement.addEventListener("submit", this.handleSubmitBound);
    }
  }

  attachEventListeners(fieldName, input) {
    if (this.options.validateOnBlur) {
      const blurHandler = () => {
        this.touch(fieldName);
        this.handleBlur(fieldName);
      };
      input.addEventListener("blur", blurHandler);
      input._blurHandler = blurHandler;
    }

    if (this.options.validateOnInput) {
      const inputHandler = () => {
        if (this.isTouched(fieldName)) {
          this.handleInput(fieldName);
        }
      };
      input.addEventListener("input", inputHandler);
      input._inputHandler = inputHandler;
    }
  }

  handleBlur(fieldName) {
    const input = this.inputs[fieldName];
    const value = this.getInputValue(input);
    const allValues = this.getAllFormValues();
    const error = this.validateField(fieldName, value, allValues);

    this.displayError(fieldName, error);
  }

  handleInput(fieldName) {
    const input = this.inputs[fieldName];
    const value = this.getInputValue(input);
    const allValues = this.getAllFormValues();
    const error = this.validateField(fieldName, value, allValues);

    this.displayError(fieldName, error);
  }

  handleSubmit(event) {
    event.preventDefault();

    const values = this.getAllFormValues();
    const result = this.validateAll(values);

    for (const fieldName in this.schema) {
      const error = this.errors[fieldName] || null;
      this.displayError(fieldName, error);
      this.touch(fieldName);
    }

    if (result.isValid) {
      if (this.options.onSuccess) {
        this.options.onSuccess(values);
      } else {
        this.formElement.submit();
      }
    } else {
      if (this.options.onError) {
        this.options.onError(result.errors);
      }

      this.focusFirstError();
    }
  }

  getInputValue(input) {
    if (!input) return "";

    if (input.type === "checkbox") {
      return input.checked;
    }

    if (input.type === "radio") {
      const checked = this.formElement.querySelector(
        `[name="${input.name}"]:checked`
      );
      return checked ? checked.value : "";
    }

    if (input.type === "file") {
      return input.files;
    }

    return input.value;
  }

  getAllFormValues() {
    const values = {};

    for (const fieldName in this.inputs) {
      values[fieldName] = this.getInputValue(this.inputs[fieldName]);
    }

    return values;
  }

  getAllValues() {
    return this.getAllFormValues();
  }

  displayError(fieldName, error) {
    const input = this.inputs[fieldName];
    if (!input) return;

    this.removeErrorDisplay(fieldName);

    if (error && error !== null) {
      input.classList.add("invalid", "error");
      input.classList.remove("valid");

      const errorElement = this.createErrorElement(error);
      this.errorElements[fieldName] = errorElement;

      const errorContainer = this.options.errorContainer
        ? input.closest(this.options.errorContainer)
        : input.parentElement;

      if (errorContainer) {
        errorContainer.appendChild(errorElement);
      } else {
        input.insertAdjacentElement("afterend", errorElement);
      }
    } else {
      if (this.isTouched(fieldName) && input.value) {
        input.classList.add("valid");
        input.classList.remove("invalid", "error");
      }
    }
  }

  createErrorElement(message) {
    const element = document.createElement("span");
    element.className = this.options.errorClass || "error-message";
    element.textContent = message;
    element.style.color = "red";
    element.style.fontSize = "0.875rem";
    element.style.marginTop = "0.25rem";
    element.style.display = "block";
    return element;
  }

  removeErrorDisplay(fieldName) {
    const errorElement = this.errorElements[fieldName];
    if (errorElement && errorElement.parentElement) {
      errorElement.parentElement.removeChild(errorElement);
      delete this.errorElements[fieldName];
    }

    const input = this.inputs[fieldName];
    if (input) {
      input.classList.remove("invalid", "error");
    }
  }

  focusFirstError() {
    for (const fieldName in this.errors) {
      const input = this.inputs[fieldName];
      if (input) {
        input.focus();
        break;
      }
    }
  }

  validate() {
    const values = this.getAllFormValues();
    return this.validateAll(values);
  }

  reset() {
    super.reset();

    for (const fieldName in this.inputs) {
      this.removeErrorDisplay(fieldName);
      this.inputs[fieldName].classList.remove("valid", "invalid", "error");
    }
  }

  destroy() {
    if (this.handleSubmitBound) {
      this.formElement.removeEventListener("submit", this.handleSubmitBound);
    }

    for (const fieldName in this.inputs) {
      const input = this.inputs[fieldName];

      if (input._blurHandler) {
        input.removeEventListener("blur", input._blurHandler);
      }

      if (input._inputHandler) {
        input.removeEventListener("input", input._inputHandler);
      }

      this.removeErrorDisplay(fieldName);
    }

    this.inputs = {};
    this.errorElements = {};
  }
}

export default ValidaJS;
