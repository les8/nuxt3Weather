<template>
  <div class="startpage">
    <div class="header">
      <IndexPageLocation />
      <IndexPageTemperature />
    </div>
    <IndexPageMain />
    <IndexPageFooter />
  </div>
</template>

<script setup></script>

<style lang="scss">
.startpage {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 100px 200px;

  @media (max-width: $tablet-max) {
    padding: 64px;
  }

  @media (max-width: $phone-max) {
    padding: 19px;
  }
}

.header {
  position: relative;
  display: flex;
  justify-content: space-between;
}
</style>