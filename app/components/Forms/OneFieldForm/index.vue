<template>
  <h3>Pass email to reset password</h3>
  <Form
    #="{ handleSubmit: onSubmit, values, isSubmitting }"
    :validation-schema="schema"
    class="one-field-form"
    @submit="onSubmit"
  >
    <VLabel>{{ label }}</VLabel>
    <Field name="email" type="email" class="form-field" />
    <VBtn type="submit"> {{ btnText }} </VBtn>
  </Form>
</template>

<script lang="ts" setup>
import {
  useForm,
  type GenericObject,
  type SubmissionHandler,
} from "vee-validate";
import * as yup from "yup";

const { schema } = defineProps<{
  schema: yup.Schema;
  label: string;
  btnText: string;
}>();

const { values } = useForm({
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
}
</style>
