<script setup lang="ts">
import SignForm from "../components/Forms/SignForm/SignForm.vue";

enum FormType {
  Login,
  Register,
}

const selectedForm = ref<FormType>(FormType.Login);
</script>

<template>
  <div class="form-container">
    <VBtnToggle :model-value="selectedForm" mandatory>
      <VBtn
        color="#1E5BFF"
        variant="outlined"
        :value="FormType.Login"
        @click="selectedForm = FormType.Login"
      >
        Login
      </VBtn>
      <VBtn
        color="#1E5BFF"
        variant="outlined"
        :value="FormType.Register"
        @click="selectedForm = FormType.Register"
      >
        Register
      </VBtn>
    </VBtnToggle>
    <h3>Welcome back</h3>
    <div class="form">
      <SignForm
        class="custom-width"
        :is-register="selectedForm === FormType.Register"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  height: 100vh;
  box-sizing: border-box;
  padding: 1rem;

  .v-btn {
    padding: 0 2rem;
    font-size: 0.6rem;
    font-weight: 500;
  }

  .form {
    box-sizing: border-box;
  }
}

.custom-width {
  width: 25rem;
}
</style>
