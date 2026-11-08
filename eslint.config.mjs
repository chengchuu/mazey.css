import eslint from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "coverage/**",
      "dist-dev/**",
      "docs/**",
      "lib/**",
      "node_modules/**",
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      semi: [ "warn", "always" ],
      quotes: [ "warn", "double" ],
      indent: [ "warn", 2, { SwitchCase: 1 } ],
      "comma-dangle": [ "warn", "always-multiline" ],
      "eol-last": [ "warn", "always" ],
      "spaced-comment": [ "warn", "always" ],
      "object-curly-spacing": [ "warn", "always" ],
      "array-bracket-spacing": [ "warn", "always" ],
      "object-curly-newline": [
        "warn",
        { ImportDeclaration: { multiline: true, minProperties: 4 } },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
    },
  },
  {
    files: ["**/*.{js,cjs}"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
);
