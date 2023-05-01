<template>
  <div class="wrapper">
    <PageLoader v-if="!weatherStore.currentCity" />
    <IndexPage v-else />
  </div>
</template>

<script setup>
import { useWeatherStore } from '~/stores/WeatherStore';
const weatherStore = useWeatherStore();
</script>

<style lang="scss">
@import '@/public/styles/common.scss';
</style>