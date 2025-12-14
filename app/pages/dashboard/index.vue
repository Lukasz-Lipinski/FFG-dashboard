<template>
  <NuxtLayout name="dashboard">
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
const pageUrl = useState("pageUrl");
const data = useFetch("/api/user");
</script>

<style lang="css"></style>
