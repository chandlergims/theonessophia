import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable strict rules
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "react-hooks/exhaustive-deps": "off",
      "react/no-unescaped-entities": "off",
      "import/no-anonymous-default-export": "off",
      "no-unused-vars": "off",
      "no-console": "off",
    },
  },
];

export default eslintConfig;
