// @ts-check
import { createConfigForNuxt } from "@nuxt/eslint-config/flat";
import eslintConfigPrettier from "eslint-config-prettier/flat";

// Run `npx @eslint/config-inspector` to inspect the resolved config interactively
export default createConfigForNuxt({
  features: {
    // Rules for module authors

    tooling: true,
    // Rules for formatting
    stylistic: true,
  },
  dirs: {
    src: ["./playground"],
  },
})
  .append({
    rules: {
      "@typescript-eslint/no-empty-object-type": "off",
      "@stylistic/quotes": ["error", "double", { avoidEscape: true }],
      "@stylistic/brace-style": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "vue/multi-word-component-names": "off",
      "vue/no-multiple-template-root": "off",
      "@stylistic/semi": ["error", "always"],
      "import/no-named-as-default-member": "off",
    },
  })
  .append(eslintConfigPrettier);
