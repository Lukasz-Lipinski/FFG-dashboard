<template>
    <div class="form-container">
        <slot />
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="css" scoped>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  height: 100vh;
  box-sizing: border-box;
  padding: 1rem;
  }
</style>