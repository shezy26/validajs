#!/usr/bin/env node

/**
 * ValidaJS Post-Install Script
 * Interactive setup for framework selection and example generation
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  blue: "\x1b[34m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

function log(message, color = "reset") {
  console.log(colors[color] + message + colors.reset);
}

async function detectFramework() {
  const cwd = process.cwd();
  const packageJsonPath = path.join(cwd, "package.json");

  if (!fs.existsSync(packageJsonPath)) {
    return null;
  }

  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    const deps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };

    if (deps.react || deps["react-dom"]) return "react";
    if (deps.vue || deps["@vue/cli-service"]) return "vue";
    if (deps.next) return "react";
    if (deps.nuxt) return "vue";

    return "vanilla";
  } catch (error) {
    return null;
  }
}

function createVanillaExample() {
  return {
    schema: `// validation-schema.js
export const registrationSchema = {
  email: ['required', 'email', 'max:255'],
  password: ['required', 'min:8'],
  password_confirmation: ['required', 'same:password'],
  age: ['required', 'numeric', 'between:18,100'],
  terms: ['accepted']
};
`,
    html: `<!-- example-form.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ValidaJS Example</title>
</head>
<body>
  <h1>Registration Form</h1>
  
  <form id="registrationForm">
    <div>
      <label for="email">Email:</label>
      <input type="email" name="email" id="email">
    </div>

    <div>
      <label for="password">Password:</label>
      <input type="password" name="password" id="password">
    </div>

    <div>
      <label for="password_confirmation">Confirm Password:</label>
      <input type="password" name="password_confirmation" id="password_confirmation">
    </div>

    <div>
      <label for="age">Age:</label>
      <input type="number" name="age" id="age">
    </div>

    <div>
      <label>
        <input type="checkbox" name="terms">
        I accept the terms and conditions
      </label>
    </div>

    <button type="submit">Register</button>
  </form>

  <script type="module">
    import ValidaJS from './node_modules/validajs/dist/index.esm.js';
    import { registrationSchema } from './validation-schema.js';

    const validator = new ValidaJS('#registrationForm', registrationSchema, {
      onSuccess: (values) => {
        console.log('Form is valid!', values);
        alert('Registration successful!');
      },
      onError: (errors) => {
        console.log('Form has errors:', errors);
      }
    });
  </script>
</body>
</html>
`,
  };
}

function createReactExample() {
  return {
    schema: `// validation-schema.js
export const registrationSchema = {
  email: ['required', 'email', 'max:255'],
  password: ['required', 'min:8'],
  password_confirmation: ['required', 'same:password'],
  age: ['required', 'numeric', 'between:18,100'],
  terms: ['accepted']
};
`,
    component: `// RegistrationForm.jsx
import { useValidaJS } from 'validajs/react';
import { registrationSchema } from './validation-schema';

export default function RegistrationForm() {
  const { register, handleSubmit, errors, isValid } = useValidaJS(registrationSchema);

  const onSubmit = (values) => {
    console.log('Form submitted:', values);
    alert('Registration successful!');
  };

  const onError = (errors) => {
    console.log('Form errors:', errors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <h1>Registration Form</h1>

      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" {...register('email')} />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" {...register('password')} />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>

      <div>
        <label htmlFor="password_confirmation">Confirm Password:</label>
        <input type="password" id="password_confirmation" {...register('password_confirmation')} />
        {errors.password_confirmation && <span className="error">{errors.password_confirmation}</span>}
      </div>

      <div>
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" {...register('age')} />
        {errors.age && <span className="error">{errors.age}</span>}
      </div>

      <div>
        <label>
          <input type="checkbox" {...register('terms')} />
          I accept the terms and conditions
        </label>
        {errors.terms && <span className="error">{errors.terms}</span>}
      </div>

      <button type="submit" disabled={!isValid}>Register</button>
    </form>
  );
}
`,
  };
}

function createVueExample() {
  return {
    schema: `// validation-schema.js
export const registrationSchema = {
  email: ['required', 'email', 'max:255'],
  password: ['required', 'min:8'],
  password_confirmation: ['required', 'same:password'],
  age: ['required', 'numeric', 'between:18,100'],
  terms: ['accepted']
};
`,
    component: `<!-- RegistrationForm.vue -->
<template>
  <form @submit="handleSubmit(onSubmit, onError)">
    <h1>Registration Form</h1>

    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="field('email').value" @blur="handleBlur('email')" />
      <span v-if="getError('email')" class="error">{{ getError('email') }}</span>
    </div>

    <div>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="field('password').value" @blur="handleBlur('password')" />
      <span v-if="getError('password')" class="error">{{ getError('password') }}</span>
    </div>

    <div>
      <label for="password_confirmation">Confirm Password:</label>
      <input type="password" id="password_confirmation" v-model="field('password_confirmation').value" @blur="handleBlur('password_confirmation')" />
      <span v-if="getError('password_confirmation')" class="error">{{ getError('password_confirmation') }}</span>
    </div>

    <div>
      <label for="age">Age:</label>
      <input type="number" id="age" v-model="field('age').value" @blur="handleBlur('age')" />
      <span v-if="getError('age')" class="error">{{ getError('age') }}</span>
    </div>

    <div>
      <label>
        <input type="checkbox" v-model="field('terms').value" @blur="handleBlur('terms')" />
        I accept the terms and conditions
      </label>
      <span v-if="getError('terms')" class="error">{{ getError('terms') }}</span>
    </div>

    <button type="submit" :disabled="!isValid">Register</button>
  </form>
</template>

<script setup>
import { useValidaJS } from 'validajs/vue';
import { registrationSchema } from './validation-schema';

const { field, handleSubmit, handleBlur, errors, isValid, getError } = useValidaJS(registrationSchema);

const onSubmit = (values) => {
  console.log('Form submitted:', values);
  alert('Registration successful!');
};

const onError = (errors) => {
  console.log('Form errors:', errors);
};
</script>

<style scoped>
.error {
  color: red;
  font-size: 0.875rem;
  display: block;
  margin-top: 0.25rem;
}
</style>
`,
  };
}

async function generateExamples(framework, targetDir) {
  const examplesDir = path.join(targetDir, "validajs-examples");

  if (!fs.existsSync(examplesDir)) {
    fs.mkdirSync(examplesDir, { recursive: true });
  }

  let examples;

  switch (framework) {
    case "vanilla":
      examples = createVanillaExample();
      fs.writeFileSync(
        path.join(examplesDir, "validation-schema.js"),
        examples.schema
      );
      fs.writeFileSync(
        path.join(examplesDir, "example-form.html"),
        examples.html
      );
      break;

    case "react":
      examples = createReactExample();
      fs.writeFileSync(
        path.join(examplesDir, "validation-schema.js"),
        examples.schema
      );
      fs.writeFileSync(
        path.join(examplesDir, "RegistrationForm.jsx"),
        examples.component
      );
      break;

    case "vue":
      examples = createVueExample();
      fs.writeFileSync(
        path.join(examplesDir, "validation-schema.js"),
        examples.schema
      );
      fs.writeFileSync(
        path.join(examplesDir, "RegistrationForm.vue"),
        examples.component
      );
      break;
  }

  return examplesDir;
}

async function main() {
  if (process.env.CI || process.env.SKIP_VALIDAJS_SETUP) {
    rl.close();
    return;
  }

  log("\n✨ Welcome to ValidaJS! ✨\n", "bright");

  const detected = await detectFramework();

  log("Which framework are you using?", "cyan");
  log("1. Vanilla JS / Laravel Blade");
  log("2. React / Next.js");
  log("3. Vue 3 / Nuxt");
  log("4. Skip setup\n");

  if (detected) {
    const frameworkNames = {
      vanilla: "Vanilla JS",
      react: "React",
      vue: "Vue 3",
    };
    log(`(Detected: ${frameworkNames[detected]})\n`, "yellow");
  }

  const choice = await question("Enter your choice (1-4): ");

  const frameworks = ["vanilla", "react", "vue"];
  let selectedFramework;

  if (choice === "4" || !choice) {
    log("\nSetup skipped. You can manually import from:", "yellow");
    log("  - validajs (vanilla)");
    log("  - validajs/react (React)");
    log("  - validajs/vue (Vue 3)\n");
    rl.close();
    return;
  }

  const index = parseInt(choice) - 1;
  if (index >= 0 && index < 3) {
    selectedFramework = frameworks[index];
  } else {
    log("\nInvalid choice. Setup skipped.\n", "yellow");
    rl.close();
    return;
  }

  const generateChoice = await question("\nGenerate example files? (Y/n): ");

  if (generateChoice.toLowerCase() !== "n") {
    try {
      const targetDir = process.cwd();
      const examplesDir = await generateExamples(selectedFramework, targetDir);

      log("\n✅ Example files generated successfully!", "green");
      log(`📁 Location: ${examplesDir}\n`, "cyan");

      switch (selectedFramework) {
        case "vanilla":
          log("📝 Files created:", "bright");
          log("  - validation-schema.js");
          log("  - example-form.html");
          log(
            "\n💡 Open example-form.html in your browser to see it in action!\n"
          );
          break;
        case "react":
          log("📝 Files created:", "bright");
          log("  - validation-schema.js");
          log("  - RegistrationForm.jsx");
          log("\n💡 Import and use RegistrationForm in your React app!\n");
          break;
        case "vue":
          log("📝 Files created:", "bright");
          log("  - validation-schema.js");
          log("  - RegistrationForm.vue");
          log("\n💡 Import and use RegistrationForm in your Vue app!\n");
          break;
      }
    } catch (error) {
      log("\n❌ Error generating examples: " + error.message, "yellow");
    }
  }

  log("📚 Documentation: https://github.com/validajs/validajs\n", "blue");
  log("Happy validating! 🎉\n", "green");

  rl.close();
}

main().catch((error) => {
  console.error("Error:", error);
  rl.close();
  process.exit(1);
});
