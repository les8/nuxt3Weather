<template>
  <div class="wrapper">
    <PageLoader v-if="!weatherStore.currentWeather.name" :initialization="true" />
    <IndexPage v-else />
    <SideMenu />
  </div>
</template>

<script setup>
import { useWeatherStore } from '~/stores/WeatherStore';
const weatherStore = useWeatherStore();
</script>

<style lang="scss">
@import '@/public/styles/common.scss';

#__nuxt,
.wrapper {
  height: 100%;
}
</style>