<template>
  <div class="wrapper">
    <PageLoader
      v-if="!weatherStore.currentWeatherByPosition.name && !weatherStore.currentWeatherByName.name"
      :initialization="true" />
    <IndexPage v-else />
    <SideMenu />
    <UNotifications />
  </div>
</template>

<script setup lang="ts">
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