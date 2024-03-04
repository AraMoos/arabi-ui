<script setup lang="ts">
interface Props {
  size?: string
  color?: string
  thickness?: string
}
withDefaults(defineProps<Props>(), {
  size: '20px',
  color: '#0010F7',
  thickness: 'medium',
});
</script>
<template>
  <div class="spinner" />
</template>
<style scoped>
.spinner {
  width: v-bind(size);
  height: v-bind(size);
  animation: spinner 0.7s infinite linear;
  border: v-bind(thickness) solid v-bind(color);
  border-radius: 50%;
  border-bottom-color: transparent;
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
