<template>
  <NuxtLayout name="dashboard">
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ConfigurationDto } from "~~/server/dtos/configuration/ConfigurationDto";
import type { UserDto } from "~~/server/dtos/users/UserDto";

const user = useCookie<UserDto>("user");
const siteConfig = useCookie<ConfigurationDto | null>("site-configuration");
const { data, error } = useFetch<ConfigurationDto | null>(
  `/api/configuration/${user.value.Band}`
);
const { error: toastError } = useToast();

watch(error, (newError) => {
  if (newError) {
    toastError(newError.statusMessage || "Failed to fetch site configuration");
  }
});

watch(data, (newData) => {
  if (newData) {
    siteConfig.value = newData;
  }
});
</script>

<style lang="css"></style>
