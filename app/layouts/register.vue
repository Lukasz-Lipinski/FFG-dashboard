<template>
  <div class="form-container">
    <slot />
  </div>
</template>

<script lang="ts" setup></script>

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

@media (max-width: 768px) {
  .form-container {
    padding: 0.5rem;
    gap: 0.75rem;
  }
}
</style>
