import { createApp } from "vue";
import { createPinia } from "pinia";
import { router } from "./router";
import Toast, { POSITION } from "vue-toastification";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleDoubleDown, faAngleDoubleRight, faFileImage } from "@fortawesome/free-solid-svg-icons";
//import { faComment } from "@fortawesome/free-regular-svg-icons";
//import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from "./App.jsx";

import "./css/_tailwind.css";
import "./css/_preset.css";
import "./css/_components.css";
import "vue-toastification/dist/index.css";

library.add(
  faAngleDoubleDown,
  faAngleDoubleRight,
  faFileImage
);

const app = createApp(App);
app.use(Toast, {
  position: POSITION.TOP_RIGHT,
  timeout: 2000
});
app.use(createPinia());
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);

router.isReady().then(() => app.mount("#app"));
