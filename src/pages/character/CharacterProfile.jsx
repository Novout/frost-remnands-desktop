import { defineComponent } from "vue";
// import { useCharacterStore } from "@/store/character";
import "./profile.css";

const GenericsBox = defineComponent({
  setup() {
    return () => (
      <>
        <header class="generics">
          <section class="generics__initial">
            <h1 class="generics__initial--title">Rouanir Intirl</h1>
            <section class="generics__initial__aside">
              <section class="generics__initial__aside--item">
                <h2>Autodidata 20</h2>
                <p>Classe / Nível</p>
              </section>
              <section class="generics__initial__aside--item">
                <h2>Nekro</h2>
                <p>Raça</p>
              </section>
              <section class="generics__initial__aside--item">
                <h2>Complexo de Rouanir</h2>
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
    return () => (
      <>
        <main class="items">
          <aside class="items__hability">
            <HabilityItem hability="Força" modifier={0} total={8} />
            <HabilityItem hability="Destreza" modifier={0} total={8} />
            <HabilityItem hability="Constituição" modifier={0} total={8} />
            <HabilityItem hability="Inteligência" modifier={0} total={8} />
            <HabilityItem hability="Sabedoria" modifier={0} total={8} />
            <HabilityItem hability="Carisma" modifier={0} total={8} />
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
