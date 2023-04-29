<template>
  <div class="loader" />
</template>

<script setup>
import { useWeatherStore } from '~/stores/WeatherStore';
import { onMounted } from 'vue';

const weatherStore = useWeatherStore();

onMounted(() => {
  weatherStore.setWeatherByCoords()
});
</script>