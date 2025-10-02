<script setup lang="ts">
import { ref, computed } from "vue";
import * as yup from "yup";
import {
  Form,
  Field,
  useForm,
  type SubmissionHandler,
  type GenericObject,
} from "vee-validate";
import { VRow, VBtn } from "vuetify/components";

import ErrorMsg from "../ErrorMsg/ErrorMsg.vue";
import { prepareDataForSignRequest } from "./signForm.service";
import type { CreateUserAccount } from "~/shared/models";

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  band: yup.string().required(),
});

const { values } = useForm({
  validationSchema: schema,
  initialValues: {
    email: "",
    password: "",
    band: "",
  },
});

const backendError = useError();

const { success, error } = useToast();

const isSubmitting = ref<boolean>();

const onSubmit: SubmissionHandler<GenericObject> = async (values) => {
  const userCred = prepareDataForSignRequest(values as CreateUserAccount);
  isSubmitting.value = true;

  try {
    const res = await $fetch("/api/user", {
      method: "POST",
      body: userCred,
    });
    console.log(res);
  } catch (err) {
    console.log(err);
    console.log(backendError.value);

    error("An error occurred, please try again.");
  }

  isSubmitting.value = false;
};

const props = defineProps<{
  isRegister: boolean;
}>();

const btnLabel = computed(() => (props.isRegister ? "Sign up!" : "Sign in!"));
</script>f

<template>
  <Form
    v-slot="{ isSubmitting, values, handleSubmit: onSubmit }"
    :validation-schema="schema"
    @submit="onSubmit"
  >
    <VRow class="container-column">
      <VLabel>Email</VLabel>
      <Field
        class="form-field"
        label="Email"
        type="email"
        name="email"
        placeholder="Enter email"
      />
      <ErrorMsg name="email" />
    </VRow>
    <VRow class="container-column">
      <VLabel>Password</VLabel>
      <Field
        class="form-field"
        label="Password"
        type="password"
        name="password"
      />
      <ErrorMsg name="password" />
    </VRow>
    <VRow class="container-column">
      <VLabel>Band</VLabel>
      <Field
        class="form-field"
        label="Band"
        type="text"
        name="band"
        placeholder="Enter band's name"
      />
      <ErrorMsg name="band" />
    </VRow>
    <VRow align="center">
      <VBtn
        :disabled="isSubmitting"
        type="submit"
        as="button"
        variant="flat"
        class="login-btn"
        color="#1E5BFF"
      >
        {{ btnLabel }}
      </VBtn>
    </VRow>
    <VCol v-if="!isRegister" class="center-content">
      <NuxtLink to="/reset-password">Forgot your password ?</NuxtLink>
    </VCol>
  </Form>
</template>

<style scoped lang="scss">
.center-content {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}

.container-column {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  .v-label {
    color: #111827;
    margin-bottom: 0.25rem;
  }

  input {
    border: 1px solid #e5e7eb;
    color: #111827;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    font-size: 0.8rem;
    font-family: "Inter", sans-serif;
  }
}

.login-btn {
  width: 100%;
  padding: 0rem 1rem;
  border-radius: 0.75rem;
  font-size: 0.8rem;
}
</style>
