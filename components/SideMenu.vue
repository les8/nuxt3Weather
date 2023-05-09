<template>
  <div class="side-menu" :class="menuVisible" @click="weatherStore.toggleMenuVisibility(false)">
    <aside class="side-menu__aside" @click.stop>
      <h3 class="side-menu__title">Menu</h3>
      <ul class="side-menu__list">
        <li class="side-menu__item"><NuxtLink class="side-menu__link" to="/auth">Add own API key</NuxtLink></li>
      </ul>
    </aside>
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
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 32px;
    width: 460px;
    height: 100%;
    padding: 100px 32px;
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

  &__title {
    font-size: $title-size;
    color: $secondary-color;
    cursor: default;
  }

  &__list {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 16px;
  }

  &__item {
    position: relative;
    right: -10px;
    padding: 5px 10px;
    border-radius: 20px;
    transition: transform 0.5s;

    &:hover {
      background: $primary-color;
      box-shadow: 0px 0px 10px 10px rgba(255, 255, 255, 1);
      transform: translateX(-10px);
    }
  }

  &__link {
    font-size: $text-size;
    color: $secondary-color;
  }
}
</style>
