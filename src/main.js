import { createApp } from "vue";
import { createPinia } from "pinia";
import { router } from "./router";
import App from "./App.jsx";
import "./css/_preset.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
