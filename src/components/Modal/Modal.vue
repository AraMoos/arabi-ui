<script lang="ts" setup>
import '~/assets/icons/e-icon.css';
import { Overlay, Button } from '~/components';

withDefaults(defineProps<{
    show?: boolean
    title: string
    confirmLabel?: string
    cancelLabel?: string
    hideCancel?: boolean
}>(), {
    show: false,
    confirmLabel: 'Save',
    cancelLabel: 'Cancel',
});
const emit = defineEmits(['update:show', 'onConfirm', 'onCancel']);

const close = () => {
    emit('update:show', false);
};

const handleCancel = () => {
    close();
    emit('onCancel');
};

const BackdropClick = () => {
    close();
};
</script>

<template>
  <Overlay :visible="show" @on-backdrop-click="BackdropClick">
    <Transition name="bounce">
      <div v-if="show" class="modal">
        <div class="body">
          <div class="header">
            <h5>{{ title }}</h5>
            <div class="icon" @click="close">
              <i class="e-icon-close" />
            </div>
          </div>
          <div class="content">
            <slot />
          </div>
          <div class="footer">
            <Button :label="confirmLabel" size="sm" @click="() => emit('onConfirm')" />
            <Button v-if="!hideCancel"
                    :label="cancelLabel"
                    size="sm"
                    outline
                    @click="handleCancel"
            />
          </div>
        </div>
      </div>
    </Transition>
  </Overlay>
</template>

<style scoped lang="scss">
.modal {
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    width: $md;
    max-width: 100%;
    max-height: 100%;
    border-radius: to-rem(7);
    background-color: color('white');

    .body {
        display: flex;
        box-sizing: border-box;
        flex: 1;
        flex-direction: column;
        width: 100%;
        max-height: 100%;
        overflow: hidden;

        .content {
            flex: 1;
            max-height: 100%;
            padding: to-rem(24);
            overflow: hidden auto;
        }

        .footer,
        .header {
            display: flex;
            flex-wrap: wrap;
            padding: to-rem(24);
            column-gap: to-rem(8);
            user-select: none;
        }

        .header {
            align-items: center;
            justify-content: space-between;
            padding: to-rem(16) to-rem(24);
            border-bottom: 1px solid color('dark-40');

            .icon {
                cursor: pointer;

                @include circle-(34px, true);

                i {
                    font-size: 24px;
                }
            }
        }

        .footer {
            display: flex;
            flex-direction: row-reverse;
            border-top: 1px solid color('dark-40');
            user-select: none;
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
