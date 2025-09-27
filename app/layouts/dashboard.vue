<template>
  <div class="main-container">
    <SideMenu class="custom-width" />
    <slot />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="css" scoped>
.main-container {
  display: flex;
}

.custom-width {
  min-width: 240px;
}
</style>
