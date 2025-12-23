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
  width: 50px;
  padding: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: currentColor;

  --_m:
    conic-gradient(#0000 10%, #000),
    linear-gradient(#000 0 0) content-box;

  -webkit-mask: var(--_m);
          mask: var(--_m);

  -webkit-mask-composite: source-out;
          mask-composite: subtract;

  animation: spin 1s infinite linear;
}

@keyframes spin {
  to {
    transform: rotate(1turn);
  }
}
</style>
