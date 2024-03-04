<script lang="ts" setup>
import { useSlots } from 'vue';
import { Card } from '~/components';
const slots = useSlots();
</script>

<template>
  <div class="form">
    <Card>
      <div class="content">
        <div v-if="slots.header" class="header">
          <slot name="header" />
        </div>
        <slot />
      </div>
    </Card>
  </div>
</template>

<style lang="scss" scoped>
.form {
  width: 100%;

  .content {
    display: flex;
    flex-direction: column;
    row-gap: to-rem(18);
    width: 100%;
  }

  .header {
    display: flex;
    flex-direction: column;
    row-gap: to-rem(10);
  }

}
</style>