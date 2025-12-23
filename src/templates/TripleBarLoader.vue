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
  width: 45px;
  aspect-ratio: 1;
  --c: no-repeat linear-gradient(currentColor 0 0);

  background: var(--c), var(--c), var(--c);

  animation:
    l16-1 1s infinite,
    l16-2 1s infinite;
}

@keyframes l16-1 {
  0%,100%   { background-size: 20% 100%; }
  33%,66%   { background-size: 20% 40%; }
}

@keyframes l16-2 {
  0%,33%    { background-position: 0 0, 50% 100%, 100% 0; }
  66%,100%  { background-position: 0 100%, 50% 0, 100% 100%; }
}
</style>
