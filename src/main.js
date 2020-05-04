import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuelidate from "vuelidate";
import firebase from "firebase/app";
import store from "./store";
import "firebase/auth";
import "firebase/database";
import dateFilter from "@/filters/date.filter";
import currencyFilter from "./filters/currency.filter";
import messagePlugin from "@/utils/message.plugin";
import Loader from "@/components/app/Loader";
import tooltipDirective from "@/directives/tooltip.directive";

Vue.config.productionTip = false;
Vue.filter("date", dateFilter);
Vue.filter("currency", currencyFilter);
Vue.directive("tooltip", tooltipDirective);
Vue.use(Vuelidate);
Vue.use(messagePlugin);
Vue.component("Loader", Loader);

firebase.initializeApp({
  apiKey: "AIzaSyAw6CZgcgcPEhfmhiLQK9LiextaI8a_Nvk",
  authDomain: "vue-example-ak.firebaseapp.com",
  databaseURL: "https://vue-example-ak.firebaseio.com",
  projectId: "vue-example-ak",
  storageBucket: "vue-example-ak.appspot.com",
  messagingSenderId: "99273715992",
  appId: "1:99273715992:web:9915a85c7fe9a41b80ae6d",
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
