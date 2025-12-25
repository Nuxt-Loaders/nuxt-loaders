<template>
  <Loader v-if="isLoading" />
  <NuxtPage />
</template>

<script setup>

const config = useLoader();
const { isLoading } = config;

onBeforeMount(() => {
  console.log("Hello");
});
</script>
