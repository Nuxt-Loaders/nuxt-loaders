<template>
    <div>
        <h1 :class="className ? className : `text-xl`" class="text-xl">Loading...</h1>
    </div>
</template>

<script lang="ts" setup>
import type { LoaderBaseProps } from '../types/loaders';

const { class: className } = withDefaults(defineProps<LoaderBaseProps>(), { class: "" })
</script>