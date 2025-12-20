<template>
  <div v-if="isLoading">Loading...</div>

  <NuxtPage />
</template>

<script setup>
import { useLoader } from "../../src/runtime/composables/useLoader";

const config = useLoader();
const { isLoading } = config;

onBeforeMount(() => {
  console.log("Hello");
});
</script>
