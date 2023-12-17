<template>
  <div class="register">
    <form class="register__form">
      <h1 class="register__title">Registration</h1>

      <ul class="register__inputs">
        <li v-for="input in inputs" :key="input.id" class="register__input">
          <WInput v-model:input="input.value" :id="input.id" :type="input.type"
            :name="input.name" :placeholder="input.placeholder"
            :label="input.label" />
        </li>
      </ul>

      <div class="register__actions">
        <nav class="register__links">
          <NuxtLink class="register__button register__link" to="/">Home</NuxtLink>
        </nav>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import WInput from '~/components/weather-ui/WInput.vue';

const inputs = reactive({
  name: {
    value: '',
    id: 'user_name',
    type: 'text',
    name: 'user_name',
    placeholder: 'enter your name...',
    label: 'Name',
    title: '',
    autocomplete: 'off',
  },
  email: {
    value: '',
    id: 'user_email',
    type: 'email',
    name: 'user_email',
    placeholder: 'enter your email...',
    label: 'Email',
    title: '',
    autocomplete: 'of',
  },
  password: {
    value: '',
    id: 'user_password',
    type: 'password',
    name: 'user_password',
    placeholder: 'create your password...',
    label: 'Password',
    title: '',
    autocomplete: 'off',
  },
  passwordCheck: {
    value: '',
    id: 'user_password_check',
    type: 'password',
    name: 'user_password_check',
    placeholder: 'repeat the password...',
    label: '',
    title: '',
    autocomplete: 'off',
  }
});
</script>

<style lang="scss">
@import '@/public/styles/common.scss';
</style>

<style lang="scss" scoped>
.register {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  &__form {
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 30%;
  }

  &__title {
    font-size: $title-size;

    @media (max-width: $phone-max) {
      text-align: center;
    }
  }

  &__inputs {
    display: flex;
    flex-direction: column;
    gap: 8px;
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
      background-color: $marine-color;
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
      background-color: $marine-color;
    }
  }
}
</style>
