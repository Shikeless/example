<template>
  <div class="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import EmptyLayout from "@/layouts/EmptyLayout";
import MainLayout from "@/layouts/MainLayout";

export default {
  computed: {
    layout() {
      console.log(this.$route.meta);
      return (this.$route.meta.layout || "empty") + "-layout";
    }
  },
  components: {
    EmptyLayout,
    MainLayout
  }
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
}

.app {
  width: 100%;
  height: 100%;
}
</style>
