# ValidaJS 🎯

**Laravel-style form validation for JavaScript**

A powerful, lightweight form validation library that brings Laravel's elegant validation syntax to frontend JavaScript. Works seamlessly with vanilla JS, React, and Vue 3.

[![npm version](https://img.shields.io/npm/v/validajs.svg)](https://www.npmjs.com/package/validajs)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Why ValidaJS?

- 🚀 **Laravel-compatible syntax** - Use familiar validation rules from Laravel
- 📦 **80+ validation rules** - Comprehensive coverage for all validation needs
- 🎨 **Framework agnostic** - Works with vanilla JS, React, and Vue 3
- ⚡ **Real-time validation** - Validate on blur, change, and submit
- 🎯 **Zero dependencies** - Lightweight and fast
- 💪 **TypeScript ready** - Full type definitions included
- 🔧 **Highly customizable** - Custom rules, messages, and error handling

## Installation

```bash
npm install @shezy26/validajs
```

## Quick Start

### Vanilla JavaScript

```javascript
import ValidaJS from "@shezy26/validajs";

const validator = new ValidaJS(
  "#myForm",
  {
    email: ["required", "email"],
    password: ["required", "min:8", "confirmed"],
    age: ["required", "integer", "between:18,100"],
  },
  {
    submitHandler: (values) => {
      console.log("Form is valid!", values);
      // Submit to your API
    },
  }
);
```

```html
<form id="myForm">
  <input type="email" name="email" placeholder="Email" />
  <input type="password" name="password" placeholder="Password" />
  <input
    type="password"
    name="password_confirmation"
    placeholder="Confirm Password"
  />
  <input type="number" name="age" placeholder="Age" />
  <button type="submit">Submit</button>
</form>
```

### React

```jsx
import { useValidation } from "@shezy26/validajs/react";

function MyForm() {
  const validation = useValidation({
    email: ["required", "email"],
    password: ["required", "min:8"],
  });

  const handleSubmit = (values) => {
    console.log("Valid!", values);
  };

  return (
    <form onSubmit={validation.handleSubmit(handleSubmit)}>
      <input {...validation.getFieldProps("email")} />
      {validation.errors.email && (
        <span className="error">{validation.errors.email[0]}</span>
      )}

      <input type="password" {...validation.getFieldProps("password")} />
      {validation.errors.password && (
        <span className="error">{validation.errors.password[0]}</span>
      )}

      <button type="submit">Submit</button>
    </form>
  );
}
```

### Vue 3

```vue
<template>
  <form @submit.prevent="validation.handleSubmit(onSubmit)">
    <input
      v-model="validation.values.email"
      @blur="validation.handleBlur('email')"
    />
    <span v-if="validation.hasFieldError('email')">
      {{ validation.getFieldError("email")[0] }}
    </span>

    <input
      type="password"
      v-model="validation.values.password"
      @blur="validation.handleBlur('password')"
    />
    <span v-if="validation.hasFieldError('password')">
      {{ validation.getFieldError("password")[0] }}
    </span>

    <button type="submit">Submit</button>
  </form>
</template>

<script setup>
import { useValidation } from "@shezy26/validajs/vue";

const validation = useValidation({
  email: ["required", "email"],
  password: ["required", "min:8"],
});

function onSubmit(values) {
  console.log("Form is valid!", values);
}
</script>
```

## Available Validation Rules

### String Validation

- `required` - Field must be present and not empty
- `email` - Valid email address
- `string` - Must be a string
- `min:value` - Minimum length
- `max:value` - Maximum length
- `between:min,max` - Length between min and max
- `alpha` - Only alphabetic characters
- `alpha_num` - Only alphanumeric characters
- `alpha_dash` - Alphanumeric with dashes and underscores
- `lowercase` - Must be lowercase
- `uppercase` - Must be uppercase
- `starts_with:foo,bar` - Must start with one of the values
- `ends_with:foo,bar` - Must end with one of the values
- `doesnt_start_with:foo,bar` - Must not start with values
- `doesnt_end_with:foo,bar` - Must not end with values
- `regex:pattern` - Must match regex pattern
- `not_regex:pattern` - Must not match regex pattern

### Numeric Validation

- `numeric` - Must be numeric
- `integer` - Must be an integer
- `digits:value` - Exactly N digits
- `digits_between:min,max` - Digits between min and max
- `min_digits:value` - Minimum number of digits
- `max_digits:value` - Maximum number of digits
- `decimal:min,max` - Decimal places between min and max
- `between:min,max` - Value between min and max
- `gt:field` - Greater than another field
- `gte:field` - Greater than or equal to another field
- `lt:field` - Less than another field
- `lte:field` - Less than or equal to another field
- `multiple_of:value` - Must be a multiple of value

### Format Validation

- `url` - Valid URL
- `active_url` - Active URL (HTTP/HTTPS)
- `ip` - Valid IP address (v4 or v6)
- `ipv4` - Valid IPv4 address
- `ipv6` - Valid IPv6 address
- `mac_address` - Valid MAC address
- `json` - Valid JSON string
- `uuid` - Valid UUID
- `ulid` - Valid ULID
- `ascii` - Only ASCII characters
- `hex_color` - Valid hexadecimal color

### Date Validation

- `date` - Valid date
- `date_format:format` - Date in specific format
- `date_equals:date` - Date equals another date
- `before:date` - Before given date
- `after:date` - After given date
- `before_or_equal:date` - Before or equal to date
- `after_or_equal:date` - After or equal to date
- `timezone` - Valid timezone

### Password & Security

- `password:min` - Strong password (uppercase, lowercase, numbers, symbols)
- `confirmed` - Must have matching {field}\_confirmation
- `same:field` - Must match another field
- `different:field` - Must be different from another field

### Boolean Validation

- `boolean` - Boolean value
- `accepted` - Must be accepted (yes, on, 1, true)
- `accepted_if:field,value` - Accepted if another field equals value
- `declined` - Must be declined (no, off, 0, false)
- `declined_if:field,value` - Declined if another field equals value

### Array Validation

- `array` - Must be an array
- `in:foo,bar,baz` - Must be one of the values
- `not_in:foo,bar` - Must not be one of the values
- `size:value` - Array length must be exact size
- `distinct` - No duplicate values in array

### Conditional Validation

- `required_if:field,value` - Required if another field equals value
- `required_unless:field,value` - Required unless another field equals value
- `required_with:field1,field2` - Required if any field is present
- `required_with_all:field1,field2` - Required if all fields are present
- `required_without:field1,field2` - Required if any field is not present
- `required_without_all:field1,field2` - Required if all fields are not present

### Special Rules

- `nullable` - Allows null values
- `present` - Must be present (can be empty)
- `filled` - Must have value when present
- `prohibited` - Must be empty

**Total: 80+ validation rules**

## Configuration Options

```javascript
{
  // Validation timing
  validateOnBlur: true,
  validateOnChange: true,
  validateOnSubmit: true,

  // Error display
  errorClass: 'error-message',
  errorContainer: null, // CSS selector for error container
  showErrorsOnTouch: true,
  clearErrorsOnInput: true,

  // Behavior
  focusFirstError: true,
  scrollToError: false,

  // Customization
  customMessages: {},
  attributeNames: {},

  // Submit handler
  submitHandler: (values, validator) => {
    // Handle form submission
  }
}
```

## Custom Validation Rules

Add your own validation rules:

```javascript
import { Validator } from "@shezy26/validajs";

const validator = new Validator(schema);

validator.extend(
  "phone",
  (value) => {
    return /^\d{3}-\d{3}-\d{4}$/.test(value);
  },
  "The :attribute must be a valid phone number."
);

// Use it in your schema
const schema = {
  phone: ["required", "phone"],
};
```

## Custom Error Messages

Override default error messages:

```javascript
const validator = new ValidaJS("#myForm", schema, {
  customMessages: {
    "email.required": "We need your email address!",
    "email.email": "Please enter a valid email",
    "password.min": "Password must be at least :min characters",
    "password.password":
      "Use a stronger password with mixed case, numbers, and symbols",
  },
});
```

## Custom Attribute Names

Make error messages more user-friendly:

```javascript
const validator = new ValidaJS("#myForm", schema, {
  attributeNames: {
    email: "Email Address",
    first_name: "First Name",
    phone_number: "Phone Number",
  },
});

// Error: "Email Address is required" instead of "Email is required"
```

## Programmatic Validation

Validate without forms:

```javascript
import { Validator } from "@shezy26/validajs";

const validator = new Validator({
  email: ["required", "email"],
  age: ["required", "integer", "between:18,100"],
});

// Validate all fields
const result = validator.validateAll({
  email: "test@example.com",
  age: 25,
});

if (result.valid) {
  console.log("All valid!");
} else {
  console.log("Errors:", result.errors);
}

// Validate single field
const fieldResult = validator.validateField("email", "invalid-email");
```

## Real-World Examples

### User Registration Form

```javascript
const schema = {
  username: ["required", "alpha_dash", "min:3", "max:20"],
  email: ["required", "email", "max:255"],
  password: ["required", "password:8"],
  password_confirmation: ["required", "same:password"],
  age: ["required", "integer", "between:18,100"],
  website: ["nullable", "url"],
  terms: ["accepted"],
};
```

### Contact Form

```javascript
const schema = {
  name: ["required", "string", "max:100"],
  email: ["required", "email"],
  phone: ["nullable", "digits:10"],
  subject: ["required", "string", "max:200"],
  message: ["required", "string", "min:10", "max:1000"],
};
```

### Payment Form

```javascript
const schema = {
  card_number: ["required", "digits:16"],
  cvv: ["required", "digits:3"],
  expiry_month: ["required", "digits:2", "between:1,12"],
  expiry_year: ["required", "digits:4", "gte:2024"],
  billing_zip: ["required", "digits:5"],
};
```

## API Reference

### ValidaJS Class (Vanilla JS)

```javascript
const validator = new ValidaJS(formSelector, schema, options);

// Methods
validator.validateField(fieldName, value, allValues);
validator.validateAll(values);
validator.reset();
validator.clearErrors();
validator.getErrors(fieldName);
validator.hasErrors(fieldName);
validator.extend(name, fn, message);
```

### useValidation Hook (React)

```javascript
const {
  values, // Form values
  errors, // Validation errors
  touched, // Touched fields
  isValid, // Is form valid
  isSubmitting, // Is submitting

  getFieldProps, // Get props for input
  handleSubmit, // Submit handler
  setFieldValue, // Set field value
  validateField, // Validate single field
  reset, // Reset form
} = useValidation(schema, options);
```

### useValidation Composable (Vue 3)

```javascript
const {
  values, // Form values
  errors, // Validation errors
  touched, // Touched fields
  isValid, // Is form valid

  handleChange, // Change handler
  handleBlur, // Blur handler
  handleSubmit, // Submit handler
  setFieldValue, // Set field value
  validateField, // Validate single field
  reset, // Reset form
} = useValidation(schema, options);
```

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- iOS Safari (latest 2 versions)
- Android Chrome (latest)

## TypeScript Support

ValidaJS includes TypeScript definitions:

```typescript
import ValidaJS, {
  ValidationSchema,
  ValidationOptions,
} from "@shezy26/validajs";

const schema: ValidationSchema = {
  email: ["required", "email"],
  password: ["required", "min:8"],
};

const options: ValidationOptions = {
  validateOnBlur: true,
};

const validator = new ValidaJS("#form", schema, options);
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © Shahzaib Daniel

## Inspiration

Inspired by [Laravel's validation system](https://laravel.com/docs/validation) - bringing the same elegant syntax to frontend JavaScript.

## Support

- 📖 [Documentation](https://github.com/shezy26/validajs)
- 🐛 [Issue Tracker](https://github.com/shezy26/validajs/issues)
- 💬 [Discussions](https://github.com/shezy26/validajs/discussions)

---

**Made with ❤️ for developers who love clean, Laravel-style validation**
