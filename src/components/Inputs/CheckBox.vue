<script lang="ts" setup>
import { getCurrentInstance, onMounted, ref, computed } from "vue";

let uid = ref('');

const props = defineProps<{
  modelValue?: boolean
  label?: string
  checked?: boolean
}>();

onMounted(() => {
  uid.value = (getCurrentInstance()?.uid || uid.value).toString();
});

const emit = defineEmits(['update:modelValue', 'onChange']);

const model = computed({
  get: () => props.modelValue,
  set: (value: boolean) => {
    emit('update:modelValue', value);
    emit('onChange', value);
  }
});
</script>

<template>
  <label class="e-checkbox" :for="`e-checkbox-${uid}`">
    <input :id="`e-checkbox-${uid}`" v-model="model" type="checkbox" :checked="checked">
    <div class="e-check-mark " />
    <span v-if="props.label">{{ props.label }}</span>
  </label>
</template>

<style lang="scss" scoped>
.e-checkbox {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  width: max-content;
  max-width: 100%;
  column-gap: to-rem(5);
  color: color('dark-90');
  font: font(lg-500);
  cursor: pointer;
  user-select: none;

  .e-check-mark {
    display: flex;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    border: 2px solid;
    border-radius: 4px;
    border-color: color('dark-40');
    background-color: color('dark-20');

    @include min-max-(16px, 16px);

    &,
    &::before {
      @include transition-(150);
    }

    &::before {
      content: '';
      width: 100%;
      height: 100%;
      transform: scale(0);
      opacity: 0;
      background-image: url('../../assets/svg-icons/check.svg');
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    }
  }

  input[type="checkbox"] {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    margin: 0;
    opacity: 0;

    &:checked {
      ~ {
        .e-check-mark {
          border-color: color('primary');
          background-color: color('primary');

          &::before {
            transform: scale(1);
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>