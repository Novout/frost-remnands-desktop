import { defineComponent, onMounted } from "vue";
import { remote } from "electron";
import { useDefaultStore } from "-/config";
import { useCharacterStore } from "-/character";
import { useSave } from "@/use/save";
import fr from "../frostremnands.config";

export default defineComponent({
  name: "App",
  setup() {
    onMounted(() => {
      const store = useDefaultStore();

      store.base.theme === "dark" 
        ? document.querySelector("html").classList.add("dark")
        : document.querySelector("html").classList.remove("dark");
    });

    const win = remote.getCurrentWindow();
    const character = useCharacterStore();
    
    const windowMinimize = () => {
      win.minimize();
    }

    const windowClose = () => {
      const { saveAll } = useSave();
      const close = window.confirm("Deseja realmente fechar o aplicativo?");
      if(close) {
        if(character.name !== "_template") {
          saveAll();
        }
        
        win.close();
      }
    }

    return { windowClose, windowMinimize }
  },
  render() {
    return (
      <>
        <nav id="bar" class="flex justify-end items-center fixed bg-default-white dark:bg-default-black text-default-black dark:text-default-white w-full h-bar drag z-max rounded-xl">
          {fr.console && 
          <>
            <router-link to="/" class="font-ralewayMedium text-sm mr-auto ml-10 no-underline appearance-none cursor-pointer no-drag hover:text-white-oneHover">Menu Inicial</router-link>
            <router-link to="/profile" class="font-ralewayMedium text-sm mr-auto ml-10 no-underline appearance-none cursor-pointer no-drag hover:text-white-oneHover">Perfil</router-link>
          </>}
          <div id="minimize" onClick={this.windowMinimize} class="h-full px-px10 no-drag cursor-pointer hover:bg-default-red dark:hover:bg-default-red">
            <span class="no-drag text-xl font-ralewayTiny text-default-black dark:text-default-white">-</span>
          </div>
          <div id="close" onClick={this.windowClose} class="h-full px-px10 no-drag cursor-pointer hover:bg-default-red dark:hover:bg-default-red">
            <span class="no-drag text-xl font-ralewayTiny text-default-black dark:text-default-white">x</span>
          </div>
        </nav>
        <router-view />
      </>
    )
  }
});
