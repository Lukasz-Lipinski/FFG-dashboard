<template>
  <ErrorMessage class="error-msg" :name="name" />
</template>

<script lang="ts" setup>
defineProps<{
  name: string;
}>();
</script>

<style scoped lang="css">
.error-msg {
  color: #ef4444;
  font-size: 0.875rem;
  font-weight: 400;
  margin-top: 0.25rem;
}
</style>
