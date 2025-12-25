<template>
    <div :class="['loader', className]">
        <h1>Loading{{ dots }}</h1>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';

const dots = ref('.');

let interval: NodeJS.Timeout;

onMounted(() => {
    interval = setInterval(() => {
        dots.value = dots.value.length >= 3 ? '.' : dots.value + '.';
    }, 500);
});

onUnmounted(() => clearInterval(interval));

withDefaults(defineProps<{ className?: string }>(), { className: '' });
</script>