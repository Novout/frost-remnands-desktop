import { defineComponent, onMounted } from "vue";
import { remote } from "electron";
import { useDefaultStore } from "-/config";
import { JsonFileSync } from "_/services/fs";

export default defineComponent({
  name: "App",
  setup() {
    onMounted(() => {
      const store = useDefaultStore();
      const { theme } = JsonFileSync("config/base.json");
      console.log(theme);

      store.base.theme = theme;

      store.base.theme === "dark" 
        ? document.querySelector("html").classList.add("dark")
        : document.querySelector("html").classList.remove("dark");
    });

    const win = remote.getCurrentWindow();
    
    const windowMinimize = () => {
      win.minimize();
    }

    const windowClose = () => {
      win.close();
    }

    return { windowClose, windowMinimize }
  },
  render() {
    return (
      <>
        <nav id="bar" class="flex justify-end items-center fixed bg-default-blueDark text-default-white w-full h-bar drag z-max">
          <router-link to="/" class="font-ralewayMedium text-sm mr-auto ml-10 no-underline appearance-none cursor-pointer no-drag hover:text-white-oneHover">Menu Inicial</router-link>
          <router-link to="/profile" class="font-ralewayMedium text-sm mr-auto ml-10 no-underline appearance-none cursor-pointer no-drag hover:text-white-oneHover">Perfil</router-link>
          <div id="minimize" onClick={this.windowMinimize} class="h-full px-px10 no-drag cursor-pointer hover:bg-default-blueLight">
            <span class="no-drag text-xl font-ralewayTiny">-</span>
          </div>
          <div id="close" onClick={this.windowClose} class="h-full px-px10 no-drag cursor-pointer hover:bg-default-blueLight">
            <span class="no-drag text-xl font-ralewayTiny">x</span>
          </div>
        </nav>
        <router-view />
      </>
    )
  }
});
