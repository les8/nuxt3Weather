<template>
  <div class="footer">
    <div class="footer__item">
      <div class="footer__subtitle">Wind</div>
      <div class="footer__info">
        {{ wind }} m/s, {{ windDirection }}
      </div>
    </div>
    <div class="footer__item">
      <div class="footer__subtitle">Pressure</div>
      <div class="footer__info">{{ pressure }} mmHg</div>
    </div>
    <div class="footer__item">
      <div class="footer__subtitle">Humidity</div>
      <div class="footer__info">{{ humidity }} %</div>
    </div>
    <div class="footer__item">
      <div class="footer__subtitle">Visibility</div>
      <div class="footer__info">{{ visibility }} m</div>
    </div>
  </div>
</template>

<script setup>
import { hectopascalToMillimetersMercury } from "@/helpers/formules";
import { useWeatherStore } from '~/stores/WeatherStore';

const weatherStore = useWeatherStore();

const wind = computed(() => {
  return weatherStore.currentWeather.wind.speed.toFixed(1);
})

const windDirection = computed(() => {
  return convertWindDirection(weatherStore.currentWeather.wind.deg);
})

const pressure = computed(() => {
  const hectopascalPressure = weatherStore.currentWeather.main.pressure;
  return Math.round(
    hectopascalToMillimetersMercury(parseInt(hectopascalPressure, 10))
  );
})

const humidity = computed(() => {
  return weatherStore.currentWeather.main.humidity;
})

const visibility = computed(() => {
  return weatherStore.currentWeather.visibility;
})


function convertWindDirection(num) {
  if (num > 338 || num <= 23) {
    return "north";
  } else if (num > 23 && num <= 68) {
    return "north-east";
  } else if (num > 68 && num <= 113) {
    return "east";
  } else if (num > 113 && num <= 158) {
    return "south-east";
  } else if (num > 158 && num <= 203) {
    return "south";
  } else if (num > 203 && num <= 248) {
    return "south-west";
  } else if (num > 248 && num <= 293) {
    return "west";
  } else if (num > 293 && num <= 338) {
    return "north-west";
  }
}
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: space-between;

  @media (max-width: $phone-max) {
    flex-wrap: wrap;
    padding: 16px;
  }

  &__item {
    @media (max-width: $phone-max) {
      margin-bottom: 16px;

      &:nth-child(odd) {
        width: 65%;
      }

      &:nth-child(even) {
        width: 35%;
      }
    }
  }

  &__subtitle {
    font-family: Commissioner-B;
    font-size: $subtitle-size;
    margin-bottom: 10px;
  }

  &__info {
    font-family: Commissioner-ExL;
    font-size: $text-size;

    @media (max-width: $phone-max) {
      font-size: $subtitle-size;
    }
  }
}
</style>
