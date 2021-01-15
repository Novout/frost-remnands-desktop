import { defineComponent } from "vue";
import { useCharacterStore } from "-/character";
import "./styles.css";

export default defineComponent({
  props: {
    toggle: {
      required: true,
    },
    close: {
      required: true
    }
  },
  setup(props) {
    const character = useCharacterStore();

    return () => (
      <section 
          class="modal-background" 
          v-show={props.toggle}
        >
        <section class="flex flex-col justify-between items-center h-fully overflow-y-auto w-2/4 bg-white-one dark:bg-dark-one">
          <h2 class="h2-title">Força:</h2>
          <input 
            vModel={[character.hability.strength, ['number']]}
            class="input-modal"
            type="number" 
          />
          <h2 class="h2-title">Destreza:</h2>
          <input 
            vModel={[character.hability.dexterity, ['number']]}
            class="input-modal"
            type="number" 
          />
          <h2 class="h2-title">Constituição:</h2>
          <input 
            vModel={[character.hability.constitution, ['number']]}
            class="input-modal"
            type="number" 
          />
          <h2 class="h2-title">Inteligência:</h2>
          <input 
            vModel={[character.hability.intelligence, ['number']]}
            class="input-modal"
            type="number" 
          />
          <h2 class="h2-title">Sabedoria:</h2>
          <input 
            vModel={[character.hability.wisdom, ['number']]}
            class="input-modal"
            type="number" 
          />
          <h2 class="h2-title">Carisma:</h2>
          <input 
            vModel={[character.hability.charisma, ['number']]}
            class="input-modal"
            type="number" 
          />
          <button 
            onClick={props.close}
            class="btn-modal"
          >Salvar</button>
        </section>
      </section>
    )
  }
})