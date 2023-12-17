<template>
  <p class="w-input">
    <label v-if="props.label" class="w-input__label" :for="props.id">{{
      props.label }}</label>

    <div class="w-input__body">
      <input :value="props.input" :id="props.id" :type="props.type"
        :name="props.name" :placeholder="props.placeholder" :title="props.title"
        :autocomplete="props.autocomplete" @input="updateInput" />

      <slot />
    </div>
  </p>
</template>

<script lang="ts" setup>
const props = defineProps({
  id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  name: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  autocomplete: {
    type: String,
    default: 'off'
  },
  label: {
    type: String,
    default: ''
  },
  input: {
    type: String,
    required: true
  }
})

const emits = defineEmits(['update:input'])

const updateInput = (e: any) => {
  emits('update:input', e.target.value)
}
</script>

<style lang="scss" scoped>
.w-input {
  display: flex;
  flex-direction: column;
  gap: 8px;

  &__label {
    font-size: 18px;
    line-height: 21px;
  }

  &__body {
    display: flex;
    align-items: center;
    gap: 16px;
    width: 100%;
    padding: 14px;
    border-radius: 8px;
    background-color: $primary-color;
    font-size: $text-search-size;
    color: $secondary-color;

    input {
      flex-grow: 1;
      border: none;
      outline: none;
      appearance: none;
      vertical-align: middle;
    }
  }
}
</style>