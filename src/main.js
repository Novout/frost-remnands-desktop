import { createApp } from "vue";
import { createPinia } from "pinia";
import { router } from "./router";
import App from "./App.jsx";
import "./css/_preset.css";
import { FontAwesomeIcon } from "@/plugins/fontawesome";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component("fa", FontAwesomeIcon)
app.mount("#app");
