// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    'nuxt-icons',
    '@nuxt/ui',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/public/styles/global.scss";'
        }
      }
    }
  },
  runtimeConfig: {
    weatherApiKey: process.env.NUXT_WEATHER_API_KEY,
    jwtSecret: process.env.NUXT_JWT_SECRET
  }
})
