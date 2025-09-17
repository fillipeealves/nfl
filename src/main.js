import { createApp } from "vue";
import App from "./views/App.vue"; // ✅ caminho correto
import router from "./router";

createApp(App).use(router).mount("#app");
