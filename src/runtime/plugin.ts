import { defineNuxtPlugin, type RuntimeNuxtHooks } from "#app";
import { getActiveLoader } from "./lib/utils/route-rules";
import { useLoader } from "./composables/useLoader";
import { onBeforeUnmount, onUnmounted } from "vue";

export default defineNuxtPlugin((nuxt) => {
  const pageLoadingStartHooks: (keyof RuntimeNuxtHooks)[] = [
    "page:loading:start",
    "app:created",
  ];
  const pageLoadingEndHooks: (keyof RuntimeNuxtHooks)[] = [
    "page:loading:end",
    "app:mounted",
  ];

  const states = useLoader();
  const { isLoading } = states;

  const ctx = nuxt.$config.public.loaders;
  const { autoSetup, routeRules } = ctx;

  if (autoSetup) {
    nuxt.hooks.beforeEach((e) => {
      if (pageLoadingStartHooks.includes(e.name)) {
        const newActive = getActiveLoader(routeRules, nuxt._route.fullPath);
        if (newActive !== ctx._activeLoader) {
          ctx._activeLoader = newActive ?? "";
        }
        isLoading.value = true;
      } else if (pageLoadingEndHooks.includes(e.name)) {
        isLoading.value = false;
      }
    });
  }
});
