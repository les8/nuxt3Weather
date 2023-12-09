<template>
  <div class="side-menu" :class="{ 'side-menu_visible': weatherStore.isMenuVisible }"
    @click="weatherStore.toggleMenuVisibility(false)">
    <aside class="side-menu__aside" @click.stop>
      <header class="side-menu__header noselect" @click="weatherStore.toggleMenuVisibility(false)">
        <h3 class="side-menu__title">Menu</h3>
        <NuxtIcon name="hide-menu" class="side-menu__closer" />
      </header>
      <ul class="side-menu__list noselect">
        <li class="side-menu__item">
          <NuxtLink v-if="!key" class="side-menu__link" to="/register" @click="weatherStore.toggleMenuVisibility(false)">Add
            own API key</NuxtLink>
          <p v-else @click="removeCookieKey">Remove own API key</p>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { CookieRef } from 'nuxt/dist/app/composables/cookie';
import { useWeatherStore } from '~/stores/WeatherStore';

const weatherStore = useWeatherStore();
const key: CookieRef<string | null | undefined> = useCookie('key');

const toast = useToast();

const removeCookieKey = (): void => {
  weatherStore.toggleMenuVisibility(false);
  key.value = null;
  toast.add({
    id: "remove_key_from_cookie",
    title: 'Your key was removed from cookie.',
    timeout: 3000,
  });
};
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
    transition: transform 0.4s;
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

  &__header {
    display: flex;
    align-items: center;
    gap: 16px;
    color: $secondary-color;
    cursor: pointer;
  }

  &__title {
    font-size: $title-size;
  }

  &__closer {
    width: 50px;
    height: 50px;
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
    font-size: $text-size;
    color: $secondary-color;
    border-radius: 20px;
    transition: transform 0.5s;
    cursor: pointer;

    &:hover {
      background: $primary-color;
      box-shadow: 0px 0px 10px 10px rgba(255, 255, 255, 1);
      transform: translateX(-10px);
    }
  }

  &__link {
    color: inherit;
  }
}
</style>

<style lang="scss">
.side-menu {
  &__closer {
    width: 50px;
    height: 50px;

    svg {
      width: 50px;
      height: 50px;
    }
  }
}
</style>
