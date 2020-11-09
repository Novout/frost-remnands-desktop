import { defineComponent } from "vue";
import "./styles.css";

export default defineComponent({
  setup() {
    const options = [
      { title: "Ficha de Personagem", to: "/create" },
      { title: "Carregar Personagem", to: "/load" },
      { title: "Playground - Desabilitado", to: "/" },
      { title: "Multiplayer - Desabilitado", to: "/" }
    ]

    return () => (
      <>
        <section class="home">
          <p>Restos da Geada</p>
          {options.map(option => 
            <router-link to={option.to}>{option.title}</router-link>
          )}
        </section>
      </>
    )
  }
});