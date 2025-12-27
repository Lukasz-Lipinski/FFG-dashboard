<template>
  <NuxtLayout name="dashboard">
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ConfigurationDto } from "~~/server/dtos/configuration/ConfigurationDto";
import { GigDto } from "~~/server/dtos/content/gigs/GigDto";
import type { UserDto } from "~~/server/dtos/users/UserDto";

const user = useCookie<UserDto>("user");
const siteConfig = useCookie<ConfigurationDto | null>("site-configuration");
const content = useCookie<{
  gigs: GigDto[];
  about: any;
} | null>("gigs");

const { error, data } = useAsyncData("content-gigs", async () => {
  const [configuration, gigs] = await Promise.all([
    $fetch<ConfigurationDto>(`/api/configuration/${user.value.Band}`, {
      method: "GET",
    }),
    $fetch<GigDto[]>(`/api/${user.value.Band}/gigs`, {
      method: "GET",
    }),
  ]);

  debugger;
  return { configuration, gigs };
});

const { error: toastError } = useToast();

watch(error, (newError) => {
  if (newError) {
    toastError(newError.statusMessage || "Failed to fetch site configuration");
  }
});

watch(
  () => data.value,
  (newData) => {
    if (newData) {
      siteConfig.value = newData.configuration;
      content.value = {
        gigs: newData?.gigs ?? [],
        about: null,
      };
    }
  }
);
</script>

<style lang="css"></style>
