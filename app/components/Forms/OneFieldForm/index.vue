<template>
  <h4>{{ title }}</h4>
  <Form
    #="{ handleSubmit: onSubmit, values, errors }"
    :validation-schema="schema"
    class="one-field-form"
    @submit="onSubmit"
  >
    <VLabel>{{ label }}</VLabel>
    <Field :name="fieldName" type="email" class="form-field" />
    <ErrorMsg :name="fieldName" class="error-message" />
    <VBtn type="submit"> {{ btnText }} </VBtn>
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

const { schema } = defineProps<{
  schema: Schema;
  label: string;
  btnText: string;
  fieldName: string;
  title: string;
}>();

const { values, errors } = useForm({
  validationSchema: schema,
  initialValues: {
    fieldValue: "",
  },
});

const emit = defineEmits<{
  onSubmit: [event: GenericObject];
}>();

const onSubmit: SubmissionHandler<GenericObject> = async (event) => {
  emit("onSubmit", event);
};
</script>

<style lang="css" scoped>
.one-field-form {
  display: flex;
  flex-direction: column;
  min-width: 450px;
}
</style>
