<template>
  <div ref="location" class="location">
    <div v-if="inChanges" class="location__search">
      <input type="text" name="city-search" placeholder="Search for a lovely place..."
        title="Must contain only Latin letters spaces and hyphens" autocomplete="off" v-model="inputCity"
        @input="validateSearch" @keydown.enter="submitCurrentCity" />
      <input type="submit" value="OK" @click="submitCurrentCity" />
    </div>
    <div v-else class="location__info">
      <h3 class="location__name" @click="editCurrentCity">
        {{ weatherStore.currentCity }}
      </h3>
      <div class="location__managment">
        <h6 class="location__change" @click="editCurrentCity">Change Region</h6>
        <div class="location__mycoordinates">
          <NuxtIcon name="location" class="location__icon" />
          <p @click="weatherStore.setWeatherByCoords">My Location</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useWeatherStore } from '~/stores/WeatherStore';

const weatherStore = useWeatherStore();
const inputCity = ref('');
const beforeEditCity = inputCity;
const inChanges = ref(false);
const location = ref(null);

const editCurrentCity = () => {
  location.value.style.zIndex = 1;
  beforeEditCity.value = inputCity.value;
  inputCity.value = "";
  inChanges.value = true;
}

const submitCurrentCity = () => {
  if (inputCity.value !== "") {
    weatherStore.setCurrentCity(strBeautify(inputCity.value));
    weatherStore.setWeatherByName();
  } else inputCity.value = beforeEditCity.value;
  inChanges.value = false;
  location.value.style.zIndex = 0;
}

const strBeautify = (str) => {
  const str2 = str.toLowerCase();
  const str3 = str2.charAt(0).toUpperCase() + str2.slice(1);
  return str3;
}

const validateSearch = (e) => {
  inputCity.value = e.target.value.replace(/[^A-z,a-z,\s,-]/g, "");
};
</script>

<style lang="scss" scoped>
.location {
  width: 100%;

  &__search {
    display: flex;
    width: 579px;
    height: 97px;
    padding: 30px;
    border-radius: 8px;
    background-color: $primary-color;
    font-size: $text-search-size;
    color: $secondary-color;

    @media (max-width: $tablet-max) {
      width: 350px;
      height: 54px;
      padding: 18px;
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
    margin-bottom: 9px;
    font-size: $title-size;
    cursor: pointer;
  }

  &__managment {
    display: flex;

    @media (max-width: $phone-max) {
      justify-content: space-between;
    }
  }

  &__change {
    margin-right: 29px;
    font-size: $subtitle-size;
    opacity: 0.6;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  &__mycoordinates {
    display: flex;
    font-size: $subtitle-size;
    opacity: 0.6;
    cursor: pointer;

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
