<script lang="ts" setup>


withDefaults(defineProps<{
  gap: string
}>(), {
  gap: '20px'
});
</script>

<template>
  <div class="actions-bar">
    <slot />
  </div>
</template>
<style scoped lang="scss">
.actions-bar {
  display: flex;
  flex-flow: row-reverse wrap;
  width: 100%;
  gap: v-bind(gap);
}
</style>