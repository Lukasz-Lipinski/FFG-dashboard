<template>
  <NuxtLayout name="dashboard">
    <h1>Configuration Page</h1>
    <ConfigurationForm
      :schema="schema"
      label="Page Url"
      btn-text="Set Page Url"
      @on-submit="($event) => console.log($event)"
    />
  </NuxtLayout>
</template>

<script setup lang="ts">
import ConfigurationForm from "~/components/Forms/OneFieldForm/index.vue";
import * as yup from "yup";

const schema = yup.object({
  pageUrl: yup.string().url().required(),
});
</script>
<style lang="css" scoped>
/* Add your styles here */
</style>
