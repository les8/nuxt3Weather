<template>
  <div class="startpage">
    <IndexPageHeader />
    <IndexPageMain />
    <IndexPageFooter />
  </div>

  <div v-if="weatherStore.isLoadingData" class="startpage-loader">
    <PageLoader />
  </div>
</template>

<script setup>
import { useWeatherStore } from '~/stores/WeatherStore';
const weatherStore = useWeatherStore();
</script>

<style lang="scss">
.startpage {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 100px 200px;

  @media (max-width: $tablet-max) {
    padding: 64px;
  }

  @media (max-width: $phone-max) {
    padding: 19px;
  }
}

.startpage-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
}
</style>