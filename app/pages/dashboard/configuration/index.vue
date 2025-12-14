<template>
  <NuxtLayout name="dashboard">
    <h2 class="title">Configuration Page</h2>
    <div class="frame">
      <ConfigurationForm
        :schema="schema"
        title="Set Page Url"
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

const user = useCookie<UserDto>("user");
const pageUrl = useState<string>("pageUrl");

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
    body: JSON.stringify({
      pageUrl: url.pageUrl,
    }),
  });

  if (!response.ok) {
    error("Failed to save url");
  } else {
    success("Url saved successfully!");
    const url = await response.json();
    pageUrl.value = url;
  }
}
</script>
<style lang="css" scoped>
.frame {
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 1.5rem;
}
</style>
