import { createApp } from "vue";
import { createPinia } from "pinia";
import { router } from "./router";
import { FontAwesomeIcon } from "@/plugins/fontawesome";
import Toast, { POSITION } from "vue-toastification";
import App from "./App.jsx";

import "./css/_tailwind.css";
import "./css/_preset.css";
import "./css/_components.css";
import "vue-toastification/dist/index.css";

const app = createApp(App);

app.component("fa", FontAwesomeIcon);
app.use(Toast, {
  position: POSITION.TOP_RIGHT,
  timeout: 2000
});
app.use(createPinia());
app.use(router);
router.isReady().then(() => app.mount("#app"));
