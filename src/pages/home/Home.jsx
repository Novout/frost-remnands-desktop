import { defineComponent } from "vue";
import "./styles.css";

const HomeItem = defineComponent({
  setup() {
    const options = [
      { title: "Ficha de Personagem", to: "/create" },
      { title: "Carregar Personagem", to: "/load" },
      { title: "Playground - Desabilitado", to: "/" },
      { title: "Multiplayer - Desabilitado", to: "/" }
    ]

    return () => (
      <>
        <section class="main">
          <p>Restos da Geada</p>
          {options.map(option => 
            <router-link to={option.to}>{option.title}</router-link>
          )}
        </section>
      </>
    )
  }
});

export default defineComponent({
  name: "Home",
  components: {
    HomeItem
  },
  setup() {
    return () => (
      <>
        <main class="home">
          <HomeItem />
        </main>
      </>
    )
  }
});
