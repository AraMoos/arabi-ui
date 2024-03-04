<template>
  <div class="card">
    <slot />
  </div>
</template>
<style scoped lang="scss">
.card {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  width: 100%;
  padding: to-rem(24);
  border: 1px solid color('dark-40');
  border-radius: to-rem(16);
  background-color: color('white');
}
</style>