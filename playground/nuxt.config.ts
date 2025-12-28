import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  modules: ["../src/module"],
  devtools: { enabled: true },
  css: ["./playground/app/assets/css/main.css"],
  compatibilityDate: "2025-07-15",
  vite: {
    plugins: [tailwindcss()],
  },
  loaders: {
    autoSetup: true,
    loadersDir: "./app/components/loaders",
    routeRules: {
      "*": "StepGradientLoader",
      "/about/*": "PulseRailLoader",
    },
  },
});
