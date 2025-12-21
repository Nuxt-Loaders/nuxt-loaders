<template>
  <div>
    <component :is="loaderName" v-if="loaderName" />
  </div>
</template>


<script lang="ts" setup>
import { useNuxtApp } from '#app';
import { computed } from 'vue';
import { logWarn } from '../lib/log';

const nuxt = useNuxtApp();

const loaderName = computed(() => {
  const name = nuxt.$config.public.loaders._activeLoader || nuxt.$config.public.loaders._defaultLoader;

  if (!name || !name.trim()) {
    logWarn("No loaders have been set.");
    return null;
  }

  return name;
});

</script>