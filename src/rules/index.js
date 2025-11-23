/**
 * ValidaJS - Laravel-style Validation Rules
 * Client-side implementation of Laravel validation rules
 */

export function required(value) {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

export function email(value) {
  if (!value) return true;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(String(value));
}

export function min(value, [minValue]) {
  if (!value) return true;
  minValue = Number(minValue);
  if (typeof value === "string") return value.length >= minValue;
  if (typeof value === "number") return value >= minValue;
  if (Array.isArray(value)) return value.length >= minValue;
  return true;
}

export function max(value, [maxValue]) {
  if (!value) return true;
  maxValue = Number(maxValue);
  if (typeof value === "string") return value.length <= maxValue;
  if (typeof value === "number") return value <= maxValue;
  if (Array.isArray(value)) return value.length <= maxValue;
  return true;
}

export function between(value, [min, max]) {
  if (!value) return true;
  min = Number(min);
  max = Number(max);

  // Try to convert to number first
  const numValue = Number(value);
  if (!isNaN(numValue) && isFinite(numValue)) {
    return numValue >= min && numValue <= max;
  }

  // For non-numeric strings, check length
  if (typeof value === "string") {
    const length = value.length;
    return length >= min && length <= max;
  }
  if (Array.isArray(value)) {
    const length = value.length;
    return length >= min && length <= max;
  }
  return true;
}

export function numeric(value) {
  if (!value) return true;
  return !isNaN(parseFloat(value)) && isFinite(value);
}

export function integer(value) {
  if (!value) return true;
  return Number.isInteger(Number(value));
}

export function alpha(value) {
  if (!value) return true;
  return /^[a-zA-Z]+$/.test(String(value));
}

export function alpha_dash(value) {
  if (!value) return true;
  return /^[a-zA-Z0-9_-]+$/.test(String(value));
}

export function alpha_num(value) {
  if (!value) return true;
  return /^[a-zA-Z0-9]+$/.test(String(value));
}

export function url(value) {
  if (!value) return true;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export function same(value, [otherField], allValues) {
  if (!value) return true;
  return value === allValues[otherField];
}

export function different(value, [otherField], allValues) {
  if (!value) return true;
  return value !== allValues[otherField];
}

export function confirmed(value, params, allValues, fieldName) {
  if (!value) return true;
  const confirmField = `${fieldName}_confirmation`;
  return value === allValues[confirmField];
}

export function in_rule(value, params) {
  if (!value) return true;
  return params.includes(String(value));
}

export { in_rule as in };

export function not_in(value, params) {
  if (!value) return true;
  return !params.includes(String(value));
}

export function boolean(value) {
  if (value === null || value === undefined) return true;
  const validValues = [true, false, 1, 0, "1", "0", "true", "false"];
  return validValues.includes(value);
}

export function accepted(value) {
  const acceptedValues = ["yes", "on", "1", 1, true, "true"];
  return acceptedValues.includes(value);
}

export function declined(value) {
  const declinedValues = ["no", "off", "0", 0, false, "false"];
  return declinedValues.includes(value);
}

export function size(value, [sizeValue]) {
  if (!value) return true;
  sizeValue = Number(sizeValue);
  if (typeof value === "string") return value.length === sizeValue;
  if (typeof value === "number") return value === sizeValue;
  if (Array.isArray(value)) return value.length === sizeValue;
  return true;
}

export function digits(value, [length]) {
  if (!value) return true;
  const str = String(value);
  return /^\d+$/.test(str) && str.length === Number(length);
}

export function digits_between(value, [min, max]) {
  if (!value) return true;
  const str = String(value);
  const length = str.length;
  return /^\d+$/.test(str) && length >= Number(min) && length <= Number(max);
}

export function date(value) {
  if (!value) return true;
  const dateObj = new Date(value);
  return !isNaN(dateObj.getTime());
}

export function before(value, [compareDate]) {
  if (!value) return true;
  const dateObj = new Date(value);
  const compare = new Date(compareDate);
  return (
    !isNaN(dateObj.getTime()) && !isNaN(compare.getTime()) && dateObj < compare
  );
}

export function after(value, [compareDate]) {
  if (!value) return true;
  const dateObj = new Date(value);
  const compare = new Date(compareDate);
  return (
    !isNaN(dateObj.getTime()) && !isNaN(compare.getTime()) && dateObj > compare
  );
}

export function before_or_equal(value, [compareDate]) {
  if (!value) return true;
  const dateObj = new Date(value);
  const compare = new Date(compareDate);
  return (
    !isNaN(dateObj.getTime()) && !isNaN(compare.getTime()) && dateObj <= compare
  );
}

export function after_or_equal(value, [compareDate]) {
  if (!value) return true;
  const dateObj = new Date(value);
  const compare = new Date(compareDate);
  return (
    !isNaN(dateObj.getTime()) && !isNaN(compare.getTime()) && dateObj >= compare
  );
}

export function regex(value, [pattern]) {
  if (!value) return true;
  try {
    const regexObj = new RegExp(pattern);
    return regexObj.test(String(value));
  } catch {
    console.warn(`Invalid regex pattern: ${pattern}`);
    return false;
  }
}

export function string(value) {
  if (value === null || value === undefined) return true;
  return typeof value === "string";
}

export function nullable(value) {
  return true;
}

export function array(value) {
  if (value === null || value === undefined) return true;
  return Array.isArray(value);
}

export function starts_with(value, params) {
  if (!value) return true;
  const str = String(value);
  return params.some((prefix) => str.startsWith(prefix));
}

export function ends_with(value, params) {
  if (!value) return true;
  const str = String(value);
  return params.some((suffix) => str.endsWith(suffix));
}

export function lowercase(value) {
  if (!value) return true;
  return String(value) === String(value).toLowerCase();
}

export function uppercase(value) {
  if (!value) return true;
  return String(value) === String(value).toUpperCase();
}

export function ip(value) {
  if (!value) return true;
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (ipv4Regex.test(value)) {
    const parts = value.split(".");
    return parts.every((part) => Number(part) >= 0 && Number(part) <= 255);
  }
  const ipv6Regex = /^([0-9a-fA-F]{0,4}:){7}[0-9a-fA-F]{0,4}$/;
  return ipv6Regex.test(value);
}

export function ipv4(value) {
  if (!value) return true;
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (!ipv4Regex.test(value)) return false;
  const parts = value.split(".");
  return parts.every((part) => Number(part) >= 0 && Number(part) <= 255);
}

export function ipv6(value) {
  if (!value) return true;
  const ipv6Regex = /^([0-9a-fA-F]{0,4}:){7}[0-9a-fA-F]{0,4}$/;
  return ipv6Regex.test(value);
}

export function json(value) {
  if (!value) return true;
  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
}

export function uuid(value) {
  if (!value) return true;
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(String(value));
}

export function gt(value, [otherField], allValues) {
  if (!value) return true;
  const compareValue = allValues[otherField];
  if (compareValue === undefined) return true;
  return Number(value) > Number(compareValue);
}

export function gte(value, [otherField], allValues) {
  if (!value) return true;
  const compareValue = allValues[otherField];
  if (compareValue === undefined) return true;
  return Number(value) >= Number(compareValue);
}

export function lt(value, [otherField], allValues) {
  if (!value) return true;
  const compareValue = allValues[otherField];
  if (compareValue === undefined) return true;
  return Number(value) < Number(compareValue);
}

export function lte(value, [otherField], allValues) {
  if (!value) return true;
  const compareValue = allValues[otherField];
  if (compareValue === undefined) return true;
  return Number(value) <= Number(compareValue);
}

export function required_if(value, [otherField, compareValue], allValues) {
  const otherValue = allValues[otherField];
  if (String(otherValue) === String(compareValue)) {
    return required(value);
  }
  return true;
}

export function required_with(value, params, allValues) {
  const hasAnyField = params.some((field) => {
    const fieldValue = allValues[field];
    return fieldValue !== null && fieldValue !== undefined && fieldValue !== "";
  });
  if (hasAnyField) {
    return required(value);
  }
  return true;
}

export function required_without(value, params, allValues) {
  const hasAnyFieldMissing = params.some((field) => {
    const fieldValue = allValues[field];
    return fieldValue === null || fieldValue === undefined || fieldValue === "";
  });
  if (hasAnyFieldMissing) {
    return required(value);
  }
  return true;
}

export function ulid(value) {
  if (!value) return true;
  const ulidRegex = /^[0-7][0-9A-HJKMNP-TV-Z]{25}$/i;
  return ulidRegex.test(String(value));
}

export function mac_address(value) {
  if (!value) return true;
  const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
  return macRegex.test(String(value));
}

export function ascii(value) {
  if (!value) return true;
  return /^[\x00-\x7F]*$/.test(String(value));
}

export function hex_color(value) {
  if (!value) return true;
  return /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(String(value));
}

export function password(value, [minLength = 8]) {
  if (!value) return true;
  const min = Number(minLength);

  if (value.length < min) return false;

  const hasLowercase = /[a-z]/.test(value);
  const hasUppercase = /[A-Z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value);

  return hasLowercase && hasUppercase && hasNumber && hasSymbol;
}

export function max_digits(value, [maxDigits]) {
  if (!value) return true;
  const str = String(value).replace(/[^0-9]/g, "");
  return str.length <= Number(maxDigits);
}

export function min_digits(value, [minDigits]) {
  if (!value) return true;
  const str = String(value).replace(/[^0-9]/g, "");
  return str.length >= Number(minDigits);
}

export function decimal(value, [min, max]) {
  if (!value) return true;

  if (!numeric(value)) return false;

  const str = String(value);
  const parts = str.split(".");

  if (parts.length === 1) return min === undefined || Number(min) === 0;

  const decimalPlaces = parts[1].length;

  if (max !== undefined) {
    return decimalPlaces >= (Number(min) || 0) && decimalPlaces <= Number(max);
  }

  return decimalPlaces === Number(min);
}

export function multiple_of(value, [multipleOf]) {
  if (!value) return true;
  const num = Number(value);
  const multiple = Number(multipleOf);

  if (isNaN(num) || isNaN(multiple)) return false;

  return num % multiple === 0;
}

export function active_url(value) {
  if (!value) return true;
  try {
    const urlObj = new URL(value);
    return urlObj.protocol === "http:" || urlObj.protocol === "https:";
  } catch {
    return false;
  }
}

export function timezone(value) {
  if (!value) return true;
  try {
    Intl.DateTimeFormat(undefined, { timeZone: value });
    return true;
  } catch {
    return false;
  }
}

export function date_equals(value, [compareDate]) {
  if (!value) return true;
  const date1 = new Date(value);
  const date2 = new Date(compareDate);

  if (isNaN(date1.getTime()) || isNaN(date2.getTime())) return false;

  return date1.toDateString() === date2.toDateString();
}

export function date_format(value, [format]) {
  if (!value) return true;

  if (format === "Y-m-d") {
    return /^\d{4}-\d{2}-\d{2}$/.test(value) && date(value);
  }
  if (format === "d/m/Y" || format === "m/d/Y") {
    return /^\d{2}\/\d{2}\/\d{4}$/.test(value);
  }

  return date(value);
}

export function not_regex(value, [pattern]) {
  if (!value) return true;
  try {
    const regexObj = new RegExp(pattern);
    return !regexObj.test(String(value));
  } catch {
    console.warn(`Invalid regex pattern: ${pattern}`);
    return false;
  }
}

export function doesnt_start_with(value, params) {
  if (!value) return true;
  const str = String(value);
  return !params.some((prefix) => str.startsWith(prefix));
}

export function doesnt_end_with(value, params) {
  if (!value) return true;
  const str = String(value);
  return !params.some((suffix) => str.endsWith(suffix));
}

export function present(value) {
  return value !== undefined;
}

export function filled(value) {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

export function prohibited(value) {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  return false;
}

export function distinct(value) {
  if (value === null || value === undefined) return true;
  if (!Array.isArray(value)) return true;

  const unique = [...new Set(value)];
  return unique.length === value.length;
}

export function required_unless(
  value,
  [otherField, ...compareValues],
  allValues
) {
  const otherValue = allValues[otherField];
  const shouldBeRequired = !compareValues.some(
    (v) => String(otherValue) === String(v)
  );

  if (shouldBeRequired) {
    return required(value);
  }
  return true;
}

export function required_with_all(value, params, allValues) {
  const hasAllFields = params.every((field) => {
    const fieldValue = allValues[field];
    return fieldValue !== null && fieldValue !== undefined && fieldValue !== "";
  });
  if (hasAllFields) {
    return required(value);
  }
  return true;
}

export function required_without_all(value, params, allValues) {
  const allFieldsMissing = params.every((field) => {
    const fieldValue = allValues[field];
    return fieldValue === null || fieldValue === undefined || fieldValue === "";
  });
  if (allFieldsMissing) {
    return required(value);
  }
  return true;
}

export function accepted_if(value, [otherField, compareValue], allValues) {
  const otherValue = allValues[otherField];
  if (String(otherValue) === String(compareValue)) {
    return accepted(value);
  }
  return true;
}

export function declined_if(value, [otherField, compareValue], allValues) {
  const otherValue = allValues[otherField];
  if (String(otherValue) === String(compareValue)) {
    return declined(value);
  }
  return true;
}
