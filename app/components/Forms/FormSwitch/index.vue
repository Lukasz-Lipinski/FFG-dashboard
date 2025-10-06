<template>
  <VBtnToggle :model-value="formValue" mandatory>
    <VBtn
      color="#1E5BFF"
      variant="outlined"
      :value="leftBtnValue"
      @click="formValue = leftBtnValue"
    >
      {{ leftLabel }}
    </VBtn>
    <VBtn
      color="#1E5BFF"
      variant="outlined"
      :value="rightBtnValue"
      @click="formValue = rightBtnValue"
    >
      {{ rightLabel }}
    </VBtn>
  </VBtnToggle>
</template>

<script lang="ts" setup>
defineProps<{
  leftLabel: string;
  rightLabel: string;
  leftBtnValue: number;
  rightBtnValue: number;
}>();

const formValue = defineModel<number>({ required: true });

defineExpose({ formValue });
</script>

<style lang="css" scoped>
.v-btn {
  padding: 0 2rem;
  font-size: 0.75rem;
  font-weight: 500;
}
</style>
