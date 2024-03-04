<script lang="ts" setup>
import '~/assets/icons/e-icon.css';
import { Overlay, Button } from '~/components';
import type { DialogType } from './types';
import { computed } from 'vue';

const props = withDefaults(defineProps<{
    show?: boolean
    title: string
    confirmLabel?: string
    cancelLabel?: string
    hideCancel?: boolean
    dialogType?: DialogType
}>(), {
    show: false,
    dialogType: 'info',
    confirmLabel: 'Yes',
    cancelLabel: 'No',
});
const emit = defineEmits(['onBackdropClick', 'onConfirm', 'onCancel']);

const iconName = computed(() => {
    switch (props.dialogType) {
        case 'warning':
            return 'error-warning';
        case 'danger':
            return 'alert';
        case 'success':
            return 'checkbox-circle';
        default:
            return 'information';
    }
});

const BackdropClick = () => {
    emit('onBackdropClick');
};
</script>

<template>
  <Overlay :visible="show" @on-backdrop-click="BackdropClick">
    <Transition name="bounce">
      <div v-if="show" class="dialog-box" :class="dialogType">
        <div class="body">
          <div class="content">
            <i class="icon" :class="[dialogType, `e-icon-${iconName}`]" />
            <div class="message">
              <h5>{{ title }}</h5>
            </div>
          </div>
          <div class="footer">
            <Button :label="confirmLabel" size="sm" @click="() => emit('onConfirm')" />
            <Button v-if="!hideCancel"
                    :label="cancelLabel"
                    size="sm"
                    outline
                    @click="() => emit('onCancel')"
            />
          </div>
        </div>
      </div>
    </Transition>
  </Overlay>
</template>

<style scoped lang="scss">
.dialog-box {
    box-sizing: border-box;
    max-width: $sm;
    padding: to-rem(24) to-rem(28);
    border-radius: to-rem(7);
    background-color: color('white');
    user-select: none;

    .body {
        display: flex;
        flex-direction: column;
        row-gap: to-rem(24);

        .content {
            display: flex;
            column-gap: to-rem(12);

            .message {
                display: flex;
                flex-direction: column;
                row-gap: to-rem(8);
            }
        }

        .footer {
            display: flex;
            flex-direction: row-reverse;
            column-gap: to-rem(8);
        }
    }

    .icon {
        color: color('info');
        font-size: to-rem(24);

        &.warning {
            color: color('warning');
        }

        &.success {
            color: color('success');
        }

        &.danger {
            color: color('danger');
        }
    }
}

.bounce-enter-active {
    animation: bounce 0.3s ease-in-out;
}

.bounce-leave-active {
    animation: bounce 0.3s reverse ease-in-out;
}

@keyframes bounce {
    0% {
        transform: scale(0.9);
        opacity: 0;
    }

    50% {
        transform: scale(1.05);
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
}
</style>
