/**
 * ValidaJS - React Adapter
 * React hook for form validation
 */

import { useState, useCallback } from "react";
import { Validator } from "../core/Validator.js";
import { normalizeSchema } from "../utils/parser.js";

export function useValidaJS(schema, options = {}) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validator = useState(
    () => new Validator(normalizeSchema(schema), options)
  )[0];

  const validateField = useCallback(
    (fieldName, value) => {
      const error = validator.validateField(fieldName, value, values);
      setErrors((prev) => ({
        ...prev,
        [fieldName]: error,
      }));
      return error;
    },
    [validator, values]
  );

  const validateAll = useCallback(() => {
    const result = validator.validateAll(values);
    setErrors(result.errors);
    return result;
  }, [validator, values]);

  const register = useCallback(
    (fieldName) => {
      return {
        name: fieldName,
        value: values[fieldName] || "",
        onChange: (e) => {
          const value =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;
          setValues((prev) => ({ ...prev, [fieldName]: value }));

          if (touched[fieldName]) {
            validateField(fieldName, value);
          }
        },
        onBlur: () => {
          setTouched((prev) => ({ ...prev, [fieldName]: true }));
          validateField(fieldName, values[fieldName]);
        },
      };
    },
    [values, touched, validateField]
  );

  const handleSubmit = useCallback(
    (onSuccess, onError) => {
      return (e) => {
        e.preventDefault();
        const result = validateAll();

        if (result.isValid) {
          onSuccess?.(values);
        } else {
          onError?.(result.errors);
        }
      };
    },
    [values, validateAll]
  );

  const reset = useCallback(() => {
    setValues({});
    setErrors({});
    setTouched({});
    validator.reset();
  }, [validator]);

  const setValue = useCallback((fieldName, value) => {
    setValues((prev) => ({ ...prev, [fieldName]: value }));
  }, []);

  const getError = useCallback(
    (fieldName) => {
      return errors[fieldName] || null;
    },
    [errors]
  );

  return {
    values,
    errors,
    touched,
    isValid: Object.keys(errors).length === 0,
    register,
    handleSubmit,
    validateField,
    validateAll,
    reset,
    setValue,
    getError,
  };
}
