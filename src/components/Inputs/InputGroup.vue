<script setup lang="ts">
interface Props {
  label?: string
  errors?: Array<string>
  uid?: string
}
defineProps<Props>();
</script>
<template>
  <div class="input-group">
    <label v-if="label" :for="uid" class="label">{{ label }}</label>
    <slot name="input" />
    <span v-for="(error, index) in errors" :key="index" class="error">{{ error }} </span>
    <slot />
  </div>
</template>
<style lang="scss" scoped>
.input-group {
  display: flex;
  flex-direction: column;
  row-gap: 8px;

  .label {
    color: color('dark-90');
    font: font(lg-600);
  }

  .error{
    color: color('error');
    font: font(sm-600);
  }
}
</style>
