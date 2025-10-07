<template>
  <nav>
    <a v-for="link in links">
      {{ link.label }}
    </a>
  </nav>
</template>

<script setup lang="ts">
import type { MenuLinkType } from "~/types/MenuLinkType";

const links: MenuLinkType[] = [
  { href: "/events", label: "Event", icon: "calendar" },
  { href: "/info", label: "Info", icon: "info" },
  { href: "/news", label: "News", icon: "newspaper" },
];
</script>

<style lang="css" scoped></style>
