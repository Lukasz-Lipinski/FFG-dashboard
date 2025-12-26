<template>
  <div>
    <ErrorMessage class="error-msg" :name="name" />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  name: string;
}>();
</script>

<style scoped lang="css">
div {
  position: relative;
  padding-bottom: calc(0.5rem + 0.28125rem);
  padding-left: 0.5rem;
}

.error-msg {
  position: absolute;
  color: #ef4444;
  font-size: 0.75rem;
  font-weight: 400;
  margin-top: 0.25rem;
}
</style>
