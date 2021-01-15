import { 
  defineComponent, 
  reactive, 
} from "vue";
import { JsonFileSync } from "_/services/fs";
import { useCharacterStore } from "-/character";
import { useToast } from "vue-toastification";
import { validateNumber } from "@/utils/validate";
import "./styles.css";

export default defineComponent({
  setup() {
    const { TOAST } = JsonFileSync("localisation/pt_BR.json");
    const character = useCharacterStore();
    const toast = useToast();
    const modal = reactive({
      isOpen: false,
      payload: undefined,
      id: "",
      title: "",
      save: "Salvar"
    });

    const modalOpen = (event) => {
      modal.id = event.target.id;
      modal.payload = undefined;
      const execute = {
        "initiative": () => {
          modal.title = "Alterar Iniciativa";
          return;
        },
        "ca": () => {
          modal.title = "Alterar CA";
          return;
        },
        "speed": () => {
          modal.title = "Alterar Velocidade Base";
          return;
        },
      }[modal.id]() || (() =>  { return; })();

      modal.isOpen = true;
    }

    const closeModal = () => {
      if(validateNumber(modal.payload)) {
        const execute = {
          "initiative": () => {
            character.initiative = modal.payload;
          },
          "ca": () => {
            character.CA = modal.payload;
          },
          "speed": () => {
            character.speed = modal.payload;
          }
        }[modal.id]() || (() =>  { return; })();
        modal.isOpen = false;
        toast.success(TOAST.PROFILE_ITEMS_SUCCESS);
        return;
      }

      toast.error(TOAST.PROFILE_INTEGER_ERROR);
    }

    const toggleChance = () => character.lastChance = !character.lastChance;

    return () => (
      <>
        <section 
          class="modal-background"
          v-show={modal.isOpen}
        >
          <article class="flex flex-col justify-between min-h-60 items-start dark:bg-dark-bg bg-white-one p-:3">
            <h1 class="font-poppinsMedium text-xl text-default-blueDark dark:text-default-blueTertiary">{modal.title}</h1>
            <input 
              class="flex-1 h-full mr-:1 mt-:1 text-sm rounded-full p-:1 text-default-black dark:text-default-white bg-white-oneHover dark:bg-dark-bgHover"
              type="text"
              vModel={modal.payload} 
            />
            <button 
              class="p-:1 mt-:4 text-default-black dark:text-default-white hover:bg-white-oneHover dark:hover:bg-dark-bgHover"
              onClick={closeModal}
            >{modal.save}</button>
          </article>
        </section>
        <section class="flex justify-around items-center w-full bg-profile p-:1 ml-:2">
          <article 
            class="flex flex-col flex-nowrap justify-center items-center py-:3 px-:1 cursor-pointer flex-1 dark:hover:bg-dark-bgHover"
            id="initiative"
            onClick={modalOpen}
          >
            <h2 
              class="pointer-events-none font-ralewayMedium"
            >Iniciativa</h2>
            <p 
              class="pointer-events-none"
            >{character.initiative}</p>
          </article>
          <article 
            class="flex flex-col flex-nowrap justify-center items-center py-:3 px-:1 cursor-pointer flex-1 dark:hover:bg-dark-bgHover"
            id="ca"
            onClick={modalOpen}
          >
            <h2 
              class="pointer-events-none font-ralewayMedium"
            >CA</h2>
            <p 
              class="pointer-events-none"
            >{character.CA}</p>
          </article>
          <article 
            class="flex flex-col flex-nowrap justify-center items-center py-:3 px-:1 cursor-pointer flex-1 dark:hover:bg-dark-bgHover"
            id="speed"
            onClick={modalOpen}
          >
            <h2 
              class="pointer-events-none font-ralewayMedium"
            >Velocidade</h2>
            <p 
              class="pointer-events-none"
            >{character.speed} pés</p>
          </article>
          <article 
            class="flex flex-col flex-nowrap justify-center items-center py-:3 px-:1 cursor-pointer flex-1 dark:hover:bg-dark-bgHover" 
            onClick={toggleChance}
          >
            <h2 class="font-ralewayMedium">UC</h2>
            {character.lastChance ? <p>Sim</p> : <p>Não</p>}
          </article>
        </section>
      </>
    )
  }
})