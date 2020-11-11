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
                <h2>{character.characterClass} {character.level}</h2>
                <p>Classe / Nível</p>
              </section>
              <section class="generics__initial__aside--item">
                <h2>{character.race}</h2>
                <p>Raça</p>
              </section>
              <section class="generics__initial__aside--item">
                <h2>{character.origin}</h2>
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

const ItemsBox = defineComponent({
  components: {
    HabilityItem
  },
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
        </main>
      </>
    )
  }
})

const PlaygroundBox = defineComponent({
  setup() {
    return () => (
      <><p>a</p></>
    )
  }
})

export default defineComponent({
  name: "CharacterProfile",
  setup() {
    return () => (
      <section class="profile">
        <GenericsBox />
        <ItemsBox />
        <PlaygroundBox />
      </section>
    )
  }
});
