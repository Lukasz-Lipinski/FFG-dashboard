<script setup lang="ts">
import LoginForm from "~/components/Forms/LoginForm/LoginForm.vue";
import RegisterForm from "~/components/Forms/SignupForm/SignupForm.vue";

enum FormType {
  Login,
  Register,
}

const selectedForm = ref<FormType>(FormType.Login);

const formComponent = computed(() => {
  return selectedForm.value === FormType.Register ? RegisterForm : LoginForm;
});
</script>

<template>
  <div class="form-container">
    <VBtnToggle>
      <VBtn
        color="#1E5BFF"
        variant="outlined"
        @click="selectedForm = FormType.Login"
      >
        Login
      </VBtn>
      <VBtn
        color="#1E5BFF"
        variant="outlined"
        @click="selectedForm = FormType.Register"
      >
        Register
      </VBtn>
    </VBtnToggle>
    <h3>Welcome back</h3>
    <div class="form">
      <Component class="custom-width" :is="formComponent" />
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
  min-width: 400px;
}
</style>
