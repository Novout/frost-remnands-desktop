import { defineComponent, ref, onMounted } from "vue";
import { useCharacterStore } from "-/character";
import { JsonFileSync } from "_/services/fs";
import { useToast } from "vue-toastification";
import "./profile.css";


const GenericsBox = defineComponent({
  setup() {
    onMounted(() => {
      const toast = useToast();
      toast.success("Personagem Carregado!");
    });

    const character = useCharacterStore();

    return () => (
      <>
        <header class="generics">
          <section class="generics__initial">
            <h1 class="generics__initial--title text-default-black dark:text-default-white">{character.name}</h1>
            <section class="generics__initial__aside">
              <section class="generics__initial__aside--item">
                <h2 class="text-default-black dark:text-default-white">{character.getCharacterClass} {character.level}</h2>
                <p class="text-default-black dark:text-default-white">Classe / Nível</p>
              </section>
              <section class="generics__initial__aside--item">
                <h2 class="text-default-black dark:text-default-white">{character.getRaceName}</h2>
                <p class="text-default-black dark:text-default-white">Raça</p>
              </section>
              <section class="generics__initial__aside--item">
                <h2 class="text-default-black dark:text-default-white">{character.getOriginName}</h2>
                <p class="text-default-black dark:text-default-white">Origem</p>
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
          <p class="text-base bg-default-white dark:bg-dark-one dark:text-default-white py-1 px-:3 rounded-full text-default-black cursor-pointer hover:bg-default-blueLight dark:hover:bg-default-blueDark">{props.total}</p>
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
          <p class="items__save--value dark:text-default-white rounded-full dark:bg-default-black">{character.getProficiencyBonus}</p>
          <p class="items__save--proficiency dark:text-default-black">Proficiência</p>
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
            <article class="items__skills">
              <input type="checkbox" vModel={character.expertises[expertise.code]} />
              <p>{expertise.name}</p>
            </article>
          )
        })}
      </>
    )
  }
})

const DataItem = defineComponent({
  setup() {
    const character = useCharacterStore();

    const toggleChance = () => character.lastChance = !character.lastChance

    return () => (
      <>
        <section class="items__base__data">
          <article class="data__container">
            <h2>Iniciativa</h2>
            <p>{character.initiative}</p>
          </article>
          <article class="data__container">
            <h2>CA</h2>
            <p>{character.CA}</p>
          </article>
          <article class="data__container">
            <h2>Velocidade</h2>
            <p>{character.speed}</p>
          </article>
          <article class="data__container" onClick={toggleChance}>
            <h2>UC</h2>
            {character.lastChance ? <p>Sim</p> : <p>Não</p>}
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
        <section class="items__base__data">
          <p>AA</p>
        </section>
      </>
    )
  }
})

const TextItemDescription = defineComponent({
  setup() {
    const character = useCharacterStore();

    return () => (
      <span class="base__text__description">{character.description}</span>
    )
  }
})

const TextItem = defineComponent({
  setup() {
    let toggleTextItem = ref(false);

    const toggleButton = () => toggleTextItem.value = !toggleTextItem.value;

    return () => (
      <>
        <section class="base__text">
          <section class="base__text__initial">
            <h2>Descrição:</h2>
            <button onClick={toggleButton}>{toggleTextItem.value ? "-": ">"}</button>
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
      <span class="base__text__description">{character.breakPoint}</span>
    )
  }
})

const BreakItem = defineComponent({
  setup() {
    let toggleBreakItem = ref(false);

    const toggleButton = () => toggleBreakItem.value = !toggleBreakItem.value;

    return () => (
      <>
        <section class="base__text">
          <section class="base__text__initial">
            <h2>Ponto de Quebra:</h2>
            <button onClick={toggleButton}>{toggleBreakItem.value ? "-": ">"}</button>
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
        <section class="items">
          <aside class="items__hability shadow-lg dark:bg-default-white">
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
          <section class="items__save">
            <ProficiencyItem />
            <ExpertiseItem />
          </section>
          <section class="items__base">
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
    const character = useCharacterStore();

    const profileBackground = () => {
      return `profile--${character.origin}`
    }

    return () => (
      <section class="bg-default-white dark:bg-dark-one pt-bar">
        <GenericsBox />
        <ItemsBox />
      </section>
    )
  }
});
