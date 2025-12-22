<template>
    <div :class="['loader', className]">
        <h1>Loading{{ dots }}</h1>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const dots = ref(".");

onMounted(() => {
    setInterval(() => {
        dots.value += ".";
        if (dots.value.length > 3) {
            dots.value = ".";
        }
    }, 500)
})

withDefaults(defineProps<{ className?: string }>(), { className: "" })
</script>