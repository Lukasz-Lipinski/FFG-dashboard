<template>
  <NuxtLayout name="dashboard">
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ConfigurationDto } from "~~/server/dtos/configuration/ConfigurationDto";
import type { UserDto } from "~~/server/dtos/users/UserDto";

const user = useCookie<UserDto>("user");
const siteConfig = useCookie<ConfigurationDto>("site-configuration");
useFetch(`/api/configuration/${user.value.Band}`).then((res) => {
  if (res.data.value) {
    siteConfig.value = res.data.value;
  }
});
</script>

<style lang="css"></style>
