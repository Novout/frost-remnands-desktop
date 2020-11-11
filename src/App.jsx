import { defineComponent } from "vue";
import { remote } from "electron";
import "./App.css";

export default defineComponent({
  name: "App",
  setup() {
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
        <nav id="bar">
          <router-link to="/">Menu Inicial</router-link>
          <router-link to="/profile">Perfil</router-link>
          <div id="minimize" onClick={this.windowMinimize}>
            <span>-</span>
          </div>
          <div id="close" onClick={this.windowClose}>
            <span>x</span>
          </div>
        </nav>
        <router-view />
      </>
    )
  }
});
