<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: Nuxt Loaders
- Package name: nuxt-loaders
- Description: Simple loading screen engine for Nuxt 4+
-->

# Nuxt Loaders

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Simple loading screen engine for Nuxt 4+.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
  <!-- - [🏀 Online playground](https://stackblitz.com/github/haileabt/nuxt-loaders?file=playground%2Fapp.vue) -->
  <!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

- 🔄 **Automatic Loader Registration**: Automatically registers loader components from your specified directory.
- 🛣️ **Route-based Configuration**: Assign specific loaders to different routes using `routeRules`.
- 🎨 **TailwindCSS Integration**: Includes TailwindCSS support out of the box.
- ⚡ **Zero Configuration**: Works with sensible defaults, but fully customizable.

## Quick Setup

1. Add `nuxt-loaders` dependency to your project

```bash
npx nuxi module add nuxt-loaders
```

2. Add `nuxt-loaders` to the `modules` section of `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: ["nuxt-loaders"],
});
```

That's it! You can now use Nuxt Loaders in your Nuxt app ✨

## Configuration

You can configure the module in your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ["nuxt-loaders"],
  loaders: {
    // Directory containing your loader components
    // Default: 'app/components/loaders'
    loadersDir: "app/components/loaders",

    // Automatically setup the module
    // Default: true
    autoSetup: true,

    // Define rules for which loader to use on which route
    routeRules: {
      "/": "MyLoader",
      "/admin/*": "AdminLoader",
    },
  },
});
```

### Options

| Option       | Type                     | Default                    | Description                                         |
| ------------ | ------------------------ | -------------------------- | --------------------------------------------------- |
| `loadersDir` | `string`                 | `'app/components/loaders'` | Directory where your loader components are located. |
| `autoSetup`  | `boolean`                | `true`                     | Whether to automatically setup the module.          |
| `routeRules` | `Record<string, string>` | `{}`                       | Map of route patterns to loader component names.    |

## Usage

1. Create your loader components in `app/components/loaders` (or your configured `loadersDir`).
2. The module will automatically register these components.
3. Use `routeRules` in your `nuxt.config.ts` to specify which loader should be active for specific routes.

Example loader component (`app/components/loaders/MyLoader.vue`):

```vue
<template>
  <div class="loader">Loading...</div>
</template>
```

## Contribution

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nuxt-loaders/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-loaders
[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-loaders.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/nuxt-loaders
[license-src]: https://img.shields.io/npm/l/nuxt-loaders.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-loaders
[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
