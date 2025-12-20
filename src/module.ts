import { defineNuxtModule, addPlugin, createResolver } from "@nuxt/kit";


export interface ModuleOptions {
  autoSetup: boolean;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-loaders",
    configKey: "loaders",
  },
  defaults: {
    autoSetup: true
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    nuxt.options.runtimeConfig.public.loaders = { ...options };

    addPlugin(resolver.resolve("./runtime/plugin"));
  },
});
