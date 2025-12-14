<template>
  <NuxtLayout name="dashboard">
    <UserData :userCredential="user" />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import UserData from "~/components/UserData/UserData.vue";
import type { UserDto } from "~~/server/dtos/users/UserDto";

const user = useCookie<UserDto>("user");
</script>

<style lang="css" scoped></style>
