import { useWeatherStore } from "@/stores/WeatherStore";
import { CookieRef } from "nuxt/app";

const weatherStore = useWeatherStore();

export default defineNuxtRouteMiddleware(() => {
  const key: CookieRef<string | null> = useCookie("key");

  if (key.value) {
    weatherStore.setCurrentApi(key.value);
  } else return navigateTo('/auth');
})
