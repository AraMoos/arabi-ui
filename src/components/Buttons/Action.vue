<script lang="ts" setup>
import { Icon } from '~/components';

withDefaults(defineProps<{
    icon?: string;
    variant?: string;
}>(), {
    variant: 'primary',
});
</script>

<template>
    <button :class="[variant]">
        <Icon v-if="icon" class="icon" :name="icon" />
    </button>
</template>

<style lang="scss" scoped>
@mixin button-style($color : 'primary') {
    background-color: rgba((color($color)), 0.2);
    color: color($color);

    &:not(.disabled) {
        &:hover {
            background-color: color($color);
            color: color('white');
        }
    }
}

button {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border: 0;
    border-radius: to-rem(7);
    outline: none;
    font-size: to-rem(14);

    @include transition-(200);

    cursor: pointer;

    @include square-(28px, 28px);
    @include button-style;

    &.secondary {
        @include button-style('secondary');
    }

    &.danger {
        @include button-style('danger');
    }

    &.info {
        @include button-style('info');
    }

    &.success {
        @include button-style('success');
    }

    &.warning {
        @include button-style('warning');
    }

    &.dark {
        @include button-style('dark');
    }
}
</style>