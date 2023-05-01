// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    'nuxt-icons',
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
    weatherApiKey: process.env.WEATHER_API_KEY
  }
})
