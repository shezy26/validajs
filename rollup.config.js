import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";

export default [
  // Browser bundle (IIFE format)
  {
    input: "src/index.js",
    output: {
      file: "dist/validajs.min.js",
      format: "iife",
      name: "ValidaJS",
    },
    plugins: [resolve(), terser()],
  },
  // CommonJS
  {
    input: "src/index.js",
    output: {
      file: "dist/index.js",
      format: "cjs",
      exports: "named",
    },
    plugins: [resolve()],
  },
  // ES Module
  {
    input: "src/index.js",
    output: {
      file: "dist/index.esm.js",
      format: "es",
    },
    plugins: [resolve()],
  },
  // React
  {
    input: "src/react.js",
    output: [
      { file: "dist/react.js", format: "cjs", exports: "named" },
      { file: "dist/react.esm.js", format: "es" },
    ],
    external: ["react"],
    plugins: [resolve()],
  },
  // Vue
  {
    input: "src/vue.js",
    output: [
      { file: "dist/vue.js", format: "cjs", exports: "named" },
      { file: "dist/vue.esm.js", format: "es" },
    ],
    external: ["vue"],
    plugins: [resolve()],
  },
];
