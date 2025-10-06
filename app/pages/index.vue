<script setup lang="ts">
import { watch } from "vue";
import SignForm from "../components/Forms/SignForm/SignForm.vue";
import FormSwitch from "../components/Forms/FormSwitch/index.vue";

const user = useCookie("user");

enum FormType {
  Login,
  Register,
}

watch(user, () => {
  if (user.value) {
    return navigateTo({
      name: "dashboard",
    });
  }
});

const selectedForm = ref<number>(FormType.Login);
</script>

<template>
  <NuxtLayout name="register">
    <FormSwitch
      v-model="selectedForm as number"
      :left-btn-value="FormType.Login"
      left-label="Login"
      :right-btn-value="FormType.Register"
      right-label="Register"
    />
    <h3>Welcome back</h3>
    <div class="form">
      <SignForm
        class="custom-width"
        :is-register="selectedForm === FormType.Register"
      />
    </div>
  </NuxtLayout>
</template>

<style scoped lang="scss">
.form {
  box-sizing: border-box;
}

.custom-width {
  width: 25rem;
}
</style>
