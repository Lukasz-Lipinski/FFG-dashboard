<template>
  <div class="user-data-wrapper">
    <div>
      <div class="user-data-header">User Profile</div>
      <div class="user-data-subheader">Manage your account settings</div>
    </div>
    <div class="user-data-container">
      <div class="user-data-credential-box">
        <h3 class="user-data-header">Account Information</h3>
        <VRow align="center">
          <span class="user-data-text">Band: {{ user.Band }}</span>
        </VRow>
        <VRow align="center">
          <span class="user-data-text">Role: {{ user.Role }}</span>
        </VRow>
        <VRow>
          <OneFieldForm
            class="user-data-form"
            fieldName="Email"
            label="Email"
            btn-text="Save"
            :initialValue="user.Email"
            :schema="schema"
            @onSubmit="onSubmit"
          />
        </VRow>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import OneFieldForm from "../Forms/OneFieldForm/index.vue";
import { useForm, type GenericObject } from "vee-validate";
import { VRow } from "vuetify/components";
import * as yup from "yup";
import type { UserDto } from "~~/server/dtos/users/UserDto";
import { UpdateUserDataDto } from "../../../server/dtos/users/UpdateUserDataDto";

const user = useCookie<UserDto>("user");
const { error, success } = useToast();

const schema = yup.object({
  Email: yup.string().email("Invalid email").required("Email is required"),
});

useForm({
  validationSchema: schema,
  initialValues: {
    Email: user.value.Email,
  },
});

const onSubmit = async (values: GenericObject) => {
  const body: UpdateUserDataDto = {
    Email: user.value.Email,
    Id: user.value.Id,
    NewEmail: values.Email,
  };

  const response = await fetch("/api/user/edit-data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    error("Failed to update data");
  }

  const data = await response.json();
  if (data && data.error) {
    error(data.error);
  } else {
    success(`Data updated successfully!`);
    user.value = data;
  }
};
</script>

<style scoped lang="css">
/* Page title - top level header */
.user-data-wrapper > div:first-child .user-data-header {
  font-size: 28px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
  padding-top: 0.5rem;
}

/* Subtitle - below page title */
.user-data-wrapper > div:first-child .user-data-subheader {
  font-size: 16px;
  font-weight: 400;
  color: #6b7280;
  margin-bottom: 2rem;
}

/* Main container */
.user-data-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 1.5rem 2rem 2rem 2rem;
}

/* Credential box */
.user-data-credential-box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}

/* Card title - inside credential box */
.user-data-credential-box .user-data-header {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 1rem 0;
  text-align: center;
  width: 100%;
  display: block;
  padding-top: 0.5rem;
  border-bottom: 1px solid #ccc;
  padding-bottom: 0.5rem;
}

/* Static field values */
.user-data-credential-box .user-data-text {
  font-size: 15px;
  font-weight: 500;
  color: #111827;
}

/* Form wrapper */
.user-data-form {
  width: 100%;
}

/* Form field labels */
.user-data-form label {
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
}

/* Form input text */
.user-data-form input {
  font-size: 15px;
  font-weight: 400;
  color: #111827;
}

/* Form placeholder text */
.user-data-form input::placeholder {
  font-size: 14px;
  font-weight: 400;
  color: #9ca3af;
}
</style>
