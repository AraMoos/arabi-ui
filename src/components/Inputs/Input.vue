<script setup lang="ts">
import { getCurrentInstance, computed } from 'vue';
import { inputTypeAttribute } from './types';
import InputGroup from './InputGroup.vue';

interface Props {
  label?: string
  errors?: Array<string>
  type?: inputTypeAttribute
  modelValue?: string;
}
const props = withDefaults(defineProps<Props>(), {
  type: 'text'
});

const uid = `input-${getCurrentInstance().uid}`;

const emit = defineEmits(['update:modelValue']);
const model = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});
</script>

<template>
  <InputGroup :label="label" :errors="errors" :uid="uid">
    <template #input>
      <div class="input" :class="{ 'has-error': errors.length }">
        <textarea v-if="type === 'textarea'" :id="uid" v-model="model" v-bind="$attrs" />
        <input v-else :id="uid" v-model="model" :type="type" v-bind="$attrs">
      </div>
    </template>
    <slot />
  </InputGroup>
</template>
<style lang="scss" scoped>
.input {
  display: flex;
  width: 100%;

  input,
  textarea {
    @include input-base;

    flex: 1;
  }

  input {
    height: to-rem(48);
    padding: 0 to-rem(12);
  }

  textarea {
    height: to-rem(100);
    padding: to-rem(12);
    resize: none;

  }

  &.has-error {
    input,
    textarea {
      border-color: color('error');

      &::placeholder{
        color: color('error');
      }
    }
  }
}
</style>
