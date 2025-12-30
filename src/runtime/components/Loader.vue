<template>
  <div
    :class="[
      className,
      'w-screen h-svh fixed top-0 left-0 z-50 grid place-items-center bg-black',
    ]"
  >
    <component :is="loaderName" />
  </div>
</template>

<script lang="ts" setup>
import { useNuxtApp } from "#app";
import { computed } from "vue";
import { logWarn } from "../lib/log";

const nuxt = useNuxtApp();

const loaderName = computed(() => {
  const name =
    nuxt.$config.public.loaders._activeLoader ||
    nuxt.$config.public.loaders._defaultLoader;
  if (!name || !name.trim()) {
    logWarn("No loaders have been set.");
    return null;
  }

  return name;
});

withDefaults(defineProps<{ className?: string }>(), { className: "" });
</script>
