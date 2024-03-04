<script setup lang="ts">
defineProps<{
    active?: boolean
}>();
</script>
<template>
    <svg width="8" height="4" viewBox="0 0 6 3" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path :class="{ active }" d="M3 3L-2.62268e-07 5.24537e-07L6 0L3 3Z" />
    </svg>
</template>

<style scoped lang="scss">
svg {
    path {
        fill: color('dark-90');

        @include transition-(150);

        &.active {
            fill: color('primary');
        }
    }
}
</style>