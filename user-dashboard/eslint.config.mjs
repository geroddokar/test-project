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
    plugins: ["react-hooks"],
    rules: {
      "react-hooks/rules-of-hooks": "error", // Проверяет правила хуков
      "react-hooks/exhaustive-deps": "warn", // Проверяет зависимости хуков
    },
  },
];

export default eslintConfig;
