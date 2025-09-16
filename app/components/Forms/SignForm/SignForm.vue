<script setup lang="ts">
import { VForm, VRow, VBtn } from "vuetify/components";

const props = defineProps<{
  isRegister: boolean;
}>();

const btnLabel = computed(() => (props.isRegister ? "Sign up!" : "Sign in!"));
</script>

<template>
  <VForm>
    <VRow class="container-column">
      <VLabel>Email</VLabel>
      <input class="form-field" label="Email" type="email" />
    </VRow>
    <VRow class="container-column">
      <VLabel>Password</VLabel>
      <input class="form-field" label="Password" type="password" /> </VRow
    ><VRow class="container-column">
      <VLabel>Band</VLabel>
      <input class="form-field" label="Band" type="text" />
    </VRow>
    <VRow align="center">
      <VBtn variant="flat" class="login-btn" color="#1E5BFF">
        {{ btnLabel }}
      </VBtn>
    </VRow>
    <VCol v-if="!isRegister" class="center-content">
      <VBtn variant="plain"> Forgot your password ?</VBtn>
    </VCol>
  </VForm>
</template>

<style scoped lang="scss">
.center-content {
  margin-top: 1rem;
  display: flex;
  justify-content: center;

  .v-btn {
  }
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
    padding: 1rem;
    width: 100%;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    font-size: 0.8rem;
    font-family: "Inter", sans-serif;
    width: 100%;
  }
}

.login-btn {
  width: 100%;
  padding: 0rem 1rem;
  border-radius: 0.75rem;
  font-size: 0.8rem;
}
</style>
