<template>
  <Loader v-if="isLoading" class="bg-black! z-[1000]" />
  <NuxtPage />
</template>

<script setup>

const config = useLoader();
const { isLoading } = config;

onBeforeMount(() => {
  console.log("Hello");
});
</script>
