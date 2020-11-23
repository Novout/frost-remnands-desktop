import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useCharacterStore } from "-/character";
import { JsonFileSync } from "_/services/fs";
import "./create.css";

const ItemBox = defineComponent({
  name: "ItemBox",
  setup() {
    const talents = ref(JsonFileSync("constants/character/talents.json"));

    const character = useCharacterStore();

    const pushTalent = (talent) => {
      console.log(character)
      console.log(talent.value)
      // character.talents.push(talent);
    }
    
    return { talents, pushTalent }
  },
  render() {
    return (
      <>
        <section class="talents">
          {this.talents.map(talent => 
            <button onClick={this.pushTalent} class="focus:outline-none">{talent.title}</button>
          )}
        </section>
      </>
    )
  }
});

export default defineComponent({
  name: "CharacterCreate",
  setup() {
    const router = useRouter();
    const character = useCharacterStore();

    const state = reactive({
      race: "",
      origin: "",
      class: "",
      name: "",
      description: "",
      breakPoint: "",
      level: 1,
    });

    const error = reactive({
      class: true,
      name: true,
      description: true,
      breakPoint: true,
    });

    const initialMenu = () => {
      router.push("/");
    }

    const goToProfile = () => {
      character.$patch({
        race: state.race,
        origin: state.origin,
        class: state.class,
        name: state.name,
        description: state.description,
        breakPoint: state.breakPoint,
        level: state.level,
        classLevel: 1,
        talents: [],
        equipment: [],
        anotations: []
      })

      router.push("/profile");
    }

    const validateFormulary = () => {
      state.class === "" ? error.class = true : error.class = false
      state.name === "" ? error.name = true : error.name = false
      state.description === "" ? error.description = true : error.description = false
      state.breakPoint === "" ? error.breakPoint = true : error.breakPoint = false

      if(!error.class && !error.name && !error.description && !error.breakPoint) {
        goToProfile()
      }
    }

    const races = JsonFileSync("constants/character/races.json");
    const origins = JsonFileSync("constants/character/origin.json");
    const classes = JsonFileSync("constants/character/class.json");
    const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

    return () => (
      <>
        <main class="character">
          <h1>Ficha de Personagem</h1>
          <span>Crie seu personagem seguindo a ordem recomendada do cenário. Seu personagem irá ficar salvo no sistema para utilização futura.</span>
          <h2>Raça</h2>
          <select vModel={state.race}>
            {races.map((race) => 
              <option value={race.code}>{race.name}</option>
            )}
          </select>
          <h2>Origem</h2>
          <select vModel={state.origin}>
            {origins.map((origin) => 
              <option v-show={!origin.ban_races[state.race]} value={origin.code}>{origin.name}</option>
            )}
          </select>
          <h2>Classes</h2>
          <select vModel={state.class}>
            {classes.map((cl) => {
              return (
                <>
                  <option v-show={((cl.permition.exclusive === state.origin || cl.permition.exclusive === state.race) && !cl.permition.neutral && !(state.origin === "aligned" && state.race === "neutral"))} value={cl.code}>{cl.name}</option>
                </>
              )
            })}
            <option v-show={(state.race === "neutral")} value="psionic">Psiônico</option>
          </select>
          <h2>Nome do Personagem</h2>
          <input vModel={state.name} type="text" />
          <h2>Nível do Personagem</h2>
          <select vModel={state.level}>
            { levels.map(level => <option value={level}>{level}</option>)}
          </select>
          <h2>Descrição do Personagem</h2>
          <textarea 
            vModel={state.description} 
            rows = "8"
          />
          <h2>Ponto de Quebra</h2>
          <textarea 
            vModel={state.breakPoint} 
            rows = "8"
          />
          <h2>Talentos</h2>
          <ItemBox />
          <article>
            <button onClick={initialMenu} class="focus:outline-none">Menu Inicial</button>
            <button onClick={validateFormulary} class="focus:outline-none">Finalizar</button>
          </article>
        </main>
      </>
    )
  }
});
