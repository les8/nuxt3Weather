<template>
  <div class="main">
    <div class="main__head">
      <NuxtIcon :name="weatherIcon" className="main__icon" />
      <div class="main__temperature">
        {{ weatherStore.inFahrenheit ? weatherStore.fahrenheitTemperature : celsiusTemperature }}º
      </div>
    </div>
    <div class="main__info">{{ weatherInfo }}</div>
  </div>
</template>

<script setup>
import { kelvinToСelsius } from "@/helpers/formules";
import { useWeatherStore } from '~/stores/WeatherStore';

const weatherStore = useWeatherStore();

const celsiusTemperature = computed(() => {
  const temperature = weatherStore.currentWeather.main.temp;
  return Math.round(kelvinToСelsius(parseInt(temperature, 10)));
});

const weatherInfo = computed(() => {
  return weatherStore.currentWeather.weather[0].description;
});

const weatherIcon = computed(() => {
  if (weatherStore.currentWeather.weather[0].main === "Clear") {
    return "sun";
  } else if (weatherStore.currentWeather.weather[0].main === "Rain") {
    return "rain";
  } else if (weatherStore.currentWeather.weather[0].main === "Snow") {
    return "snow";
  } else if (
    weatherStore.currentWeather.weather[0].description === "overcast clouds"
  ) {
    return "cloud";
  } else if (weatherStore.currentWeather.weather[0].main === "Clouds") {
    return "partly";
  } else if (weatherStore.currentWeather.weather[0].main === "Mist") {
    return "cloud";
  } else return "location"; //for catch errors, becouse api docs have some problems:)
});
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__head {
    display: flex;
    align-items: center;
  }

  &__temperature {
    font-size: 180px;
    line-height: 216px;

    @media (max-width: $phone-max) {
      font-size: 120px;
      line-height: 140px;
    }
  }

  &__icon {
    width: 200px;
    height: 200px;
    margin-right: 15px;
    fill: rgb(209, 236, 87);

    @media (max-width: $phone-max) {
      width: 120px;
      height: 120px;
    }
  }

  &__info {
    font-size: $text-size;
  }

  &__info::first-letter {
    text-transform: capitalize;
  }
}
</style>
