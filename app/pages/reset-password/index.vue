<template>
    <NuxtLayout name="register">
         <NuxtLink to="../">
            <v-icon icon="mdi mdi-undo"></v-icon>
            Back
        </NuxtLink>
        <ResetPassowrdForm />
    </NuxtLayout>
</template>

<script lang="ts" setup>
import ResetPassowrdForm from "../../components/Forms/OneFieldForm/index.vue";
</script>

<style lang=""></style>
