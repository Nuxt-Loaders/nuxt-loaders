# Module Options

You can configure `nuxt-loaders` using the `loaders` property in your `nuxt.config.ts`.

```ts
export default defineNuxtConfig({
  modules: ["nuxt-loaders"],
  loaders: {
    // Options go here
  },
});
```

## Available Options

| Option           | Type                     | Default                    | Description                                      |
| :--------------- | :----------------------- | :------------------------- | :----------------------------------------------- |
| `loadersDir`     | `string`                 | `'app/components/loaders'` | Directory containing your loader components.     |
| `autoSetup`      | `boolean`                | `true`                     | Automatically sets up the module configuration.  |
| `routeRules`     | `Record<string, string>` | `{}`                       | Map of route patterns to loader component names. |
| `disableDefault` | `boolean`                | `false`                    | Disables the default loader behavior.            |

### `loadersDir`

Specifies the directory where your loader components are located. The module will automatically register any Vue components found in this directory as global components.

**Default**: `app/components/loaders`

```ts
loaders: {
  loadersDir: "app/ui/loading-screens";
}
```

### `autoSetup`

When enabled, the module performs automatic setup tasks, such as creating the `loaders.config.json` file if it doesn't exist.

**Default**: `true`

```ts
loaders: {
  autoSetup: false;
}
```

### `routeRules`

Defines which loader component should be displayed for specific routes. You can use glob patterns to match multiple routes.

**Default**: `{}`

```ts
loaders: {
  routeRules: {
    '/': 'HomeLoader',       // Exact match
    '/admin/*': 'AdminLoader', // Glob pattern
    '/dashboard': 'DashboardLoader'
  }
}
```

### `disableDefault`

If set to `true`, the module will not automatically set a default loader. You will need to manually manage the loader state or ensure all routes have a specific loader assigned.

**Default**: `false`

```ts
loaders: {
  disableDefault: true;
}
```
