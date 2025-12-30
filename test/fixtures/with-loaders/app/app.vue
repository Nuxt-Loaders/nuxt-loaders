<template>
  <div>
    <h1>Test App with Loaders</h1>
    <NuxtPage />
  </div>
</template>

<script setup>
const { isLoading } = useLoader();
</script>
