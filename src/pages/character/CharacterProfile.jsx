import { defineComponent, ref, reactive, onMounted } from "vue";
import { useCharacterStore } from "-/character";
import { JsonFileSync } from "_/services/fs";
import { useToast } from "vue-toastification";
import { validateNumber } from "@/utils/validate";

const GenericsBox = defineComponent({
  setup() {
    const character = useCharacterStore();

    onMounted(() => {
      const { TOAST } = JsonFileSync("localisation/pt_BR.json");
      const toast = useToast();
      toast.success(TOAST.PROFILE_DEFAULT_SUCCESS);
    });

    return () => (
      <>
        <header class="flex flex-col flex-nowrap">
          <section class="flex flex-row flex-nowrap justify-around items-center h-profile-header">
            <h1 class="text-3vw cursor-pointer text-default-black dark:text-default-white">{character.name}</h1>
            <section class="flex flex-row flex-nowrap">
              <section class="py-:1 px-:2">
                <h2 
                  class="text-default-black dark:text-default-white font-ralewayMedium text-3vh border-b-2 border-default-black dark:border-default-white mb-1"
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
          <p class="text-sm dark:text-default-black">{props.hability}</p>
          <p class="text-2xl dark:text-default-black">{props.modifier}</p>
          <p 
            class="text-base bg-default-white dark:bg-dark-one dark:text-default-white py-1 px-:3 rounded-full text-default-black cursor-pointer hover:bg-default-blueLight dark:hover:bg-default-blueDark"
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
          class="text-default-white dark:text-default-black flex justify-around items-center"
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
            <article class="flex justify-between items-center mt-:1 bg-dark-one dark:bg-white-one hover:bg-dark-oneHover dark:hover:bg-white-oneHover w-full p-:1">
              <input 
                class="text-default-white dark:text-default-black" 
                type="checkbox" 
                vModel={character.expertises[expertise.code]} 
              />
              <p 
                class="text-default-white dark:text-default-black"
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
          <article class="flex flex-col justify-between h-40 items-start dark:bg-white-input bg-dark-input p-:3">
            <h1 class="text-default-white dark:text-default-black font-poppinsMedium text-xl">{modal.title}</h1>
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
        <section class="flex justify-around items-center w-full bg-dark-one dark:bg-white-one p-:1 ml-:2">
          <article 
            class="flex flex-col flex-nowrap justify-center items-center py-:3 px-:1 cursor-pointer hover:bg-dark-oneHover dark:hover:bg-white-oneHover flex-1"
            id="initiative"
            onClick={modalOpen}
          >
            <h2 
              class="text-default-white dark:text-default-black pointer-events-none"
            >Iniciativa</h2>
            <p 
              class="text-default-white dark:text-default-black pointer-events-none"
            >{character.initiative}</p>
          </article>
          <article 
            class="flex flex-col flex-nowrap justify-center items-center py-:3 px-:1 cursor-pointer hover:bg-dark-oneHover dark:hover:bg-white-oneHover flex-1"
            id="ca"
            onClick={modalOpen}
          >
            <h2 
              class="text-default-white dark:text-default-black pointer-events-none"
            >CA</h2>
            <p 
              class="text-default-white dark:text-default-black pointer-events-none"
            >{character.CA}</p>
          </article>
          <article 
            class="flex flex-col flex-nowrap justify-center items-center py-:3 px-:1 cursor-pointer hover:bg-dark-oneHover dark:hover:bg-white-oneHover flex-1"
            id="speed"
            onClick={modalOpen}
          >
            <h2 
              class="text-default-white dark:text-default-black pointer-events-none"
            >Velocidade</h2>
            <p 
              class="text-default-white dark:text-default-black pointer-events-none"
            >{character.speed}</p>
          </article>
          <article 
            class="flex flex-col flex-nowrap justify-center items-center py-:3 px-:1 cursor-pointer hover:bg-dark-oneHover dark:hover:bg-white-oneHover flex-1" 
            onClick={toggleChance}
          >
            <h2 class="text-default-white dark:text-default-black">UC</h2>
            {character.lastChance ? <p class="text-default-white dark:text-default-black">Sim</p> : <p class="text-default-white dark:text-default-black">Não</p>}
          </article>
        </section>
      </>
    )
  }
})

const HitItem = defineComponent({
  setup() {
    // const character = useCharacterStore();

    return () => (
      <>
        <section class="flex justify-around items-center w-full bg-dark-one dark:bg-white-one p-:1 ml-:2">
          <p class="text-default-white dark:text-default-black">AA</p>
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
        class="font-ralewayMedium text-base text-default-white dark:text-default-black"
      >{character.description}</span>
    )
  }
})

const TextItem = defineComponent({
  setup() {
    let toggleTextItem = ref(false);

    const toggleButton = () => toggleTextItem.value = !toggleTextItem.value;

    return () => (
      <>
        <section class="flex flex-col justify-start items-center w-full bg-dark-one dark:bg-white-one hover:bg-dark-oneHover dark:hover:bg-white-oneHover p-:1 ml-:2 mt-:2">
          <section class="flex justify-between w-full">
            <h2 
              class="font-poppinsBold  text-default-white dark:text-default-black"
            >Descrição:</h2>
            <button 
              class="h-6 rounded-full px-:1 border-2 focus:outline-none border-white-input hover:bg-dark-inputHover dark:bg-white-input dark:hover:bg-white-oneHover bg-none cursor-pointer text-default-white dark:text-default-black" 
              onClick={toggleButton}
            >{toggleTextItem.value ? "-": ">"}</button>
          </section>
          {toggleTextItem.value && <TextItemDescription />}
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
        class="font-ralewayMedium text-base text-default-white dark:text-default-black"
      >{character.breakPoint}</span>
    )
  }
})

const BreakItem = defineComponent({
  setup() {
    let toggleBreakItem = ref(false);

    const toggleButton = () => toggleBreakItem.value = !toggleBreakItem.value;

    return () => (
      <>
        <section class="flex flex-col justify-start items-center w-full bg-dark-one dark:bg-white-one hover:bg-dark-oneHover dark:hover:bg-white-oneHover p-:1 ml-:2 mt-:2">
          <section class="flex justify-between w-full">
            <h2 
              class="font-poppinsBold text-default-white dark:text-default-black"
            >Ponto de Quebra:</h2>
            <button 
              class="h-6 rounded-full px-:1 border-2 focus:outline-none border-white-input hover:bg-dark-inputHover dark:bg-white-input dark:hover:bg-white-oneHover bg-none cursor-pointer  text-default-white dark:text-default-black" 
              onClick={toggleButton}
            >{toggleBreakItem.value ? "-": ">"}</button>
          </section>
          {toggleBreakItem.value && <BreakItemDescription />}
        </section>
      </>
    )
  }
})

const ItemsBox = defineComponent({
  setup() {
    const character = useCharacterStore();

    return () => (
      <>
        <section class="flex h-auto p-:2">
          <aside class="flex flex-col flex-nowrap justify-between items-center rounded-lg h-auto w-profile-aside shadow-lg bg-dark-one dark:bg-white-one p-:1">
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
          <section class="flex flex-col flex-nowrap justify-start items-center rounded-lg h-auto w-profile-general ml-:1 dark:bg-default-black">
            <DataItem />
            <HitItem />
            <TextItem />
            <BreakItem />
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
