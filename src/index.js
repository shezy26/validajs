/**
 * ValidaJS - Main Entry Point (Vanilla JS)
 */

import { ValidaJS as ValidaJSClass } from "./adapters/vanilla.js";
import { Validator } from "./core/Validator.js";
import { RuleEngine } from "./rules/RuleEngine.js";

export { ValidaJSClass as ValidaJS, Validator, RuleEngine };
export default ValidaJSClass;
