import { 
  defineComponent,
  ref,  
} from "vue";
import { useCharacterStore } from "-/character";
import "./styles.css";

export default defineComponent({
  setup() {
    const character = useCharacterStore();
    const toggleModal = ref(false);
    const toggleModalButton = () => {
      toggleModal.value = !toggleModal.value;
    }

    return () => (
      <>
        <section
          class="modal-background"
          v-show={toggleModal.value}
        >
          <section class="flex flex-col justify-around items-center w-3/4 h-fully bg-white-one dark:bg-dark-one p-:2">
            <section>
              <label class="font-ralewayMedium text-lg mr-:2 text-default-blueDark dark:text-default-blueTertiary">Efrium</label>
              <input 
                class="dark:bg-dark-bgHover bg-white-oneHover"
                vModel={[character.efrium, ['number']]} 
              />
            </section>
            <section>
              <label class="font-ralewayMedium text-lg mr-:2 text-default-blueDark dark:text-default-blueTertiary">Recursos Base</label>
              <input 
                class="dark:bg-dark-bgHover bg-white-oneHover"
                vModel={[character.baseResource, ['number']]} 
              />
            </section>
            <button
              class="pt-:1"
              onClick={toggleModalButton}
            >Fechar</button>
          </section>
        </section>
        <section class="flex w-full p-:1 justify-around items-center">
          <section 
            class="flex flex-col justify-center items-center cursor-pointer"
            onClick={toggleModalButton}
          >
            <p>Efrium</p>
            <p>{character.efrium}</p>
          </section>
          <section 
            class="flex flex-col justify-center items-center cursor-pointer"
            onClick={toggleModalButton}
          >
            <p>Recurso Base</p>
            <p>{character.baseResource}</p>
          </section>
        </section>
      </>
    )
  }
})