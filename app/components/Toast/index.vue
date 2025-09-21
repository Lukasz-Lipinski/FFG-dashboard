<template>
  <div v-if="isShown">msg</div>
</template>

<script lang="ts" setup>
const { isShown } = useToast();
</script>

<style></style>
