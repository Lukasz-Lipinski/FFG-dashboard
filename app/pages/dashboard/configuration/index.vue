<template>
  <NuxtLayout name="dashboard">
    <h2 class="title">Configuration Page</h2>
    <div class="frame">
      <ConfigurationForm
        :schema="schema"
        title="Set Page Url"
        fieldName="pageUrl"
        label="Page Url"
        btn-text="Set Page Url"
        @onSubmit="onSubmit"
      />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import ConfigurationForm from "~/components/Forms/OneFieldForm/index.vue";
import { object, string } from "yup";
import type { GenericObject } from "vee-validate";

const schema = object({
  pageUrl: string()
    .required("URL is required")
    .matches(
      /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/,
      {
        name: "Invalid-url",
        message: "Please enter a valid URL",
      }
    ),
});

function onSubmit(event: GenericObject) {
  const url = event as { pageUrl: string };
  console.log("Form submitted with:", event);
}
</script>
<style lang="css" scoped>
.frame {
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 1.5rem;
}
</style>
