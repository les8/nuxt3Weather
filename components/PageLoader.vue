<template>
  <div class="loader">Loading...</div>
</template>

<script setup>
import { useWeatherStore } from '~/stores/WeatherStore';
import { onMounted } from 'vue';

const weatherStore = useWeatherStore();

onMounted(() => {
  weatherStore.setInitialWeather();

});
</script>