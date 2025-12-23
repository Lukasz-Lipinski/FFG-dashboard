<template>
  <h4 v-if="title">{{ title }}</h4>
  <Form
    #="{ handleSubmit: onSubmit, meta }"
    :validation-schema="schema"
    class="one-field-form"
    @submit="onSubmit"
  >
    <VLabel>{{ label }}</VLabel>
    <Field
      :name="fieldName"
      type="email"
      class="form-field"
      :modelValue="initialValue"
    />
    <ErrorMsg :name="fieldName" class="error-message" />
    <VBtn size="small" color="primary" type="submit" :disabled="!meta.valid">
      {{ btnText }}
    </VBtn>
  </Form>
</template>

<script lang="ts" setup>
import {
  useForm,
  Field,
  type GenericObject,
  type SubmissionHandler,
} from "vee-validate";
import { Schema } from "yup";
import ErrorMsg from "../ErrorMsg/ErrorMsg.vue";

const { schema, fieldName, initialValue } = defineProps<{
  schema: Schema;
  label: string;
  btnText: string;
  fieldName: string;
  title?: string;
  initialValue?: any;
}>();

const { errors, setValues, meta, validate } = useForm({
  validationSchema: schema,
});

const emit = defineEmits<{
  onSubmit: [event: GenericObject];
}>();

const onSubmit: SubmissionHandler<GenericObject> = async (event) => {
  emit("onSubmit", event);
};

watch(
  () => initialValue,
  (newValue) => {
    setValues({
      [fieldName]: newValue,
    });
  },
  { immediate: true }
);
</script>

<style lang="css" scoped>
.one-field-form {
  display: flex;
  flex-direction: column;
  min-width: 450px;

  .v-btn {
    margin-top: 2rem;
    font-size: 0.8rem;
  }
}
</style>
