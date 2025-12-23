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
  width: 120px;
  height: 20px;
  -webkit-mask: radial-gradient(circle closest-side, currentColor 94%, transparent) left/20% 100%;

  background: linear-gradient(currentColor 0 0) left/0% 100% no-repeat #f3f3f3;

  animation: step-anim 2s infinite steps(6);
}

@keyframes step-anim {
  100% { background-size: 120% 100%; }
}
</style>
