<script lang="ts" setup>
withDefaults(defineProps<{
  visible?: boolean;
  center?: boolean
}>(), {
  visible: false,
  center: true,
});
const emit = defineEmits(['onBackdropClick']);
</script>

<template>
  <Transition name="fade">
    <div v-show="visible" class="overlay" :class="{ center }">
      <div class="backdrop" @click="emit('onBackdropClick')" />
      <div class="body">
        <slot />
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.overlay {
  position: fixed;
  z-index: 999999999;
  top: 0;
  left: 0;
  width: 100vw;
  min-width: 100vw;
  max-width: 100vw;
  height: 100vh;
  min-height: 100vh;
  max-height: 100vh;
  background-color: rgba((color('dark-90')), 0.2);

  &.center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .backdrop {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .body {
    position: relative;
    z-index: 2;
    box-sizing: border-box;
    max-width: 100%;
    max-height: 100%;
    padding: 20px;
    overflow: hidden;
  }
}

.fade-enter-active {
  animation: fade 0.3s ease-in-out;
}

.fade-leave-active {
  animation: fade 0.3s reverse ease-in-out;
}

@keyframes fade {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
