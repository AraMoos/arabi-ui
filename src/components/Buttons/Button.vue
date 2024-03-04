<script lang="ts" setup>
import { Icon } from '~/components';
import { Variant, Size } from './types';

withDefaults(defineProps<{
    label?: string
    icon?: string
    variant?: Variant
    size?: Size
    outline?: boolean
    disabled?: boolean
}>(), {
    label: 'label',
    variant: 'primary',
    size: 'md',
});
</script>

<template>
  <button :class="[variant, size, { 'outline': outline },{ 'disabled': disabled }]">
    <Icon v-if="icon" class="icon" :name="icon" />
    <span>{{ label }}</span>
  </button>
</template>

<style lang="scss" scoped>
@mixin button-style($color : 'primary') {
    border: 1px solid color($color);
    background-color: color($color);

    &:not(.disabled) {
        &:hover {
            background-color: rgba((color($color)), 0.85);
            box-shadow: 0 0 10px 1px rgba(color($color), 0.2);
        }
    }

    &.outline {
        background-color: color('white');

        *,
        & {
            color: color($color);
        }

        &:hover {
            background-color: color('white');
            color: color('white');
        }

    }
}

button {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    width: max-content;
    max-width: 100%;
    height: to-rem(48);
    padding: 0 to-rem(28);
    overflow: hidden;
    column-gap: to-rem(8);
    border-radius: to-rem(7);
    cursor: pointer;
    user-select: none;

    @include transition-(200);
    
    *,
    & {
        position: relative;
        z-index: 2;
        color: color('white');
        font: font(lg-500);
    }

    .icon {
        font-size: to-rem(16);
    }

    &.md {
        height: to-rem(40);
        padding: 0 to-rem(24);

        &.e-button {
            &-icon-only {
                width: to-rem(40);
                max-width: to-rem(40);
            }
        }
    }

    &.sm {
        height: to-rem(32);
        padding: 0 to-rem(16);

        &.e-button {
            &-icon-only {
                width: to-rem(32);
                max-width: to-rem(32);
            }
        }
    }


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

    &.disabled {
        border: 1px solid color('dark-60');
        background-color: color('dark-20');
        cursor: not-allowed;

        *,
        & {
            color: color('dark-60');
        }

    }
}
</style>