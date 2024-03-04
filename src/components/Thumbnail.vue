<script setup lang="ts">
defineProps<{
    src?: string
    size?: 'md' | 'lg'
}>()
</script>
<template>
    <div class="thumbnail" :class="size">
        <img :src="src">
    </div>
</template>
<style scoped lang="scss">
.thumbnail {
    @include circle-(to-rem(32));

    overflow: hidden;
    background-color: color('danger-40');

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }


    &.md {
        @include circle-(to-rem(40));
    }

    &.lg {
        @include circle-(to-rem(50));
    }
}
</style>