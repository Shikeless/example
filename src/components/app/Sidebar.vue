<template>
  <div>
    <ul class="sidenav app-sidenav" :class="{ open: isOpen }">
      <router-link
        v-for="link in links"
        :key="link.url"
        tag="li"
        active-class="active"
        :to="link.url"
        :exact="link.exact"
      >
        <a href="#" class="waves-effect waves-orange pointer">{{
          link.title
        }}</a>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["isOpen"],
  data: () => ({
    links: [
      { title: "Счет", url: "/", exact: true },
      { title: "История", url: "/history" },
      { title: "Планирование", url: "/planning" },
      { title: "Новая запись", url: "/record" },
      { title: "Категории", url: "/categories" },
    ],
  }),
  // created: function() {
  //   console.log(this._props);
  // },
};
</script>
