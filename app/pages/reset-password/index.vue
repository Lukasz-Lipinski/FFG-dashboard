<template>
  <NuxtLayout name="register">
    <div class="reset-form">
      <ResetPassowrdForm
        btn-text="Reset password"
        field-name="email"
        label="Email"
        :schema="schema"
        title="Reset password"
        @on-submit="onSubmit($event)"
      />
    </div>
    <NuxtLink to="../">
      <v-icon icon="mdi mdi-undo"></v-icon>
      Back
    </NuxtLink>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { GenericObject } from "vee-validate";
import ResetPassowrdForm from "../../components/Forms/OneFieldForm/index.vue";
import { object, string } from "yup";

const schema = object({
  email: string().email("Invalid email").required("Email is required"),
});

function onSubmit(data: GenericObject) {
  console.log(data);
}
</script>

<style lang="css" scoped>
.reset-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid var(--border-color);
  padding: 3rem;
  border-radius: 0.5rem;
}
</style>
