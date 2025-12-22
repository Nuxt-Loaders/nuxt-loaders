<template>
    <div :class="['loader', className]">
        <h1>Loading...</h1>
    </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{ className?: string }>(), { className: "" })
</script>