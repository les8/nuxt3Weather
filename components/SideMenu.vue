<template>
  <div class="side-menu" :class="menuVisible" @click="weatherStore.toggleMenuVisibility(false)">
    <aside class="side-menu__aside" @click.stop></aside>
  </div>
</template>

<script setup>
import { useWeatherStore } from '~/stores/WeatherStore';
const weatherStore = useWeatherStore();

const menuVisible = computed(() => {
  return weatherStore.isMenuVisible ? 'side-menu_visible' : '';
})
</script>

<style lang="scss" scoped>
.side-menu {
  &__aside {
    position: fixed;
    top: 0;
    right: -460px;
    width: 460px;
    height: 100%;
    background: $yellow-color;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 100px 100%);
    transition: transform 0.8s;
    transition-delay: 0.2s;
  }

  &_visible {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

    .side-menu__aside {
      transform: translateX(-460px);
    }
  }
}
</style>
