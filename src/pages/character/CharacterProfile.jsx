import { 
  defineComponent, 
  ref, 
  reactive, 
  onMounted, 
  watch 
} from "vue";
import { useCharacterStore } from "-/character";
import { JsonFileSync } from "_/services/fs";
import { useToast } from "vue-toastification";
import { validateNumber } from "@/utils/validate";
import { useToggle } from "@/use/toggle";
import Inventory from "@/lib/Inventory.jsx";

const GenericsBox = defineComponent({
  setup() {
    const character = useCharacterStore();
    const { toggle, open, close } = useToggle();
    const toggleHeader = ref(false);

    onMounted(() => {
      const { TOAST } = JsonFileSync("localisation/pt_BR.json");
      const toast = useToast();
      toast.success(TOAST.PROFILE_DEFAULT_SUCCESS);
    });

    return () => (
      <>
        <section 
          class="modal-background" 
          v-show={toggle.value}
        >
          <section class="flex flex-col justify-around items-center bg-default-white dark:bg-default-black text-default-black w-2/4 h-fully">
            <h2 class="text-default-blueTertiary">Nome:</h2>
            <input 
              vModel={character.name} 
              type="text"
              class="bg-dark-oneHover text-default-white dark:bg-default-white dark:text-default-black"
            />
            <h2 class="text-default-blueTertiary">Nível:</h2>
            <input 
              vModel={[character.level, ['number']]} 
              type="number"
              class="bg-dark-oneHover text-default-white dark:bg-default-white dark:text-default-black"
            />
            <button 
              onClick={close}
              class="px-:2 py-1 bg-default-white text-default-black rounded-full focus:outline-none"
            >Salvar</button>
          </section>
        </section>
        <header class="flex flex-col flex-nowrap">
          <section class="flex flex-row flex-nowrap justify-around items-center h-profile-header">
            <h1 
              class="text-3vw cursor-pointer text-default-black dark:text-default-white"
              onClick={open}
            >{character.name}</h1>
            <section class="flex flex-row flex-nowrap">
              <section class="py-:1 px-:2">
                <h2 
                  class="text-default-black dark:text-default-white font-ralewayMedium text-3vh border-b-2 border-default-black dark:border-default-white mb-1 cursor-pointer"
                  onClick={open}
                >{character.getCharacterClass} / {character.level}</h2>
                <p 
                  class="text-default-black dark:text-default-white text font-ralewayMedium text-3vh"
                >Classe / Nível</p>
              </section>
              <section class="py-:1 px-:2">
                <h2 
                  class="text-default-black dark:text-default-white font-ralewayMedium text-3vh border-b-2 border-default-black dark:border-default-white mb-1"
                >{character.getRaceName}</h2>
                <p 
                  class="text-default-black dark:text-default-white text-3vh font-ralewayMedium"
                >Raça</p>
              </section>
              <section class="py-:1 px-:2">
                <h2 
                  class="text-default-black dark:text-default-white font-ralewayMedium text-3vh border-b-2 border-default-black dark:border-default-white mb-1"
                >{character.getOriginName}</h2>
                <p 
                  class="text-default-black dark:text-default-white text-3vh font-ralewayMedium"
                >Origem</p>
              </section>
            </section>
          </section>
        </header>
      </>
    )
  }
})

const HabilityItem = defineComponent({
  props: {
    hability: {
      type: String,
      required: true
    },
    modifier: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    return () => (
      <>
        <article class="character-hability">
          <p class="text-sm dark:text-default-white font-ralewayMedium">{props.hability}</p>
          <p class="text-2xl dark:text-default-white font-ralewayMedium">{props.modifier}</p>
          <p 
            class="bg-default-white text-lg dark:bg-dark-one dark:text-default-white py-1 px-:3 rounded-full text-default-black cursor-pointer hover:bg-default-blueLight dark:hover:bg-default-blueDark font-ralewayMedium"
          >{props.total}</p>
        </article>
      </>
    )
  }
})

