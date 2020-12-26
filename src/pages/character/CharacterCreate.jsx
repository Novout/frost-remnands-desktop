import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useCharacterStore } from "-/character";
import { JsonFileSync, PathRead, PathWrite } from "_/services/fs";
import { useToast } from "vue-toastification";

const ItemBox = defineComponent({
  name: "ItemBox",
  setup() {
    const { TOAST } = JsonFileSync("localisation/pt_BR.json");
    const toast = useToast();
    const talents = ref(JsonFileSync("constants/character/talents.json"));
    const toggle = reactive({
      knowledge: false,
      faith: false,
      rage: false,
      unity: false,
      modal: false
    });
    const modal = ref({
      "id": "",
      "title": "",
      "code": "",
      "description": "",
      "requirements": "",
      "bonus": ""
    });
    const talentList = ref([]);

    const character = useCharacterStore();

    const pushTalent = (event) => {
      const id = event.target.id;

      let exists = false;
      talentList.value.forEach(talent => {
        if(talent.id === id) {
          exists = true;
        }
      });
      if(exists) return;

      const talent = talents.value.filter(talent => talent.id === id);
      talentList.value.push(talent[0]);
      character.talents = talentList.value;
      toast.success(TOAST.PROFILE_CREATION_TALENT);
    }

    const removeTalent = (event) => {
      const id = event.target.id;

      let remove = false;
      talentList.value.forEach(talent => {
        if(talent.id === id) remove = true;
      })
      const filtered = talentList.value.filter(talent => talent.id !== id);

      if(remove) toast.success(TOAST.PROFILE_CREATION_TALENT_DELETE);

      talentList.value = filtered;
      character.talents = talentList.value;
    }

    const modalTalents = (event) => {
      const id = event.target.id;

      console.log(id);

      let filtered = talents.value.filter(talent => talent.id === id);
      modal.value = filtered[0];

      toggle.modal = true;
    }

    const closeTalentModal = () => {
      toggle.modal = false;
    }

    const toggleKnowledge = () => { toggle.knowledge = !toggle.knowledge; }
    const toggleFaith = () => { toggle.faith = !toggle.faith; }
    const toggleRage = () => { toggle.rage = !toggle.rage; }
    const toggleUnity = () => { toggle.unity = !toggle.unity; }
    
    return { 
      toggle, 
      talents, 
      talentList,
      modal,
      pushTalent,
      removeTalent,
      modalTalents,
      closeTalentModal,
      toggleKnowledge,
      toggleFaith,
      toggleRage,
      toggleUnity 
    }
  },
  render() {
    return (
      <>
        <section class="modal-background" v-show={this.toggle.modal}>
          <article class="dark:bg-dark-one bg-default-white flex flex-col items-start justify-between w-2/4 h-fully p-:2 overflow-y-auto">
            <h1 class="dark:text-default-blueTertiary text-default-blueDark font-poppinsBold text-xl">{this.modal.title}</h1>
            <section class="flex flex-col">
              <p class="font-poppinsLight text-sm text-default-black dark:text-default-white">Requisitos: {this.modal.requirements}.</p>
              <p class="font-poppinsLight text-sm text-default-black dark:text-default-white">Descrição: {this.modal.description}</p>
            </section>
            <span class="font-poppinsLight mt-:1 text-default-black dark:text-default-white">Bônus: {this.modal.bonus}</span>
            <button 
              class="focus:outline-none text-default-black dark:text-default-white mt-:2 px-:2 py-:1 rounded-full bg-white-oneHover dark:bg-dark-oneHover"
              onClick={this.closeTalentModal}
            >Fechar</button>
          </article>
        </section>
        <section class="py-:2 bg-white-one dark:bg-dark-one">
          <section class="flex flex-col flex-wrap justify-start items-center w-full">
            {/* Conhecimento */}
            <section class="w-full h-auto">
              <h2 class="font-poppinsBold text-default-blueDark dark:text-default-blueLight text-xl mr-auto ml-:2">Talentos Escolhidos:</h2>
            </section>
            <section class="flex flex-row flex-wrap items-center justify-start w-full p-:2">
              {this.talentList.map(talent => <p class="bg-default-blueDark p-:1 mr-:1 rounded-full my-:1 pointer-events-none">{talent.title}</p>)}
            </section>
            <section class="flex flex-row justify-between items-center w-full p-:2">
              <h2 class="font-poppinsBold text-default-blueDark dark:text-default-blueLight text-xl">Conhecimento</h2>
              <button
                onClick={this.toggleKnowledge}
                class="cursor-pointer focus:outline-none text-default-black dark:text-default-white"
              >||</button>
            </section>
            <section 
              class="w-full" 
              v-show={this.toggle.knowledge}
            >
              {this.talents.map(talent => 
                <article 
                  class="flex flex-row flex-nowrap justify-between items-center w-full px-:2 mt-2" 
                  v-show={talent.code === 'knowledge'}
                >
                  <h3 
                    class="flex-1 text-default-black dark:text-default-white hover:text-dark-oneHover dark:hover:text-white-oneHover cursor-pointer"
                    id={talent.id}
                    onClick={this.modalTalents}
                  >{talent.title}</h3>
                  <button 
                    onClick={this.pushTalent}
                    id={talent.id}
                    class="dark:bg-white-one bg-default-black hover:bg-default-blueDark dark:hover:bg-white-oneHover dark:text-default-black px-3 py-1 rounded-full focus:outline-none"
                  >+</button>
                  <button 
                    onClick={this.removeTalent}
                    id={talent.id}
                    class="ml-:1 dark:bg-white-one bg-default-black hover:bg-default-blueDark dark:hover:bg-white-oneHover dark:text-default-black px-3 py-1 rounded-full focus:outline-none"
                  >-</button>
                </article>
              )}
            </section>
            {/* Crença */}
            <section class="flex flex-row justify-between items-center w-full p-:2">
              <h2 class="font-poppinsBold text-default-blueDark dark:text-default-blueLight text-xl">Crença</h2>
              <button
                onClick={this.toggleFaith}
                class="cursor-pointer focus:outline-none text-default-black dark:text-default-white"
              >||</button>
            </section>
            <section 
              class="w-full" 
              v-show={this.toggle.faith}
            >
              {this.talents.map(talent => 
                <article 
                  class="flex flex-row flex-nowrap justify-between items-center w-full px-:2 mt-2" 
                  v-show={talent.code === 'faith'}
                >
                  <h3 
                    class="flex-1 text-default-black dark:text-default-white  hover:text-dark-one dark:hover:text-white-oneHover cursor-pointer"
                    id={talent.id}
                    onClick={this.modalTalents}
                  >{talent.title}</h3>
                  <button 
                    onClick={this.pushTalent}
                    id={talent.id}
                    class="bg-default-black hover:bg-default-blueDark dark:bg-white-one dark:hover:bg-white-oneHover dark:text-default-black px-3 py-1 rounded-full focus:outline-none"
                  >+</button>
                  <button 
                    onClick={this.removeTalent}
                    id={talent.id}
                    class="bg-default-black hover:bg-default-blueDark ml-:1 dark:bg-white-one dark:hover:bg-white-oneHover dark:text-default-black px-3 py-1 rounded-full focus:outline-none"
                  >-</button>
                </article>
              )}
            </section>
            {/* Fúria */}
            <section class="flex flex-row justify-between items-center w-full p-:2">
              <h2 class="font-poppinsBold text-default-blueDark dark:text-default-blueLight text-xl">Fúria</h2>
              <button
                onClick={this.toggleRage}
                class="cursor-pointer focus:outline-none text-default-black dark:text-default-white"
              >||</button>
            </section>
            <section 
              class="w-full" 
              v-show={this.toggle.rage}
            >
              {this.talents.map(talent => 
                <article 
                  class="flex flex-row flex-nowrap justify-between items-center w-full px-:2 mt-2" 
                  v-show={talent.code === 'rage'}
                >
                  <h3 
                    class="flex-1 text-default-black dark:text-default-white  hover:text-dark-one dark:hover:text-white-oneHover cursor-pointer"
                    id={talent.id}
                    onClick={this.modalTalents}
                  >{talent.title}</h3>
                  <button 
                    onClick={this.pushTalent}
                    id={talent.id}
                    class="bg-default-black hover:bg-default-blueDark dark:bg-white-one dark:hover:bg-white-oneHover dark:text-default-black px-3 py-1 rounded-full focus:outline-none"
                  >+</button>
                  <button 
                    onClick={this.removeTalent}
                    id={talent.id}
                    class="bg-default-black hover:bg-default-blueDark ml-:1 dark:bg-white-one dark:hover:bg-white-oneHover dark:text-default-black px-3 py-1 rounded-full focus:outline-none"
                  >-</button>
                </article>
              )}
            </section>
            {/* União */}
            <section class="flex flex-row justify-between items-center w-full p-:2">
              <h2 class="font-poppinsBold text-default-blueDark dark:text-default-blueLight text-xl">União</h2>
              <button
                onClick={this.toggleUnity}
                class="cursor-pointer focus:outline-none text-default-black dark:text-default-white"
              >||</button>
            </section>
            <section 
              class="w-full" 
              v-show={this.toggle.unity}
            >
              {this.talents.map(talent => 
                <article 
                  class="flex flex-row flex-nowrap justify-between items-center w-full px-:2 mt-2" 
                  v-show={talent.code === 'unity'}
                >
                  <h3 
                    class="flex-1 text-default-black dark:text-default-white hover:text-dark-one dark:hover:text-white-oneHover cursor-pointer"
                    id={talent.id}
                    onClick={this.modalTalents}
                  >{talent.title}</h3>
                  <button 
                    onClick={this.pushTalent}
                    id={talent.id}
                    class="bg-default-black hover:bg-default-blueDark dark:bg-white-one dark:hover:bg-white-oneHover dark:text-default-black px-3 py-1 rounded-full focus:outline-none"
                  >+</button>
                  <button 
                    onClick={this.removeTalent}
                    id={talent.id}
                    class="bg-default-black hover:bg-default-blueDark ml-:1 dark:bg-white-one dark:hover:bg-white-oneHover dark:text-default-black px-3 py-1 rounded-full focus:outline-none"
                  >-</button>
                </article>
              )}
            </section>
          </section>
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
    character.$patch({ talents: []});

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
        classDetails: [],
        availableLevelPoints: 27,
        hability: {
          strength: 8,
          dexterity: 8,
          constitution: 8,
          intelligence: 8,
          wisdom: 8,
          charisma: 8
        },
        expertises: {
          athletics: false,
          reaction: false,
          acrobatics: false,
          resilience: false,
          oldworld: false,
          newworld: false,
          investigation: false,
          nature: false,
          faith: false,
          strategy: false,
          misticism: false,
          perception: false,
          piloting: false,
          deception: false,
          intimidation: false,
          performance: false,
          persuasion: false
        },
        proficiencyBonus: 2,
        hitPoints: 0,
        hitDice: 6,
        lastChance: true,
        CA: 10,
        speed: 30,
        initiative: 0,
        exhaustion: true,
        exhaustionTime: 3,
        equipment: [],
        anotations: []
      };

      character.$patch(item);

      try {
        const save = PathRead("characters");
        PathWrite("characters", [...save, character.$state]);
        router.push("/profile");
      } catch(error) {
        console.log(error);
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
        <main class=" bg-default-white h-full overflow-y-auto overflow-x-hidden sm:px-:20 md:px-:20 lg:px-:30 xl:px-:50 pt-bar dark:bg-default-black">
          <h1 class="pt-:2 mb-:1 pb-:1 border-b-2 border-default-blueDark dark:border-default-blueTertiary py-16 text-3xl pointer-events-none text-default-blueDark dark:text-default-blueTertiary">Ficha de Personagem</h1>
          <span class="text-xl font-ralewayTiny my-:5 pointer-events-none text-default-black dark:text-default-white">Crie seu personagem seguindo a ordem recomendada do cenário. Seu personagem irá ficar salvo no sistema para utilização futura.</span>
          <h2 class="py-:1 mt-5 border-default-black dark:border-default-white border-b-2 text-xl pointer-events-none text-default-black dark:text-default-white">Raça</h2>
          <select vModel={state.race} class="dark:bg-dark-input bg-white-input hover:bg-white-inputHover p-:1 border-none rounded-lg my-:2 w-full cursor-pointer dark:hover:bg-dark-oneHover text-default-black dark:text-default-white">
            {races.map((race) => 
              <option value={race.code} class="bg-none text-default-black dark:text-default-white">{race.name}</option>
            )}
          </select>
          <h2 class="py-:1 mt-5 border-default-black dark:border-default-white border-b-2 text-xl pointer-events-none text-default-black dark:text-default-white">Origem</h2>
          <select vModel={state.origin} class="dark:bg-dark-input bg-white-input hover:bg-white-inputHover p-:1 border-none rounded-lg my-:2 w-full cursor-pointer dark:hover:bg-dark-oneHover text-default-black dark:text-default-white">
            {origins.map((origin) => 
              <option v-show={!origin.ban_races[state.race]} value={origin.code} class="bg-none text-default-black dark:text-default-white">{origin.name}</option>
            )}
          </select>
          <h2 class="py-:1 mt-5 border-default-black dark:border-default-white border-b-2 text-xl pointer-events-none text-default-black dark:text-default-white">Classes</h2>
          <select vModel={state.class} class="dark:bg-dark-input bg-white-input hover:bg-white-inputHover p-:1 border-none rounded-lg my-:2 w-full cursor-pointer dark:hover:bg-dark-oneHover text-default-black dark:text-default-white">
            {classes.map((cl) => 
              <option v-show={((cl.permition.exclusive === state.origin || cl.permition.exclusive === state.race) && !cl.permition.neutral && !(state.origin === "aligned" && state.race === "neutral"))} value={cl.code} class="bg-none text-default-black dark:text-default-white">{cl.name}</option>
            )}
            <option v-show={(state.race === "neutral")} value="psionic" class="bg-none text-default-black dark:text-default-white">Psiônico</option>
          </select>
          <h2 class="py-:1 mt-5 border-default-black dark:border-default-white border-b-2 text-xl pointer-events-none text-default-black dark:text-default-white">Nome do Personagem</h2>
          <input vModel={state.name} type="text" class="bg-white-one dark:bg-dark-one hover:bg-white-oneHover dark:hover:bg-dark-oneHover py-:1 border-none rounded-lg my-:2 w-full text-default-black dark:text-default-white " />
          <h2 class="py-:1 mt-5 border-default-black dark:border-default-white border-b-2 text-xl pointer-events-none text-default-black dark:text-default-white">Nível do Personagem</h2>
          <select vModel={state.level} class="dark:bg-dark-input bg-white-input hover:bg-white-inputHover p-:1 border-none rounded-lg my-:2 w-full cursor-pointer dark:hover:bg-dark-oneHover text-default-black dark:text-default-white">
            {levels.map((level) => <option value={level} class="text-default-black dark:text-default-white">{level}</option>)}
          </select>
          <h2 class="py-:1 mt-5 border-default-black dark:border-default-white border-b-2 text-xl pointer-events-none text-default-black dark:text-default-white">Descrição do Personagem</h2>
          <textarea 
            vModel={state.description} 
            rows = "8"
            class="font-ralewayMedium bg-white-one hover:bg-white-oneHover dark:bg-dark-one dark:hover:bg-dark-oneHover text-base border-none w-full my-:2 text-default-black dark:text-default-white"
          />
          <h2 class="py-:1 mt-5 border-default-black dark:border-default-white border-b-2 text-xl pointer-events-none text-default-black dark:text-default-white">Ponto de Quebra</h2>
          <textarea 
            vModel={state.breakPoint} 
            rows = "8"
            class="font-ralewayMedium bg-white-one hover:bg-white-oneHover dark:bg-dark-one dark:hover:bg-dark-oneHover text-base border-none w-full my-:2 text-default-black dark:text-default-white"
          />
          <h2 class="py-:1 mt-5 border-default-black dark:border-default-white border-b-2 text-xl pointer-events-none text-default-black dark:text-default-white">Talentos</h2>
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
