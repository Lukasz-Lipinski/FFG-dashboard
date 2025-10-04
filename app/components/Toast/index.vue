<template>
  <ClientOnly>
    <VSnackbar
      v-model="isShown"
      absolute
      timeout="3000"
      :color="color"
      location="bottom center"
    >
      <template #text>
        {{ message }}
      </template>
      <template #actions>
        <VBtn variant="text" color="white" @click="isShown = false">
          Close
        </VBtn>
      </template>
    </VSnackbar>
  </ClientOnly>
</template>

<script lang="ts" setup>
const { isShown, message, color } = useToast();
</script>

<style lang="css" scoped>
.error {
  background-color: red;
}
.success {
  background-color: green;
}

.v-btn {
  font-size: 0.6rem;
}
</style>
