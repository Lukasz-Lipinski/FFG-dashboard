<template>
  <NuxtLayout name="dashboard">
    users
    {{ user }}
  </NuxtLayout>
</template>

<script lang="ts" setup>
const user = useCookie("user");
</script>

<style lang="css" scoped></style>
