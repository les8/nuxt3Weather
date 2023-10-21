<template>
  <div class="header">
    <div ref="location" class="location">
      <div v-if="inChanges" class="location__search">
        <input v-focus type="text" name="city-search"
          placeholder="Search for a lovely place..."
          title="Must contain only Latin letters spaces and hyphens"
          autocomplete="off" v-model="inputCity" @input="validateSearch"
          @keydown.enter="submitCurrentCity" />

        <input type="submit" value="OK" @click="submitCurrentCity" />
      </div>

      <div v-else class="location__info">
        <h3 class="location__name" @click="editCurrentCity">
          {{ weatherStore.currentCity }}
        </h3>
      </div>

      <NuxtIcon name="burger" class="burger" :class="[hideBurger, animateBurger]"
        @click="weatherStore.toggleMenuVisibility(true)" />
    </div>

    <div class="location__managment">
      <button class="location__change location__button"
        @click="editCurrentCity">Change Region</button>

      <button class="location__mycoordinates location__button"
        @click="setMyLocation">
        <NuxtIcon name="location" class="location__icon" />

        <p>My Location</p>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Directive } from 'nuxt/dist/app/compat/capi';
import { ref } from 'vue'
import { useWeatherStore } from '~/stores/WeatherStore';

const vFocus: Directive = {
  mounted: (el: HTMLElement) => el.focus()
}

const toast = useToast();

const weatherStore = useWeatherStore();
const inputCity = ref<string>('');
const beforeEditCity = inputCity;
const inChanges = ref<boolean>(false);
const location: Ref<HTMLElement | null>  = ref(null);

const editCurrentCity = (): void => {
  beforeEditCity.value = inputCity.value;
  inputCity.value = "";
  inChanges.value = true;
}

const submitCurrentCity = (): void => {
  if (inputCity.value.trim() !== "") {
    if (strBeautify(inputCity.value) === weatherStore.currentWeatherByName.name) {
      weatherStore.setMode('Name');
      weatherStore.setCurrentCity(strBeautify(inputCity.value));
      inChanges.value = false;
      return;
    }

    if (strBeautify(inputCity.value) === weatherStore.currentWeatherByPosition.name) {
      weatherStore.setMode('Position');
      weatherStore.setCurrentCity(strBeautify(inputCity.value));
      inChanges.value = false;
      return;
    }

    weatherStore.setPreviousCity();
    weatherStore.setCurrentCity(strBeautify(inputCity.value));
    weatherStore.setWeatherByName().then((res: Partial<Notification> | undefined) => {
      if (res !== undefined) {
        toast.add(res);
      }
    });
  } else inputCity.value = beforeEditCity.value;

  inChanges.value = false;
}

const strBeautify = (str: string) => {
  const lowStr = str.toLowerCase();
  return lowStr.charAt(0).toUpperCase() + lowStr.slice(1);
}

const validateSearch = (e: any) => {
  inputCity.value = e.target.value.replace(/[^A-z,a-z,А-Я,а-я\s,-]/g, "");
};

const setMyLocation = (): void => {
  inputCity.value = '';
  inChanges.value = false;
  weatherStore.setCoordinates().then((res: Partial<Notification> | undefined) => {
    if (res !== undefined) {
      toast.add(res);
    }
  });
}

const hideBurger = computed((): string => {
  return inChanges.value ? 'burger_hidden' : '';
})

const animateBurger = computed((): string => {
  return weatherStore.isMenuVisible ? 'burger_animated' : '';
})
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.location {
  display: flex;
  justify-content: space-between;
  gap: 8px;

  &__search {
    display: flex;
    width: 579px;
    height: 50px;
    padding: 14px;
    border-radius: 8px;
    background-color: $primary-color;
    font-size: $subtitle-size;
    color: $secondary-color;

    @media (max-width: $tablet-max) {
      width: 350px;
      font-size: $subtitle-size;
    }

    @media (max-width: $phone-max) {
      width: 100%;
    }

    input[name="city-search"] {
      flex-grow: 1;
      border: none;
      outline: none;
      appearance: none;
      vertical-align: middle;
    }

    input[type="submit"] {
      border: none;
      background: none;
      cursor: pointer;
    }
  }

  &__name {
    font-size: $title-size;
    cursor: pointer;
  }

  &__managment {
    display: flex;

    @media (max-width: $phone-max) {
      justify-content: space-between;
    }
  }

  &__button {
    background-color: unset;
  }

  &__change {
    margin-right: 29px;
    font-size: $subtitle-size;
    opacity: 0.6;

    &:hover {
      opacity: 1;
    }
  }

  &__mycoordinates {
    display: flex;
    font-size: $subtitle-size;
    opacity: 0.6;

    &:hover {
      opacity: 1;
    }
  }

  &__icon {
    width: 19px;
    height: 23px;
    margin-right: 12px;
    fill: $primary-color;
  }
}
</style>

<style lang="scss">
.burger {
  display: block;
  cursor: pointer;
  opacity: 1;
  transition: opacity 1s, transform 1s;

  &_hidden {
    @media (max-width: $phone-max) {
      display: none;
    }
  }

  &_animated {
    opacity: 0;
    transform: rotate(200deg) scale(0.2);
  }

  svg {
    width: 50px;
    height: 50px;
    margin: 0;
  }
}
</style>