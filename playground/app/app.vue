<template>
  <Loader v-if="isLoading" />
  <CircularLoader  class="text-black"/>

  <NuxtPage />

</template>

<script setup>
import CircularLoader from "../../src/templates/CircularLoader.vue"

const config = useLoader();
const { isLoading } = config;

onBeforeMount(() => {
  console.log("Hello");
});
</script>
