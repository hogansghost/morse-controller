export default [
  {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:prettier/recommended",
    ],
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      semi: "error",
      "prefer-const": "error",
    },
  },
];
