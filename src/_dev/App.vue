<script setup lang="ts">
import '~/assets/icons/e-icon.css';
import '~/assets/fonts/fonts.css';
import { ref } from 'vue';
import ExTable from '~/examples/ExTable.vue';

const value = ref('');
</script>

<template>
  <div class="main">
    <div class="container">
      <ExTable />
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
}
</style>
<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: center;
  min-width: 100vw;
  min-height: 100vh;
}

.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: $lg;
  margin: 0 auto;
}
</style>