
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginJsxA11y from "eslint-plugin-jsx-a11y";


export default [
  {
    name: "my-eslint-config",
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    plugins: {
      prettier: eslintPluginPrettier,
      react: eslintPluginReact,
      "react-hooks": eslintPluginReactHooks,
      "jsx-a11y": eslintPluginJsxA11y,
    },
    rules: {
      ...eslintConfigPrettier.rules,
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
          singleQuote: true,
          tabWidth: 2,
        },
      ],
      "react/react-in-jsx-scope": "off",
    },
  },
];
