<template>
  <div class="main-container">
    <SideMenu class="custom-width full-height" />
    <div class="main-content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="css" scoped>
.main-container {
  display: flex;
  height: 100dvh;
  padding: 2rem 0;

  .main-content {
    padding: 0 2rem;
  }
}

.custom-width {
  min-width: 240px;
}
</style>