const ProficiencyItem = defineComponent({
  setup() {
    const character = useCharacterStore();

    return () => (
      <>
        <article class="character-proficiency">
          <p 
            class="bg-default-white py-:1 px-:2 dark:text-default-white text-default-black rounded-full dark:bg-default-black ml-:2"
          >{character.getProficiencyBonus}</p>
          <p 
          class="text-default-white dark:text-default-white flex justify-around items-center font-ralewayMedium"
          >Proficiência</p>
        </article>
      </>
    )
  }
})

const ExpertiseItem = defineComponent({
  setup() {
    const character = useCharacterStore();

    const expertises = JsonFileSync("constants/character/expertise.json");

    return () => (
      <>
        {expertises.map((expertise) => {
          return (
            <article class="flex justify-between items-center mt-:1 bg-dark-one dark:bg-dark-bg hover:bg-dark-oneHover dark:hover:bg-dark-bgHover w-full p-:1">
              <input 
                class="text-default-white dark:text-default-white" 
                type="checkbox" 
                vModel={character.expertises[expertise.code]} 
              />
              <p 
                class="text-default-white dark:text-default-white font-ralewayMedium"
              >{expertise.name}</p>
            </article>
          )
        })}
      </>
    )
  }
})

const DataItem = defineComponent({
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
          <article class="flex flex-col justify-between h-40 items-start dark:bg-dark-one bg-dark-input dark:hover:bg-dark-bgHover hover:bg-dark-inputHover p-:3">
            <h1 class="text-default-white dark:text-default-white font-poppinsMedium text-xl">{modal.title}</h1>
            <input 
              class="text-default-black dark:text-default-black"
              type="text"
              vModel={modal.payload} 
            />
            <button 
              class="text-default-white dark:text-default-black bg-default-black dark:bg-default-white rounded-full cursor-pointer mt-:2 px-:2 py-:1 focus:outline-none"
              onClick={closeModal}
            >{modal.save}</button>
          </article>
        </section>
        <section class="flex justify-around items-center w-full bg-dark-one dark:bg-dark-bg p-:1 ml-:2">
          <article 
            class="flex flex-col flex-nowrap justify-center items-center py-:3 px-:1 cursor-pointer flex-1 dark:hover:bg-dark-bgHover"
            id="initiative"
            onClick={modalOpen}
          >
            <h2 
              class="text-default-white dark:text-default-white pointer-events-none font-ralewayMedium"
            >Iniciativa</h2>
            <p 
              class="text-default-white dark:text-default-white pointer-events-none"
            >{character.initiative}</p>
          </article>
          <article 
            class="flex flex-col flex-nowrap justify-center items-center py-:3 px-:1 cursor-pointer flex-1 dark:hover:bg-dark-bgHover"
            id="ca"
            onClick={modalOpen}
          >
            <h2 
              class="text-default-white dark:text-default-white pointer-events-none font-ralewayMedium"
            >CA</h2>
            <p 
              class="text-default-white dark:text-default-white pointer-events-none"
            >{character.CA}</p>
          </article>
          <article 
            class="flex flex-col flex-nowrap justify-center items-center py-:3 px-:1 cursor-pointer flex-1 dark:hover:bg-dark-bgHover"
            id="speed"
            onClick={modalOpen}
          >
            <h2 
              class="text-default-white dark:text-default-white pointer-events-none font-ralewayMedium"
            >Velocidade</h2>
            <p 
              class="text-default-white dark:text-default-white pointer-events-none"
            >{character.speed}</p>
          </article>
          <article 
            class="flex flex-col flex-nowrap justify-center items-center py-:3 px-:1 cursor-pointer flex-1 dark:hover:bg-dark-bgHover" 
            onClick={toggleChance}
          >
            <h2 class="text-default-white dark:text-default-white font-ralewayMedium">UC</h2>
            {character.lastChance ? <p class="text-default-white dark:text-default-white">Sim</p> : <p class="text-default-white dark:text-default-white">Não</p>}
          </article>
        </section>
      </>
    )
  }
})

