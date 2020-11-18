import { createApp } from "vue";
import { createPinia } from "pinia";
import { router } from "./router";
import { FontAwesomeIcon } from "@/plugins/fontawesome";
import App from "./App.jsx";

import "./css/_tailwind.css";
import "./css/_preset.css";
import "./css/_components.css";

const app = createApp(App);

app.component("fa", FontAwesomeIcon);
app.use(createPinia());
app.use(router);
router.isReady().then(() => app.mount("#app"));
