import { 
  defineComponent,
  ref, 
  reactive, 
  onMounted, 
  watch 
} from "vue";
import { useCharacterStore } from "-/character";
import { JsonFileSync } from "_/services/fs";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useToggle } from "@/use/toggle";
import { useSave } from "@/use/save";
import { validateNumber } from "@/utils/validate";
import Inventory from "@/lib/Inventory.jsx";

const GenericsBox = defineComponent({
  setup() {
    const character = useCharacterStore();
    const { toggle, open, close } = useToggle();

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
          <p class="text-sm text-default-white font-ralewayMedium">{props.hability}</p>
          <p class="text-2xl text-default-white font-ralewayMedium">{props.modifier}</p>
          <p 
            class="bg-default-white text-lg dark:bg-dark-one dark:text-default-white py-1 px-:3 rounded-full text-default-black hover:bg-default-blueLight dark:hover:bg-default-blueDark font-ralewayMedium"
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
              <label class="toggle">
                <input 
                  class="input-custom" 
                  type="checkbox"
                  vModel={character.expertises[expertise.code]} 
                />
                <span class="label-custom">
                  <span class="input-text-custom">{expertise.name}</span>
                </span>
              </label>
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

const GenericsItem = defineComponent({
  setup() {
    const { saveCharacter } = useSave();
    const router = useRouter();

    const save = () => {
      saveCharacter();
      toast.success("Personagem salvo com sucesso!");
    }

    const initialMenu = () => {
      router.push("/");
    }

    return () => (
      <section
        class="flex flex-row sm:justify-between md:justify-between lg:justify-around xl:justify-around items-center w-full bg-dark-one dark:bg-dark-bg dark:hover:bg-dark-bgHover hover:bg-dark-inputHover p-:1 ml-:2 mb-:2"
      >
        <button
          class="p-:1 border rounded-md dark:border-default-white border-default-black"
          onClick={initialMenu}
        >Menu Inicial</button>
        <button
          class="p-:1 border rounded-md dark:border-default-white border-default-black"
          onClick={save}
        >Salvar Personagem</button>
      </section>
    )
  }
})

const ExaustList = defineComponent({
  setup() {
    const character = useCharacterStore();

    const subTime = () => {
      character.exhaustionTime = character.exhaustionTime - 1;
      character.exhaustion = false;
      if(character.exhaustionTime === 0) {
        character.exhaustion = true;
        character.exhaustionTime = 3;
      }
    }

    return () => (
      <section class="flex justify-between xl:justify-around lg:justify-between md:justify-between sm:justify-between p-:2 w-full h-full">
        <section class="flex flex-col p-:1 justify-center items-center">
          <h2 class="font-ralewayMedium">Exaustão Atual</h2>
          <p>{character.exhaustion ? "Disponível" : "Não-Disponível"}</p>
        </section>
        <section
          class="flex flex-col p-:1 justify-center items-center cursor-pointer"
          onClick={subTime}
        >
          <h2 class="font-ralewayMedium">Tempo de Exaustão</h2>
          <p>{character.exhaustionTime}</p>
        </section>
      </section>
    )
  }
})

const ExaustItem = defineComponent({
  setup() {
    const { toggle, toggleButton } = useToggle();

    return () => (
      <>
        <section class="item-right-aside">
          <section class="flex justify-between w-full">
            <h2 
              class="font-ralewayMedium text-default-black dark:text-default-white"
            >Exaustão:</h2>
            <button 
              class="item-right-button" 
              onClick={toggleButton}
            >{toggle.value ? "-": ">"}</button>
          </section>
          {toggle.value && <ExaustList />}
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
              class="item-right-button" 
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
              class="item-right-button"
              onClick={toggleButton}
            >{toggle.value ? "-": ">"}</button>
          </section>
          {toggle.value && <TextItemDescription />}
        </section>
      </>
    )
  }
})

const AnotationItemDescription = defineComponent({
  setup() {
    const character = useCharacterStore();

    return () => (
      <>
        <section class="flex flex-col w-full p-:2 justify-center">
          {character.anotations.map(item => (
            <article 
              class="flex my-:1 border-2 border-default-blueDark dark:border-default-blueTertiary flex-col p-:1 justify-between w-full"
            >   
              <h2 
                class="font-ralewayMedium text-default-blueDark dark:text-default-blueTertiary text-lg"
              >{item.title}</h2>
              <span 
                class="font-ralewayMedium text-base"
              >{item.description}</span>
            </article>
          ))}
        </section>
      </>
    )
  }
})

const AnotationItemModal = defineComponent({
  props: ["toggle"],
  setup(props) {
    const character = useCharacterStore();
    const toast = useToast();

    const state = reactive({
      title: "",
      description: ""
    });

    const add = () => {
      const item = {
        title: state.title,
        description: state.description
      }

      character.anotations.push(item);

      state.title = "";
      state.description = "";

      toast.success("Anotação criada com sucesso!");
    }

    const remove = (event) => {
      const id = event.target.id;

      const filtered = character.anotations.filter(item => item.title !== id);
      character.anotations = filtered;

      toast.success("Anotação excluida com sucesso!");
    }

    return () => (
      <section class="flex items-center justify-center full-background">
        <section class="h-fully overflow-y-auto p-:2 w-4/5 bg-white-one dark:bg-dark-bg">
          <form class="flex rounded-l-full w-full items-center justify-between h-10">
            <input
              class="flex-1 h-full mr-:1 text-sm rounded-l-full p-:1 bg-white-oneHover dark:bg-dark-bgHover"
              vModel={state.title}
              placeholder="Digite o título..."
            />
            <input 
              class="flex-1 h-full font-ralewayMedium text-sm w-2/5 p-:1 bg-white-oneHover dark:bg-dark-bgHover"
              vModel={state.description}
              placeholder="Digite a descrição..."
            />
            <button
              class="p-:1 text-lg focus:outline-none bg-default-white hover:bg-white-one dark:bg-default-black dark:hover:bg-dark-oneHover"
              onClick={add}
            >+</button>
          </form>
          <section class="flex flex-col rounded-l-full w-full items-start">
            {character.anotations.map(item => (
              <article class="flex flex-col flex-wrap border border-default-blueDark dark:border-default-blueTertiary p-:2 my-:2 w-full">
                <h2 class="text-xl text-default-blueDark dark:text-default-blueTertiary">{item.title}</h2>
                <p class="font-ralewayMedium">{item.description}</p>
                <button
                  id={item.title}
                  class="w-10 mt-:2 hover:bg-default-red"
                  onClick={remove}
                >-</button>
              </article>
            ))}
          </section>
          <button 
            class="font-ralewayMedium p-:1 mt-:3 text-default-black dark:text-default-white"
            onClick={props.toggle}
          >Fechar</button>
        </section>
      </section>
    )
  }
})

const AnotationItem = defineComponent({
  setup() {
    const { toggle, toggleButton } = useToggle();
    const toggleModal = ref(false);
    const toggleModalButton = () => toggleModal.value = !toggleModal.value;

    return () => (
      <>
        <section class="flex flex-col justify-start items-center w-full bg-dark-one dark:bg-dark-bg dark:hover:bg-dark-bgHover hover:bg-dark-inputHover p-:1 ml-:2 mt-:2">
          <section class="flex justify-between w-full">
            <h2 
              class="flex-1 font-ralewayMedium text-default-white dark:text-default-white"
            >Anotações:</h2>
            <button 
              class="item-right-button mr-:1" 
              onClick={toggleModalButton}
            >+</button>
            <button 
              class="item-right-button"
              onClick={toggleButton}
            >{toggle.value ? "-": ">"}</button>
          </section>
          {toggle.value && <AnotationItemDescription />}
        </section>
        {toggleModal.value && <AnotationItemModal toggle={toggleModalButton} />}
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
              class="item-right-button"
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
              class="item-right-button"
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
              class="item-right-button"
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
    const toggle = ref(false);
    const open = () => toggle.value = true;
    const close = () => toggle.value = false;

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
          <aside 
            class="flex flex-col cursor-pointer flex-nowrap justify-between items-center rounded-lg h-auto w-profile-aside shadow-lg bg-dark-one dark:bg-dark-bg p-:1"
            onClick={open}
          >
            <HabilityItem 
              hability="Força" 
              modifier={character.strengthModifier} 
              total={character.hability.strength}
            />
            <HabilityItem 
              hability="Destreza" 
              modifier={character.dexterityModifier} 
              total={character.hability.dexterity} 
            />
            <HabilityItem 
              hability="Constituição" 
              modifier={character.constitutionModifier}  
              total={character.hability.constitution} 
            />
            <HabilityItem 
              hability="Inteligência" 
              modifier={character.intelligenceModifier} 
              total={character.hability.intelligence} 
            />
            <HabilityItem 
              hability="Sabedoria" 
              modifier={character.wisdomModifier} 
              total={character.hability.wisdom} 
            />
            <HabilityItem 
              hability="Carisma" 
              modifier={character.charismaModifier} 
              total={character.hability.charisma}
            />
          </aside>
          <section class="flex flex-col flex-nowrap justify-between items-center rounded-lg h-auto w-profile-main ml-:2 dark:bg-default-black">
            <ProficiencyItem />
            <ExpertiseItem />
          </section>
          <section class="flex flex-col flex-nowrap justify-start items-center h-auto w-profile-general ml-:1">
            <GenericsItem />
            <DataItem />
            <ExaustItem />
            <AnotationItem />
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
