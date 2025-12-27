<template>
  <nav>
    <NuxtLink v-for="link in links" :to="link.href">
      <VIcon :icon="'mdi-' + link.icon" />
      {{ link.label }}
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
import type { MenuLinkType } from "~/types/MenuLinkType";

const links: MenuLinkType[] = [
  { href: "/dashboard/content/create-gig", label: "Gig", icon: "calendar" },
  { href: "/dashboard/content/create-info", label: "Info", icon: "info" },
  { href: "/dashboard/content/create-news", label: "News", icon: "newspaper" },
];
</script>

<style lang="css" scoped></style>
