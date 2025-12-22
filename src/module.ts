import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addComponentsDir,
  addImportsDir,
} from "@nuxt/kit";
import tailwindcss from "@tailwindcss/vite";
import {
  getDefaultLoader,
  validateLoaderRules,
} from "./runtime/lib/utils/route-rules";
import { logInfo } from "./runtime/lib/log";
import { existsSync } from "node:fs";
import { writeFile } from "node:fs/promises";

const DEFAULT_LOADERS_PATH = "app/components/loaders";

export interface ModuleOptions {
  autoSetup: boolean;
  loadersDir?: string;
  routeRules: Record<string, string>;
  disableDefault: boolean;
  _activeLoader: string;
  _defaultLoader: string;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-loaders",
    configKey: "loaders",
  },

  defaults: {
    autoSetup: true,
    routeRules: {},
    _defaultLoader: "BasicLoader",
    _activeLoader: "",
  },
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    nuxt.options.css ??= [];
    nuxt.options.css.push(resolver.resolve("./runtime/tailwind.css"));

    const path = await import("node:path");
    const loadersDirPath = options.loadersDir
      ? path.resolve(nuxt.options.rootDir, options.loadersDir)
      : path.resolve(nuxt.options.rootDir, DEFAULT_LOADERS_PATH);

    const configExists = existsSync("loaders.config.json");

    if (!configExists) {
      await writeFile(
        "loaders.config.json",
        JSON.stringify({
          loadersDir: options.loadersDir ?? DEFAULT_LOADERS_PATH,
          installedLoaders: {},
        })
      );
    }

    logInfo("Registering loaders directory:", loadersDirPath);

    const { resolveFiles, addTemplate } = await import("@nuxt/kit");

    const loaderFiles = await resolveFiles(loadersDirPath, "**/*.vue");

    const template = addTemplate({
      filename: "loader-plugin.mjs",
      getContents: () => {
        const imports = loaderFiles
          .map((file, index) => {
            const name =
              file.split("/").pop()?.replace(".vue", "") || `Loader${index}`;
            return `import ${name} from '${file}'`;
          })
          .join("\n");

        const registrations = loaderFiles
          .map((file, index) => {
            const name =
              file.split("/").pop()?.replace(".vue", "") || `Loader${index}`;
            return `nuxtApp.vueApp.component('${name}', ${name})`;
          })
          .join("\n");

        return `
import { defineNuxtPlugin } from '#app'
${imports}

export default defineNuxtPlugin((nuxtApp) => {
  ${registrations}
})
        `;
      },
    });

    addPlugin(template.dst);

    addComponentsDir({
      path: resolver.resolve("./runtime/components"),
      global: true,
    });

    addImportsDir(resolver.resolve("./runtime/composables"));

    nuxt.options.vite.plugins ??= [];
    nuxt.options.vite.plugins.push(tailwindcss());

    const validatedLoaderRules = validateLoaderRules(options.routeRules);

    nuxt.options.runtimeConfig.public.loaders = {
      ...options,
      routeRules: validatedLoaderRules,
      loadersDir: loadersDirPath,
    };
    if (options.routeRules && Object.keys(options.routeRules).length > 0) {
      nuxt.options.runtimeConfig.public.loaders._activeLoader =
        getDefaultLoader(validatedLoaderRules) ?? "";
    }
    nuxt.options.runtimeConfig.public.loaders._defaultLoader =
      getDefaultLoader(validatedLoaderRules) ?? "";

    addPlugin(resolver.resolve("./runtime/plugin"));
  },
});
