/**
 * ValidaJS - Vue 3 Adapter
 * Vue 3 composable for form validation
 */

import { ref, reactive, computed } from "vue";
import { Validator } from "../core/Validator.js";
import { normalizeSchema } from "../utils/parser.js";

export function useValidaJS(schema, options = {}) {
  const validator = new Validator(normalizeSchema(schema), options);

  const values = reactive({});
  const errors = ref({});
  const touched = reactive({});

  const isValid = computed(() => Object.keys(errors.value).length === 0);

  const validateField = (fieldName, value) => {
    const error = validator.validateField(fieldName, value, values);
    errors.value = { ...errors.value, [fieldName]: error };
    return error;
  };

  const validateAll = () => {
    const result = validator.validateAll(values);
    errors.value = result.errors;
    return result;
  };

  const field = (fieldName) => {
    return {
      value: values[fieldName] || "",
      "onUpdate:modelValue": (value) => {
        values[fieldName] = value;
        if (touched[fieldName]) {
          validateField(fieldName, value);
        }
      },
    };
  };

  const handleBlur = (fieldName) => {
    touched[fieldName] = true;
    validateField(fieldName, values[fieldName]);
  };

  const handleSubmit = (onSuccess, onError) => {
    return (e) => {
      e.preventDefault();
      const result = validateAll();

      if (result.isValid) {
        onSuccess?.(values);
      } else {
        onError?.(result.errors);
      }
    };
  };

  const reset = () => {
    Object.keys(values).forEach((key) => delete values[key]);
    errors.value = {};
    Object.keys(touched).forEach((key) => delete touched[key]);
    validator.reset();
  };

  const setValue = (fieldName, value) => {
    values[fieldName] = value;
  };

  const getError = (fieldName) => {
    return errors.value[fieldName] || null;
  };

  return {
    values,
    errors,
    touched,
    isValid,
    field,
    handleBlur,
    handleSubmit,
    validateField,
    validateAll,
    reset,
    setValue,
    getError,
  };
}
