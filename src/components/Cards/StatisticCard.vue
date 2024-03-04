<script setup lang="ts">
import { Card } from '~/components';

defineProps<{
  number?: string
  label?: string
  suffix?: string
  prefix?: string
}>();
</script>
<template>
  <Card>
    <div class="statistic-card">
      <div class="circle">
        <i class="icon e-icon-user" />
      </div>
      <div class="labels">
        <h2>
          <span v-if="prefix" class="prefix">{{ prefix }}</span> 
          {{ number }} 
          <span v-if="suffix" class="suffix">{{ suffix }}</span>
        </h2>
        <div class="label">
          {{ label }}
        </div>
      </div>
    </div>
  </Card>
</template>
<style scoped lang="scss">
.statistic-card {
  display: flex;
  box-sizing: border-box;
  flex-wrap: wrap;
  width: 100%;
  column-gap: to-rem(16);
  user-select: none;

  .circle {
    @include circle-(to-rem(44), true);

    background-color: color('success-60');

    i {
      font-size: to-rem(22);
    }
  }


  .icon,
    .suffix,
    .prefix {
      color: color(primary);
    }

  .labels {
    display: flex;
    flex: 1;
    flex-direction: column;
    row-gap: 4px;

    h2 {
      color: color(dark-90);
    }

    .suffix,
    .prefix {
      font: font(sm-600);
    }

    .label {
      color: color(dark-80);
      font: font(lg);
    }
  }

}
</style>