<template>
    <h3>Pass email to reset password</h3>
    <Form 
      #="{ handleSubmit: onSubmit, values, isSubmitting }" 
      :validation-schema="schema"
       @submit="onSubmit" 
       class="one-field-form">
      <VLabel>Email</VLabel>
      <Field name="email" type="email" class="form-field"/>
      <VBtn type="submit">
        Reset
      </VBtn>
    </Form>
</template>

<script lang="ts" setup>
import { useForm, type SubmissionHandler } from "vee-validate"
import * as yup from "yup"

const {schema} = defineProps<{
  schema: typeof yup.ObjectSchema
}>();

const { values } = useForm({
  validationSchema: schema,
  initialValues: {
    fieldValue: ""
  }
});

defineEmits<{
  onSubmit: []
}>();

const onSubmit = 
</script>

<style lang="css" scoped>
.one-field-form {
  display: flex;
  flex-direction: column;
}
</style>