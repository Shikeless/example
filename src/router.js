import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "login",
      meta: { layout: "empty" },
      component: () => import("./views/Login.vue"),
    },
    {
      path: "/categories",
      name: "categories",
      meta: { layout: "main" },
      component: () => import("./views/Categories.vue"),
    },
  ],
});
