<template>
  <div class="auth">
    <h1 class="auth__title">Add Personal API Key</h1>
    <div class="auth__input">
      <input type="text" name="auth-input" placeholder="Enter your key..." v-model="inputAPI" @keydown.enter="checkKey" />
    </div>
    <div class="auth__actions">
      <button class="auth__button" type="submit" @click="checkKey">
        Save in Cookie
      </button>
      <nav class="auth__links">
        <a class="auth__button auth__link" target="_blank" href="https://home.openweathermap.org/users/sign_up/">
          Register
        </a>
        <NuxtLink class="auth__button auth__link" to="/">Home</NuxtLink>
      </nav>
    </div>
    <p class="auth__about">
      Hi! <br /><br />
      The application uses a third-party API to get data. <br />

      You can register on <a href="https://home.openweathermap.org/users/sign_up/" target="_blank">
        openweathermap
      </a> and add your own free api key or use a shared key. But his limit may be exhausted :)<br /><br />
      Good weather!
    </p>
  </div>
</template>

<script setup>
// Этот компонент можно в будущем переделать под регистрацию
const inputAPI = ref('');

async function checkKey() {
  if (!inputAPI.value) return;

  try {
    const isKeyOk = await useFetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${inputAPI.value}`);

    if (!isKeyOk.error.value) {
      const key = useCookie('key')
      key.value = `${inputAPI.value}`;
      navigateTo('/');
    }
  } catch (error) {
    console.log(error);
    alert('Try to add another key...')
  }
}
</script>

<style lang="scss">
@import '@/public/styles/common.scss';
</style>

<style lang="scss" scoped>
.auth {
  width: 80%;
  padding: 100px 0;
  margin: 0 auto;

  @media (max-width: $phone-max) {
    width: calc(100vw - 32px);
    padding: 64px 0 0;
    margin: auto;
  }

  &__title {
    font-size: $title-size;
    margin-bottom: 32px;

    @media (max-width: $phone-max) {
      margin-bottom: 16px;
      text-align: center;
    }
  }

  &__input {
    display: flex;
    width: 100%;
    height: 60px;
    margin-bottom: 16px;
    padding: 10px 0 10px 30px;
    border-radius: 8px;
    background-color: $primary-color;
    font-size: $text-search-size;
    color: $secondary-color;

    @media (max-width: $phone-max) {
      height: 53px;
      font-size: $subtitle-size;
      line-height: 18;
      padding-left: 8px;
    }

    input[name="auth-input"] {
      flex-grow: 1;
      border: none;
      outline: none;
      appearance: none;
      vertical-align: middle;

      @media (max-width: $phone-max) {
        line-height: 18px;
      }
    }

    input[type="submit"] {
      border: none;
      background: none;
      cursor: pointer;
    }
  }

  &__actions {
    display: flex;
    justify-content: space-between;
  }

  &__links {
    display: flex;
    gap: 16px;
  }

  &__button {
    height: 60px;
    padding: 0 30px;
    font-size: $text-search-size;
    color: $secondary-color;
    background-color: $primary-color;
    border-radius: 8px;

    &:hover {
      background-color: $yellow-color;
    }

    @media (max-width: $phone-max) {
      height: 53px;
      font-size: $subtitle-size;
      padding: 0 8px;
    }
  }

  &__link {
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover,
    &:active {
      background-color: $yellow-color;
    }
  }

  &__about {
    margin-top: 32px;
    font-size: $text-size;
    font-style: italic;
    line-height: 32px;

    @media (max-width: $phone-max) {
      font-size: $subtitle-size;
    }

    a {
      color: $yellow-color;
      font-weight: 700;
    }
  }
}
</style>
