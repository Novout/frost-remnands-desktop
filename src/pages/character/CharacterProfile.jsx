import { defineComponent } from "vue";
import { useCharacterStore } from "@/store/character";
import "./profile.css";

const GenericsBox = defineComponent({
  setup() {
    const character = useCharacterStore();

    return () => (
      <>
        <header class="generics">
          <section class="generics__initial">
            <h1 class="generics__initial--title">{character.name}</h1>
            <section class="generics__initial__aside">
              <section class="generics__initial__aside--item">
                <h2>{character.getCharacterClass} {character.level}</h2>
                <p>Classe / Nível</p>
              </section>
              <section class="generics__initial__aside--item">
                <h2>{character.getRaceName}</h2>
                <p>Raça</p>
              </section>
              <section class="generics__initial__aside--item">
                <h2>{character.getOriginName}</h2>
                <p>Origem</p>
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
        <article class="hability">
          <p class="hability--title">{props.hability}</p>
          <p class="hability--main">{props.modifier}</p>
          <p class="hability--general">{props.total}</p>
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
        <article class="items__save__proficiency">
          <p class="items__save--value">{character.getProficiencyBonus}</p>
          <p class="items__save--proficiency">Proficiência</p>
        </article>
      </>
    )
  }
})

const SkillsItem = defineComponent({
  setup() {
    return () => (
      <>
        <article class="items__skills">
          <p>AA</p>
        </article>
      </>
    )
  }
})

const ItemsBox = defineComponent({
  setup() {
    const character = useCharacterStore();

    return () => (
      <>
        <main class="items">
          <aside class="items__hability">
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
            <SkillsItem />
          </section>
        </main>
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
      <section class={profileBackground()}>
        <GenericsBox />
        <ItemsBox />
      </section>
    )
  }
});
