import { defineConfig, createIgnorePlugin } from "@tsslint/config";
import { convertConfig } from "@tsslint/eslint";
import tseslint from "typescript-eslint";
import tsreact from "eslint-plugin-react";
import type { Linter } from "eslint";

const convertNumbericErrorLevelToString = (
  level: number,
): Linter.RuleSeverity => {
  switch (level) {
    case 0:
      return "off";
    case 1:
      return "warn";
    case 2:
      return "error";
    default:
      return "off";
  }
};

const tseslintRecommended = tseslint.configs.recommendedTypeChecked
  .filter((config) => "rules" in config)
  .reduce((acc, config) => {
    acc = { ...acc, ...config.rules };
    return acc;
  }, {} as Linter.Config["rules"]);

const tsreactRecommended = [
  tsreact.configs.recommended,
  tsreact.configs["jsx-runtime"],
].reduce((acc, config) => {
  const rules = Object.entries(config.rules).reduce((acc, [rule, value]) => {
    if (typeof value === "number") {
      acc[rule] = convertNumbericErrorLevelToString(value);
    }
    return acc;
  }, {} as Record<string, Linter.RuleSeverity>);

  acc = { ...acc, ...rules };
  return acc;
}, {} as Linter.Config["rules"]);

export default defineConfig({
  include: [
    "**/*.js",
    "**/*.jsx",
    "**/*.mjs",
    "**/*.cjs",
    "**/*.ts",
    "**/*.tsx",
  ],
  rules: convertConfig({
    ...tseslintRecommended,
    ...tsreactRecommended,
    "@typescript-eslint/prefer-nullish-coalescing": "warn",
    "@typescript-eslint/no-base-to-string": "error",
    "no-console": "warn",
  }),
  plugins: [
    createIgnorePlugin("eslint-disable-next-line", true),
    createIgnorePlugin("@tsslint-ignore", true),
  ],
});
