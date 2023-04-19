<template>
  <div class="wrapper">
    <Auth v-if="!weatherStore.apiKey" />
    <p v-else>Будь, как дома, путник!</p>
    <!--
    <Loader v-else-if="!weatherStore.currentCity" />
    <StartPage v-else />
    -->
  </div>
</template>

<script setup>
import { getCookie } from "@/helpers/cookie";
import { useWeatherStore } from "~/stores/WeatherStore";

const weatherStore = useWeatherStore();

onBeforeMount(() => {
  if (getCookie("key")) {
    weatherStore.setCurrentApi(getCookie("key"));
  }
});
</script>

<style lang="scss">
@import "@/public/styles/common.scss";
@import "@/public/styles/settings.scss";
</style>