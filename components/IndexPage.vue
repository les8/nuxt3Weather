<template>
  <div class="startpage" :class="blurClass">
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

const blurClass = computed(() => {
  return weatherStore.isMenuVisible || weatherStore.isLoadingData ? 'startpage_blur' : '';
})
</script>

<style lang="scss">
.startpage {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 100px 200px;

  &_blur {
    filter: blur(5px);
  }

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
}
</style>