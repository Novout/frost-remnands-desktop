import { defineComponent } from "vue";
import "./styles.css";

export default defineComponent({
  setup() {
    const options = [
      { title: "Novo Personagem", to: "/newcharacter" },
      { title: "Carregar Personagem", to: "/loadcharacter" }
    ]

    return () => (
      <>
        <section>
          <p>Frost Remnands</p>
          {options.map(option => 
            <button><router-link to={option.to}>{option.title}</router-link></button>
          )}
        </section>
      </>
    )
  }
});