<template>
  <NuxtLayout name="dashboard">
    <h2 class="title">Configuration Page</h2>
    <p class="page-subtitle">Adjust application settings</p>
    <div class="frame">
      <h3>Set Page URL</h3>
      <ConfigurationForm
        :schema="schema"
        :initial-value="siteConfig?.Link"
        fieldName="pageUrl"
        label="Page Url"
        btn-text="Save"
        @onSubmit="onSubmit"
      />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import ConfigurationForm from "~/components/Forms/OneFieldForm/index.vue";
import { object, string } from "yup";
import type { GenericObject } from "vee-validate";
import type { UserDto } from "~~/server/dtos/users/UserDto";
import type { ConfigurationDto } from "~~/server/dtos/configuration/ConfigurationDto";

const user = useCookie<UserDto>("user");
const siteConfig = useCookie<ConfigurationDto>("site-configuration");

const { error, success } = useToast();

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

async function onSubmit(event: GenericObject) {
  const url = event as { pageUrl: string };

  const response = await fetch(`/api/configuration/${user.value.Band}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pageUrl: url.pageUrl,
      userId: user.value.Id,
    }),
  });

  if (!response.ok) {
    error("Failed to save url");
  } else {
    success("Url saved successfully!");
    const savedUrl = (await response.json()) as ConfigurationDto;
    siteConfig.value = savedUrl;
  }
}
</script>

<style lang="css" scoped>
/* Page title styling */
.title {
  font-size: 1.75rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.5rem 0;
}

/* Page subtitle styling */
.page-subtitle {
  font-size: 1rem;
  font-weight: 400;
  color: #6b7280;
  margin: 0 0 2rem 0;
}

/* Frame/card styling */
.frame {
  background-color: #ffffff;
  border: 0.0625rem solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05);
  max-width: 37.5rem;
  margin: 0 auto;

  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #111827;
    margin: 0 0 1rem 0;
    text-align: center;
    width: 100%;
    display: block;
    padding-top: 0.5rem;
    border-bottom: 0.0625rem solid #ccc;
    padding-bottom: 0.5rem;
  }
}

/* Responsive design */
@media (max-width: 48rem) {
  .title {
    font-size: 1.5rem;
  }

  .frame {
    padding: 1.25rem;
  }
}

@media (max-width: 30rem) {
  .title {
    font-size: 1.375rem;
  }
}
</style>
