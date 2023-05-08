<template>
  <div class="loader">
    <img src="@/assets/icons/loader.gif" alt="loading...">
  </div>
</template>

<script setup>
import { useWeatherStore } from '~/stores/WeatherStore';
import { onMounted } from 'vue';

const weatherStore = useWeatherStore();

onMounted(() => {
  weatherStore.setInitialWeather();

});
</script>

<style lang="scss" scoped>
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  img {
    max-width: 100%;
  }
}
</style>