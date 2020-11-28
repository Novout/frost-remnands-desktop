import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useCharacterStore } from "-/character";
import { JsonFileSync, JsonWriteFile } from "_/services/fs";
import { useToast } from "vue-toastification";

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
        <section class="flex flex-row flex-wrap justify-start items-center py-:2 bg-white-one dark:bg-dark-one">
          {this.talents.map(talent => 
            <button onClick={this.pushTalent} class="focus:outline-none p-:2 flex-1 hover:bg-white-oneHover dark:hover:bg-dark-oneHover">{talent.title}</button>
          )}
        </section>
      </>
    )
  }
});

export default defineComponent({
  name: "CharacterCreate",
  setup() {
    const toast = useToast();
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
      const item = {
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
      };

      character.$patch(item);

      try {
        const save = JsonFileSync("register/characters.json");
        save.push(item);
        JsonWriteFile("register/characters.json", [...save, item]);
        router.push("/profile");
      } catch(error) {
        toast.error("Ocorreu um erro ao salvar o personagem :(");
      }
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
    const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return () => (
      <>
        <main class=" bg-default-white h-full overflow-y-auto overflow-x-hidden px-:20 pt-bar dark:bg-default-black">
          <h1 class="pt-:2 pb-:1 border-b-2 border-default-black dark:border-default-white py-16 text-3xl pointer-events-none text-default-black dark:text-default-white">Ficha de Personagem</h1>
          <span class="font-ralewayMedium text-xl my-:5 pointer-events-none">Crie seu personagem seguindo a ordem recomendada do cenário. Seu personagem irá ficar salvo no sistema para utilização futura.</span>
          <h2 class="py-:1 mt-5 border-default-black dark:border-default-white border-b-2 text-xl pointer-events-none">Raça</h2>
          <select vModel={state.race} class="dark:bg-dark-input bg-default-white p-:1 border-none rounded-lg my-:2 w-full cursor-pointer hover:bg-white-oneHover dark:hover:bg-dark-oneHover">
            {races.map((race) => 
              <option value={race.code} class="bg-none">{race.name}</option>
            )}
          </select>
          <h2 class="py-:1 mt-5 border-default-black dark:border-default-white border-b-2 text-xl pointer-events-none">Origem</h2>
          <select vModel={state.origin} class="dark:bg-dark-input bg-default-white p-:1 border-none rounded-lg my-:2 w-full cursor-pointer hover:bg-white-oneHover dark:hover:bg-dark-oneHover">
            {origins.map((origin) => 
              <option v-show={!origin.ban_races[state.race]} value={origin.code} class="bg-none">{origin.name}</option>
            )}
          </select>
          <h2 class="py-:1 mt-5 border-default-black dark:border-default-white border-b-2 text-xl pointer-events-none">Classes</h2>
          <select vModel={state.class} class="dark:bg-dark-input bg-default-white p-:1 border-none rounded-lg my-:2 w-full cursor-pointer hover:bg-white-oneHover dark:hover:bg-dark-oneHover">
            {classes.map((cl) => 
              <option v-show={((cl.permition.exclusive === state.origin || cl.permition.exclusive === state.race) && !cl.permition.neutral && !(state.origin === "aligned" && state.race === "neutral"))} value={cl.code} class="bg-none">{cl.name}</option>
            )}
            <option v-show={(state.race === "neutral")} value="psionic" class="bg-none">Psiônico</option>
          </select>
          <h2 class="py-:1 mt-5 border-default-black dark:border-default-white border-b-2 text-xl pointer-events-none">Nome do Personagem</h2>
          <input vModel={state.name} type="text" class="bg-white-one dark:bg-dark-one hover:bg-white-oneHover dark:hover:bg-dark-oneHover py-:1 border-none rounded-lg my-:2 w-full" />
          <h2 class="py-:1 mt-5 border-default-black dark:border-default-white border-b-2 text-xl pointer-events-none">Nível do Personagem</h2>
          <select vModel={state.level} class="dark:bg-dark-input bg-default-white p-:1 border-none rounded-lg my-:2 w-full cursor-pointer hover:bg-white-oneHover dark:hover:bg-dark-oneHover">
            {levels.map((level) => <option value={level}>{level}</option>)}
          </select>
          <h2 class="py-:1 mt-5 border-default-black dark:border-default-white border-b-2 text-xl pointer-events-none">Descrição do Personagem</h2>
          <textarea 
            vModel={state.description} 
            rows = "8"
            class="font-ralewayMedium bg-white-one hover:bg-white-oneHover dark:bg-dark-one dark:hover:bg-dark-oneHover text-base border-none w-full my-:2"
          />
          <h2 class="py-:1 mt-5 border-default-black dark:border-default-white border-b-2 text-xl pointer-events-none">Ponto de Quebra</h2>
          <textarea 
            vModel={state.breakPoint} 
            rows = "8"
            class="font-ralewayMedium bg-white-one hover:bg-white-oneHover dark:bg-dark-one dark:hover:bg-dark-oneHover text-base border-none w-full my-:2"
          />
          <h2 class="py-:1 mt-5 border-default-black dark:border-default-white border-b-2 text-xl pointer-events-none">Talentos</h2>
          <ItemBox />
          <article class="flex flex-row w-full justify-end">
            <button onClick={initialMenu} class="focus:outline-none dark:bg-default-white bg-default-black py-:1 px-:2 my-:2 mx-:2 dark:text-default-black text-default-white border-none cursor-pointer">Menu Inicial</button>
            <button onClick={validateFormulary} class="focus:outline-none dark:bg-default-white bg-default-black py-:1 px-:2 my-:2 dark:text-default-black text-default-white border-none cursor-pointer">Finalizar</button>
          </article>
        </main>
      </>
    )
  }
});
