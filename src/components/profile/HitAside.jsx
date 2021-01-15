import { 
  defineComponent,
  watch 
} from "vue";
import { JsonFileSync } from "_/services/fs";
import { useCharacterStore } from "-/character";
import { useToast } from "vue-toastification";
import { useToggle } from "@/use/toggle";
import "./styles.css";

export default defineComponent({
  setup() {
    const { TOAST } = JsonFileSync("localisation/pt_BR.json");
    const toast = useToast();
    const character = useCharacterStore();
    const { toggle, open, close } = useToggle();

    watch(toggle, (toggle) => {
      if(!toggle) toast.success(TOAST.PROFILE_ITEMS_SUCCESS);
    })

    return () => (
      <>
        <section 
          class="modal-background" 
          v-show={toggle.value}
        >
          <section class="flex flex-col justify-around items-center h-fully w-2/4 bg-white-one dark:bg-dark-bg">
            <section class="flex flex-col items-center justify-center my-:1 w-2/4">
              <h2 class="text-default-blueTertiary">Alterar Dado de Vida</h2>
              <select 
                vModel={character.hitDice} 
                class="select-modal"
              >
                <option value="4">4</option>
                <option value="6">6</option>
                <option value="8">8</option>
                <option value="10">10</option>
                <option value="12">12</option>
                <option value="20">20</option>
              </select>
            </section>
            <section class="flex flex-col items-center justify-center my-:1 w-2/4">
              <h2 class="text-default-blueTertiary">Alterar Pontos de Vida</h2>
              <input 
                vModel={character.hitPoints} 
                class="input-modal"
                type="text" 
              />
            </section>
            <button 
              onClick={close}
              class="btn-modal"
            >Salvar</button>
          </section>
        </section>
        <section 
          onClick={open}
          class="flex flex-row w-full py-:2 px-:1 justify-between items-center"
        >
          <section 
            id="hit-dice"
            class="flex flex-1 flex-col justify-center items-center h-full p-:1 cursor-pointer"
          >
            <h2 class="font-ralewayMedium text-default-white hover:text-white-one">Dado de Vida</h2>
            <p class="text-default-white hover:text-white-oneHover">1d{character.hitDice}</p>
          </section>
          <section 
            id="hit-points"
            class="flex flex-1 flex-col justify-center items-center h-full p-:1 cursor-pointer"
          >
            <h2 class="font-ralewayMedium text-default-white hover:text-white-one">Pontos de Vida</h2>
            <p class="text-default-white hover:text-white-oneHover">{character.hitPoints}</p>
          </section>
        </section>
      </>
    )
  }
})