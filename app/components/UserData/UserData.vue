<template>
  <div class="user-data-container">
    <h2 class="user-data-header">Your Data</h2>
    <div class="user-data-credential-box">
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

const { setValues, values, errors } = useForm({
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
.user-data-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 0.5rem;
}

.user-data-header {
  font-weight: 600;
  font-size: 1.2rem;
}

.user-data-credential-box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
}
</style>
