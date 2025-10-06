<template>
    <NuxtLayout name="dashboard">
        <NuxtPage />
    </NuxtLayout>
</template>

<script lang="ts" setup>
const config = useState("config");
const data = useFetch("/api/user");
</script>

<style lang="css"></style>
