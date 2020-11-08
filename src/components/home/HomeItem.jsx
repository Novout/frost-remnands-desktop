import { defineComponent } from "vue";
import "./styles.css";

export default defineComponent({
  setup() {
    const options = [
      { title: "Ficha de Personagem", to: "/create" },
      { title: "Carregar Personagem", to: "/load" }
    ]

    return () => (
      <>
        <section class="home">
          <p>Frost Remnands</p>
          {options.map(option => 
            <button><router-link to={option.to}>{option.title}</router-link></button>
          )}
        </section>
      </>
    )
  }
});