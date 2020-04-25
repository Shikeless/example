<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<style>
.empty-layout {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 5rem;
  height: 100vh;
}
</style>
