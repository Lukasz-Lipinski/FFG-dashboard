<template>
  <ClientOnly>
    <VSnackbar
      v-model="isShown"
      absolute
      timeout="3000"
      color="error"
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
const { isShown, message } = useToast();
</script>

<style lang="css" scoped>
.error {
}
.success {
}
</style>
