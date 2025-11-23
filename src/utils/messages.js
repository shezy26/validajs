/**
 * Default Error Messages
 * Laravel-style error messages for validation rules
 */

export const defaultMessages = {
  required: "The :attribute field is required.",
  email: "The :attribute must be a valid email address.",
  min: "The :attribute must be at least :min characters.",
  max: "The :attribute may not be greater than :max characters.",
  between: "The :attribute must be between :min and :max.",
  numeric: "The :attribute must be a number.",
  integer: "The :attribute must be an integer.",
  alpha: "The :attribute may only contain letters.",
  alpha_dash:
    "The :attribute may only contain letters, numbers, dashes and underscores.",
  alpha_num: "The :attribute may only contain letters and numbers.",
  url: "The :attribute must be a valid URL.",
  same: "The :attribute and :other must match.",
  different: "The :attribute and :other must be different.",
  confirmed: "The :attribute confirmation does not match.",
  in: "The selected :attribute is invalid.",
  not_in: "The selected :attribute is invalid.",
  boolean: "The :attribute field must be true or false.",
  accepted: "The :attribute must be accepted.",
  declined: "The :attribute must be declined.",
  size: "The :attribute must be :size.",
  digits: "The :attribute must be :digits digits.",
  digits_between: "The :attribute must be between :min and :max digits.",
  date: "The :attribute is not a valid date.",
  before: "The :attribute must be a date before :date.",
  after: "The :attribute must be a date after :date.",
  before_or_equal: "The :attribute must be a date before or equal to :date.",
  after_or_equal: "The :attribute must be a date after or equal to :date.",
  regex: "The :attribute format is invalid.",
  string: "The :attribute must be a string.",
  nullable: "The :attribute field is optional.",
  array: "The :attribute must be an array.",
  starts_with: "The :attribute must start with one of the following: :values.",
  ends_with: "The :attribute must end with one of the following: :values.",
  lowercase: "The :attribute must be lowercase.",
  uppercase: "The :attribute must be uppercase.",
  ip: "The :attribute must be a valid IP address.",
  ipv4: "The :attribute must be a valid IPv4 address.",
  ipv6: "The :attribute must be a valid IPv6 address.",
  json: "The :attribute must be a valid JSON string.",
  uuid: "The :attribute must be a valid UUID.",
  gt: "The :attribute must be greater than :other.",
  gte: "The :attribute must be greater than or equal to :other.",
  lt: "The :attribute must be less than :other.",
  lte: "The :attribute must be less than or equal to :other.",
  required_if: "The :attribute field is required when :other is :value.",
  required_with: "The :attribute field is required when :values is present.",
  required_without:
    "The :attribute field is required when :values is not present.",

  ulid: "The :attribute must be a valid ULID.",
  mac_address: "The :attribute must be a valid MAC address.",
  ascii:
    "The :attribute must only contain single-byte alphanumeric characters and symbols.",
  hex_color: "The :attribute must be a valid hexadecimal color.",
  password:
    "The :attribute must be at least :min characters and contain uppercase, lowercase, numbers, and symbols.",
  max_digits: "The :attribute must not have more than :max digits.",
  min_digits: "The :attribute must have at least :min digits.",
  decimal: "The :attribute must have :decimal decimal places.",
  multiple_of: "The :attribute must be a multiple of :value.",
  active_url: "The :attribute is not a valid URL.",
  timezone: "The :attribute must be a valid timezone.",
  date_equals: "The :attribute must be a date equal to :date.",
  date_format: "The :attribute does not match the format :format.",
  not_regex: "The :attribute format must not match the given pattern.",
  doesnt_start_with:
    "The :attribute may not start with one of the following: :values.",
  doesnt_end_with:
    "The :attribute may not end with one of the following: :values.",
  present: "The :attribute field must be present.",
  filled: "The :attribute field must have a value.",
  prohibited: "The :attribute field is prohibited.",
  distinct: "The :attribute field has a duplicate value.",
  required_unless:
    "The :attribute field is required unless :other is in :values.",
  required_with_all:
    "The :attribute field is required when :values are present.",
  required_without_all:
    "The :attribute field is required when none of :values are present.",
  accepted_if: "The :attribute must be accepted when :other is :value.",
  declined_if: "The :attribute must be declined when :other is :value.",
};
