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
  width: 70px;
  height: 30px;
  overflow: hidden;
  position: relative;
  color: currentColor;
}

.loader::before {
  content: "";
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  inset: 0;
  margin: auto;
  background: currentColor;
  transform-origin: bottom;
  animation: l10-1 3s infinite;
}

.loader::after {
  content: "";
  position: absolute;
  width: 8px;
  height: 14px;
  bottom: calc(50% - 4px);
  background: currentColor;
  animation: l10-2 3s infinite;
}

@keyframes l10-1 {

  0%,
  10% {
    transform: translate(0) scale(1);
    box-shadow: 60px 0, 60px 0
  }

  20%,
  40% {
    transform: translate(20px) scale(1);
    box-shadow: 60px 0, 60px 0
  }

  48% {
    transform: translate(20px) scale(1);
    box-shadow: 8px 0, 60px 0
  }

  50% {
    transform: translate(20px) scale(1.5);
    box-shadow: 0 0, 60px 0
  }

  58% {
    transform: translate(20px) scale(1.5);
    box-shadow: 0 0, 8px 0
  }

  60%,
  70% {
    transform: translate(20px) scale(2);
    box-shadow: 0 0, 0 0
  }

  85% {
    transform: translate(-50px) scale(2);
    box-shadow: 0 0, 0 0
  }

  87% {
    transform: translate(-50px) scale(1);
    box-shadow: 0 0, 0 0
  }

  100% {
    transform: translate(0) scale(1);
    box-shadow: 0 0, 0 0
  }
}

@keyframes l10-2 {

  20%,
  70% {
    left: 50%
  }

  0%,
  10%,
  85%,
  100% {
    left: -25px
  }
}
</style>
