/**
 * Parser Utility
 * Parse Laravel-style validation rule strings
 */

export function parseRule(rule) {
  if (typeof rule !== "string") {
    return { name: rule, params: [] };
  }

  const parts = rule.split(":");
  const name = parts[0];
  const params = parts[1] ? parts[1].split(",") : [];

  return { name, params };
}

export function normalizeSchema(schema) {
  const normalized = {};

  for (const [field, rules] of Object.entries(schema)) {
    if (Array.isArray(rules)) {
      normalized[field] = rules;
    } else if (typeof rules === "string") {
      normalized[field] = rules.split("|");
    } else {
      normalized[field] = [rules];
    }
  }

  return normalized;
}
