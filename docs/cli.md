# CLI Tool

`nuxt-loaders` comes with a built-in CLI tool to help you manage your loaders.

## Usage

The CLI is available via the `nuxt-loaders` command (or `nl` alias if configured).

```bash
npx loaders <command> [options]
```

## Commands

### `add`

Adds a new loader to your project.

```bash
npx loaders add <loader-name>
```

This command will:

1.  Fetch the loader component from the remote template store.
2.  Save it to your configured `loadersDir` (default: `app/components/loaders`).
3.  Update `loaders.config.json` to track the installed loader.

**Example:**

```bash
npx loaders add basic
```

### `remove`

Removes an installed loader from your project.

```bash
npx loaders remove <loader-name>
```

This command will:

1.  Delete the loader component file from your `loadersDir`.
2.  Remove the entry from `loaders.config.json`.

**Example:**

```bash
npx loaders remove basic
```

## Troubleshooting

- **"Not a Nuxt project"**: Ensure you are running the command from the root of your Nuxt project.
- **"Could not find loaders config"**: Make sure you have added the module to your `nuxt.config.ts` and run `nuxi prepare` or started the dev server at least once to generate the `loaders.config.json` file.
