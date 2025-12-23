<template>
  <div :class="['loader', className]"></div>
</template>

<script setup lang="ts">
defineProps<{
  className?: string
}>()
</script>

<style scoped>
.loader {
  width: 40px;
  aspect-ratio: 1.154;
  --_g: no-repeat radial-gradient(farthest-side, currentColor 90%, transparent);

  background: 
    var(--_g) 50% 0,
    var(--_g) 0 100%,
    var(--_g) 100% 100%;

  background-size: 35% calc(35% * 1.154);
  animation: tri-dot 1s infinite;
}

@keyframes tri-dot {
  50%, 100% {
    background-position: 100% 100%, 50% 0, 0 100%;
  }
}
</style>
