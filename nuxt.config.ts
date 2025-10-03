// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabasePublishableKey: process.env.SUPABASE_KEY,
    },
  },
  modules: [
    "vuetify-nuxt-module",
    "@nuxtjs/supabase",
    [
      "@vee-validate/nuxt",
      {
        autoImports: true,
        componentNames: ["VField", "VForm", "VToast"],
      },
    ],
  ],
  css: ["./app/styles.css"],
  supabase: {
    redirect: false,
  },
  imports: {
    dirs: ["~/composables/**"],
  },
});
