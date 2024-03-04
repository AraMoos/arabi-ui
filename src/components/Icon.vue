<script setup lang="ts">
interface props {
  name?: string;
}
 withDefaults(defineProps<props>(), {
  name: "error-warning",
});
</script>

<template>
  <i :class="'e-icon-' + name" />
</template>
