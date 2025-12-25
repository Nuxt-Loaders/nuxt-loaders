# Quick Setup

## Installation

Add `nuxt-loaders` dependency to your project:

```bash
npx nuxi module add nuxt-loaders
```

## Configuration

Add `nuxt-loaders` to the `modules` section of `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ["nuxt-loaders"],
});
```

## Usage

1.  **Add the Loader Component**:
    Add the `<Loader />` component to your `app.vue` (or layout) and control its visibility using `useLoader`.

    ```vue
    <script setup lang="ts">
    const { isLoading } = useLoader();
    </script>

    <template>
      <Loader v-if="isLoading" />
      <NuxtPage />
    </template>
    ```

    The `Loader` component will automatically display the appropriate loader based on your configuration.
