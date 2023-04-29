<template>
  <div class="wrapper">
    <!--
    <Loader v-else-if="!weatherStore.currentCity" />
    <StartPage v-else />
    -->
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})
</script>

<style lang="scss"></style>