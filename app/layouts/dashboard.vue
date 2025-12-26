<template>
  <div class="main-container">
    <SideMenu class="custom-width full-height" />
    <div class="main-content">
      <BreadcrumbsNav />
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import BreadcrumbsNav from "~/components/BreadcrumbsNav/BreadcrumbsNav.vue";
</script>

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
  min-width: 15rem;
}

@media (max-width: 768px) {
  .main-container {
    padding: 1rem 0;

    .main-content {
      padding: 0 1rem;
    }
  }

  .custom-width {
    min-width: 10rem;
  }
}
</style>
