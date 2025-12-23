<template>
  <NuxtLayout name="dashboard">
    <h2 class="title">Configuration Page</h2>
    <p class="page-subtitle">Adjust application settings</p>
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
const pageUrl = useState<string>("pageUrl", () => "");

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
    const savedUrl = await response.json();
    pageUrl.value = savedUrl;
  }
}
</script>

<style lang="css" scoped>
/* Main container styling */
.configuration-page {
  font-family: Inter, Roboto, system-ui, -apple-system, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 40px;
}

/* Page title styling */
.title {
  font-size: 28px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 8px 0;
}

/* Page subtitle styling */
.page-subtitle {
  font-size: 16px;
  font-weight: 400;
  color: #6b7280;
  margin: 0 0 32px 0;
}

/* Frame/card styling */
.frame {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  max-width: 600px;
  margin: 0 auto;
}

/* Form title styling */
.frame h4 {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 24px 0;
  text-align: center;
}

/* Form label styling */
.v-label {
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  display: block;
  margin-bottom: 8px;
}

/* Input field styling */
.form-field {
  font-size: 15px;
  font-weight: 400;
  color: #111827;
  padding: 12px 14px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #ffffff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  width: 100%;
  margin-bottom: 8px;
}

.form-field:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

/* Error message styling */
.error-message {
  font-size: 14px;
  color: #ef4444;
  margin-top: 4px;
  margin-bottom: 16px;
}

/* Divider styling */
.form-divider {
  height: 1px;
  background-color: #e5e7eb;
  margin: 16px 0;
}

/* Button styling */
.v-btn {
  font-family: Inter, Roboto, system-ui, -apple-system, sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: #ffffff;
  background-color: #2563eb;
  border: none;
  border-radius: 10px;
  padding: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  width: 100%;
  margin-top: 16px;
}

.v-btn:hover:not(:disabled) {
  background-color: #1d4ed8;
}

.v-btn:disabled {
  background-color: #93c5fd;
  cursor: not-allowed;
  opacity: 0.7;
}

/* Responsive design */
@media (max-width: 768px) {
  .configuration-page {
    padding: 24px 20px;
  }

  .title {
    font-size: 24px;
  }

  .frame {
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .configuration-page {
    padding: 16px 12px;
  }

  .title {
    font-size: 22px;
  }

  .frame h4 {
    font-size: 16px;
  }
}
</style>