const HitItemModal = defineComponent({
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
          <section class="flex flex-col justify-around items-center h-fully w-2/4 bg-default-white dark:bg-dark-one">
            <section class="flex flex-col items-center justify-center my-:1 w-2/4">
              <h2 class="text-default-blueTertiary">Alterar Dado de Vida</h2>
              <select 
                vModel={character.hitDice} 
                class="text-default-black p-1"
              >
                <option value="4" class="text-default-black">4</option>
                <option value="6" class="text-default-black">6</option>
                <option value="8" class="text-default-black">8</option>
                <option value="10" class="text-default-black">10</option>
                <option value="12" class="text-default-black">12</option>
                <option value="20" class="text-default-black">20</option>
              </select>
            </section>
            <section class="flex flex-col items-center justify-center my-:1 w-2/4">
              <h2 class="text-default-blueTertiary">Alterar Pontos de Vida</h2>
              <input 
                vModel={character.hitPoints} 
                class="text-default-black p-1"
                type="text" 
              />
            </section>
            <button 
              onClick={close}
              class="px-:2 py-:1 mb-:1 bg-default-black dark:bg-default-white text-default-white dark:text-default-black rounded-full cursor-pointer focus:outline-none"
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

const HitItem = defineComponent({
  setup() {
    const { toggle, toggleButton } = useToggle();

    return () => (
      <>
        <section class="flex flex-col justify-start items-center w-full bg-dark-one dark:bg-dark-bg dark:hover:bg-dark-bgHover hover:bg-dark-inputHover p-:1 ml-:2 mt-:2">
          <section class="flex justify-between w-full">
            <h2 
              class="font-ralewayMedium text-default-white dark:text-default-white"
            >Vida:</h2>
            <button 
              class="h-6 rounded-full px-:1 border-2 focus:outline-none border-white-input dark:hover:bg-white-oneHover hover:bg-dark-inputHover dark:bg-white-input bg-none cursor-pointer text-default-white dark:text-default-black" 
              onClick={toggleButton}
            >{toggle.value ? "-": ">"}</button>
          </section>
          {toggle.value && <HitItemModal />}
        </section>
      </>
    )
  }
})

const TextItemDescription = defineComponent({
  setup() {
    const character = useCharacterStore();

    return () => (
      <span 
        class="font-ralewayMedium text-base text-default-white dark:text-default-white"
      >{character.description}</span>
    )
  }
})

const TextItem = defineComponent({
  setup() {
    const { toggle, toggleButton } = useToggle();

    return () => (
      <>
        <section class="flex flex-col justify-start items-center w-full bg-dark-one dark:bg-dark-bg dark:hover:bg-dark-bgHover hover:bg-dark-inputHover p-:1 ml-:2 mt-:2">
          <section class="flex justify-between w-full">
            <h2 
              class="font-ralewayMedium text-default-white dark:text-default-white"
            >Descrição:</h2>
            <button 
              class="h-6 rounded-full px-:1 border-2 focus:outline-none border-white-input hover:bg-dark-inputHover dark:bg-white-input dark:hover:bg-white-oneHover bg-none cursor-pointer text-default-white dark:text-default-black" 
              onClick={toggleButton}
            >{toggle.value ? "-": ">"}</button>
          </section>
          {toggle.value && <TextItemDescription />}
        </section>
      </>
    )
  }
})

const BreakItemDescription = defineComponent({
  setup() {
    const character = useCharacterStore();

    return () => (
      <span 
        class="font-ralewayMedium text-base text-default-white dark:text-default-white"
      >{character.breakPoint}</span>
    )
  }
})

const BreakItem = defineComponent({
  setup() {
    const { toggle, toggleButton } = useToggle();

    return () => (
      <>
        <section class="flex flex-col justify-start items-center w-full bg-dark-one dark:bg-dark-bg dark:hover:bg-dark-bgHover hover:bg-dark-inputHover p-:1 ml-:2 mt-:2">
          <section class="flex justify-between w-full">
            <h2 
              class="font-ralewayMedium text-default-white dark:text-default-white"
            >Ponto de Quebra:</h2>
            <button 
              class="h-6 rounded-full px-:1 border-2 focus:outline-none border-white-input hover:bg-dark-inputHover dark:bg-white-input dark:hover:bg-white-oneHover bg-none cursor-pointer  text-default-white dark:text-default-black" 
              onClick={toggleButton}
            >{toggle.value ? "-": ">"}</button>
          </section>
          {toggle.value && <BreakItemDescription />}
        </section>
      </>
    )
  }
})

const InventoryItem = defineComponent({
  setup() {
    const { toggle, toggleButton } = useToggle();

    return () => (
      <>
        <section class="flex flex-col justify-start items-center w-full bg-dark-one dark:bg-dark-bg dark:hover:bg-dark-bgHover hover:bg-dark-inputHover p-:1 ml-:2 mt-:2">
          <section class="flex justify-between w-full">
            <h2 
              class="font-ralewayMedium text-default-white dark:text-default-white"
            >Inventário:</h2>
            <button 
              class="h-6 rounded-full px-:1 border-2 focus:outline-none border-white-input hover:bg-dark-inputHover dark:bg-white-input dark:hover:bg-white-oneHover bg-none cursor-pointer  text-default-white dark:text-default-black" 
              onClick={toggleButton}
            >{toggle.value ? ">": ">"}</button>
          </section>
          {toggle.value && <Inventory toggle={toggle} />}
        </section>
      </>
    )
  }
})

const TalentsList = defineComponent({
  setup() {
    const character = useCharacterStore();

    return () => (
      <section class="flex flex-col items-center w-full max-h-60 overflow-y-auto py-:2">
        {character.talents.map(talent => 
          <article class="sm:w-full md:w-full lg:w-4/5 xl:w-2/3 border-2 rounded-sm my-:1 border-default-blueLight dark:border-default-blueTertiary p-:1">
            <h2 class="text-lg mb-:1 border-b dark:text-default-white text-default-black">{talent.title}</h2>
            <p class="font-ralewayMedium mb-:1 dark:text-default-white text-default-black">{talent.description}</p>
            <p class="font-ralewayMedium mb-:1 dark:text-default-white text-default-black">{talent.bonus}</p>
          </article>
        )}
      </section>
    )
  }
})

const TalentsItem = defineComponent({
  setup() {
    const { toggle, toggleButton } = useToggle();

    return () => (
      <>
        <section class="item-right-aside">
          <section class="flex justify-between w-full">
            <h2 
              class="font-ralewayMedium text-default-white dark:text-default-white"
            >Talentos:</h2>
            <button 
              class="h-6 rounded-full px-:1 border-2 focus:outline-none border-white-input hover:bg-dark-inputHover dark:bg-white-input dark:hover:bg-white-oneHover bg-none cursor-pointer  text-default-white dark:text-default-black" 
              onClick={toggleButton}
            >{toggle.value ? "-": ">"}</button>
          </section>
          {toggle.value && <TalentsList />}
        </section>
      </>
    )
  }
})

const ItemsBox = defineComponent({
  setup() {
    const { toggle, open, close } = useToggle();

    const { TOAST } = JsonFileSync("localisation/pt_BR.json");
    const toast = useToast();

    watch(toggle, (toggle) => {
      if(!toggle) toast.success(TOAST.PROFILE_ITEMS_SUCCESS);
    })

    const character = useCharacterStore();

    return () => (
      <>
        <section 
          class="modal-background" 
          v-show={toggle.value}
        >
          <section class="flex flex-col justify-start items-center h-fully w-2/4 bg-default-white dark:bg-dark-one">
            <section class="flex flex-row flex-wrap items-center justify-center mt-:1 w-2/4">
              <h2 class="text-default-blueTertiary">Força:</h2>
              <input 
                vModel={[character.hability.strength, ['number']]}
                class="text-default-white bg-default-black dark:text-default-black dark:bg-default-white px-:1"
                type="number" 
              />
            </section>
            <section class="flex flex-row flex-wrap items-center justify-center mt-:1 w-2/4">
              <h2 class="text-default-blueTertiary">Destreza:</h2>
              <input 
                vModel={[character.hability.dexterity, ['number']]}
                class="text-default-white bg-default-black dark:text-default-black dark:bg-default-white px-:1"
                type="number" 
              />
            </section>
            <section class="flex flex-row flex-wrap items-center justify-center mt-:1 w-2/4">
              <h2 class="text-default-blueTertiary">Constituição:</h2>
              <input 
                vModel={[character.hability.constitution, ['number']]}
                class="text-default-white bg-default-black dark:text-default-black dark:bg-default-white px-:1"
                type="number" 
              />
            </section>
            <section class="flex flex-row flex-wrap items-center justify-center mt-:1 w-2/4">
              <h2 class="text-default-blueTertiary">Inteligência:</h2>
              <input 
                vModel={[character.hability.intelligence, ['number']]}
                class="text-default-white bg-default-black dark:text-default-black dark:bg-default-white px-:1"
                type="number" 
              />
            </section>
            <section class="flex flex-row flex-wrap items-center justify-center mt-:1 w-2/4">
              <h2 class="text-default-blueTertiary">Sabedoria:</h2>
              <input 
                vModel={[character.hability.wisdom, ['number']]}
                class="text-default-white bg-default-black dark:text-default-black dark:bg-default-white px-:1"
                type="number" 
              />
            </section>
            <section class="flex flex-row flex-wrap items-center justify-center my-:1 w-2/4">
              <h2 class="text-default-blueTertiary">Carisma:</h2>
              <input 
                vModel={[character.hability.charisma, ['number']]}
                class="text-default-white bg-default-black dark:text-default-black dark:bg-default-white px-:1"
                type="number" 
              />
            </section>
            <button 
              onClick={close}
              class="px-:2 py-:1 mb-:1 bg-default-black dark:bg-default-white text-default-white dark:text-default-black rounded-full cursor-pointer focus:outline-none"
            >Salvar</button>
          </section>
        </section>
        <section class="flex h-auto p-:2">
          <aside class="flex flex-col flex-nowrap justify-between items-center rounded-lg h-auto w-profile-aside shadow-lg bg-dark-one dark:bg-dark-bg p-:1">
            <HabilityItem 
              hability="Força" 
              modifier={character.strengthModifier} 
              total={character.hability.strength}
              onClick={open} 
            />
            <HabilityItem 
              hability="Destreza" 
              modifier={character.dexterityModifier} 
              total={character.hability.dexterity} 
              onClick={open} 
            />
            <HabilityItem 
              hability="Constituição" 
              modifier={character.constitutionModifier}  
              total={character.hability.constitution} 
              onClick={open}
            />
            <HabilityItem 
              hability="Inteligência" 
              modifier={character.intelligenceModifier} 
              total={character.hability.intelligence} 
              onClick={open}
            />
            <HabilityItem 
              hability="Sabedoria" 
              modifier={character.wisdomModifier} 
              total={character.hability.wisdom}
              onClick={open}  
            />
            <HabilityItem 
              hability="Carisma" 
              modifier={character.charismaModifier} 
              total={character.hability.charisma}
              onClick={open} 
            />
          </aside>
          <section class="flex flex-col flex-nowrap justify-between items-center rounded-lg h-auto w-profile-main ml-:2 dark:bg-default-black">
            <ProficiencyItem />
            <ExpertiseItem />
          </section>
          <section class="flex flex-col flex-nowrap justify-start items-center h-auto w-profile-general ml-:1">
            <DataItem />
            <HitItem />
            <TextItem />
            <BreakItem />
            <InventoryItem />
            <TalentsItem />
          </section>
        </section>
      </>
    )
  }
})

/*
const PlaygroundBox = defineComponent({
  setup() {
    return () => (
      <><p>a</p></>
    )
  }
})
*/

export default defineComponent({
  name: "CharacterProfile",
  setup() {
    return () => (
      <section class="bg-default-white dark:bg-dark-one pt-bar">
        <GenericsBox />
        <ItemsBox />
      </section>
    )
  }
});
