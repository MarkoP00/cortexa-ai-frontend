import { createApp } from "vue";
import { router } from "./router";
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import "./style.css";
import App from "./App.vue";
import Vue3Toastify, { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(Vue3Toastify, {
  position: "top-right",
  autoClose: 3000,
});
app.mount("#app");
