import { defineNuxtPlugin, type RuntimeNuxtHooks } from '#app'
import { useLoader } from './composables/useLoader';


export default defineNuxtPlugin((nuxt) => {
  const pageLoadingStartHooks: (keyof RuntimeNuxtHooks)[] = ["page:loading:start", "app:created"];
  const pageLoadingEndHooks: (keyof RuntimeNuxtHooks)[] = ["page:loading:end", "app:mounted"];

  const states = useLoader();
  const { isLoading } = states;

  const autoSetup = nuxt.$config.public.loaders.autoSetup;
  if (autoSetup) {
    nuxt.hooks.beforeEach((e) => {
      if (pageLoadingStartHooks.includes(e.name)) {
        console.log("Page loading started");
        isLoading.value = true;
      } else if (pageLoadingEndHooks.includes(e.name)) {
        console.log("Page loading ended");
        isLoading.value = false;
      }
    });
  }

})
