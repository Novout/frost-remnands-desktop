import { defineComponent, ref } from "vue";
import { useCharacterStore } from "-/character";
import { useToast } from "vue-toastification";
import { JsonFileSync } from "_/services/fs";

export default defineComponent({
  props: {
    toggle: {
      required: true,
      type: Boolean
    },
    close: {
      required: true
    }
  },
  setup(props) {
    const character = useCharacterStore();
    const toast = useToast();

    const races = JsonFileSync("constants/character/races.json");
    const origins = JsonFileSync("constants/character/origin.json");
    const classes = JsonFileSync("constants/character/class.json");

    const multiclass = ref([
      {
        name: "Bárbaro",
        code: "barbarian"
      },
      {
        name: "Conjurador",
        code: "conjurer"
      },
      {
        name: "Inventor",
        code: "inventor"
      },
      {
        name: "Lutador",
        code: "fighter"
      },
    ])

    const uploadImage = (event) => {
      const [image] = event.target.files;

      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = event =>{
        character.image = event.target.result;
      };
      toast.success("Imagem adicionada com sucesso!");
    }

    return () => (
      <section 
        class="generics-background" 
        v-show={props.toggle}
      >
        <h1 class="h1-title">Perfil</h1>
        <section class="flex w-full justify-center flex-wrap">
          <section class="flex h-full w-2/5 items-center flex-col">
            <section class="flex justify-center flex-col items-center">
              <h2 class="h2-title">Foto</h2>
              <img 
                id="img"
                v-show={character.image}
                class="border-2 border-default-blueDark dark:border-default-blueLight"
                src={character.image}
                alt="Imagem do personagem" 
                width="200" 
                height="400"
              />
              <div class="py-:1 bg-white">
                  <div class="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
                      <div class="md:flex">
                          <div class="w-full">
                              <div class="relative border-dotted h-32 rounded-lg border-2 border-blue-700 bg-gray-100 flex justify-center items-center">
                                  <div class="absolute">
                                      <div class="flex flex-col items-center mb-:2"> <font-awesome-icon icon={['fas', 'file-image']} size="3x" /> <span class="block text-gray-400 font-normal">Escolha uma Imagem (200x400)</span> </div>
                                  </div> 
                                  <input class="cursor-pointer w-full h-full" type="file" accept="image/*" onChange={uploadImage} class="opacity-0" name=""  />
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <button 
                onClick={props.close}
                class="p-:1 mt-:3 w-2/4 rounded-full border-2 border-default-blueDark dark:border-default-blueLight"
              >Salvar</button>
            </section>
          </section>
          <section class="flex p-:2 h-2/4 w-2/4 justify-between items-center flex-row flex-wrap">
            <section class="mx-:2 w-full">
              <h2 class="dark:text-default-blueTertiary text-default-black">Nome</h2>
              <input 
                vModel={character.name} 
                type="text"
                class="font-ralewayMedium text-sm w-full p-:1 bg-white-one dark:bg-dark-bgHover text-default-black dark:text-default-white"
              />
            </section>
            <section class="m-:2 w-full">
              <h2 class="dark:text-default-blueTertiary text-default-black">Nível</h2>
              <input 
                vModel={[character.level, ['number']]} 
                type="number"
                class="font-ralewayMedium text-sm w-full p-:1 bg-white-one dark:bg-dark-bgHover text-default-black dark:text-default-white"
              />
            </section>
            <section class="m-:2 w-full">
              <h2 class="dark:text-default-blueTertiary text-default-black">Raça</h2>
              <select vModel={character.race} class="select-modal">
                {races.map((race) => 
                  <option value={race.code} class="bg-none text-default-black dark:text-default-white">{race.name}</option>
                )}
              </select>
            </section>
            <section class="m-:2 w-full">
              <h2 class="dark:text-default-blueTertiary text-default-black">Origem</h2>
              <select vModel={character.origin} class="select-modal">
                {origins.map((origin) => 
                  <option v-show={!origin.ban_races[character.race]} value={origin.code} class="bg-none text-default-black dark:text-default-white">{origin.name}</option>
                )}
              </select>
            </section>
            <section class="m-:2 w-full">
              <h2 class="dark:text-default-blueTertiary text-default-black">Classe</h2>
              <select vModel={character.class} class="select-modal">
                {classes.map((cl) => 
                  <option v-show={((cl.permition.exclusive === character.origin || cl.permition.exclusive === character.race) && !cl.permition.neutral && !(character.origin === "aligned" && character.race === "neutral"))} value={cl.code} class="bg-none text-default-black dark:text-default-white">{cl.name}</option>
                )}
                <option v-show={(character.race === "neutral")} value="psionic" class="bg-none text-default-black dark:text-default-white">Psiônico</option>
              </select>
            </section>
            <section class="m-:2 w-full">
              <h2 class="dark:text-default-blueTertiary text-default-black">Subraça</h2>
              <select vModel={character.subrace} class="font-ralewayMedium text-sm w-full p-:1 bg-white-one dark:bg-dark-bgHover text-default-black dark:text-default-white">
                <option
                  value="test" 
                  class="bg-none text-default-black dark:text-default-white"
                >
                  Test
                </option>
              </select>
            </section>
            <section class="m-:2 w-full">
              <h2 class="dark:text-default-blueTertiary text-default-black">Derivante da Origem</h2>
              <select vModel={character.suborigin} class="font-ralewayMedium text-sm w-full p-:1 bg-white-one dark:bg-dark-bgHover text-default-black dark:text-default-white">
                <option
                  value="test"
                  class="bg-none text-default-black dark:text-default-white"
                >
                  Test
                </option>
              </select>
            </section>
            {character.class === "taught" && (
              <>
                <section class="m-:2 w-full">
                  <h2 class="dark:text-default-blueTertiary text-default-black">Classe Secundária</h2>
                  <select vModel={character.taught.subclass} class="font-ralewayMedium text-sm w-full p-:1 bg-white-one dark:bg-dark-bgHover text-default-black dark:text-default-white">
                    {multiclass.value.map((cl) => 
                      <option value={cl.code} class="bg-none text-default-black dark:text-default-white">{cl.name}</option>
                    )}
                  </select>
                </section>
                <section class="m-:2 w-full">
                  <h2 class="dark:text-default-blueTertiary text-default-black">Nível da Classe Secundária</h2>
                  <input 
                    vModel={[character.taught.subClassLevel, ['number']]} 
                    type="text"
                    class="font-ralewayMedium text-sm w-full p-:1 bg-white-one dark:bg-dark-bgHover text-default-black dark:text-default-white"
                  />
                </section>
              </>
            )}
            <section class="m-:2 w-full">
              <h2 class="dark:text-default-blueTertiary text-default-black">Descrição do Personagem</h2>
              <textarea 
                vModel={character.description} 
                rows = "8"
                class="font-ralewayMedium bg-white-one hover:bg-white-oneHover focus:bg-white-oneHover dark:bg-dark-bgHover text-base border-none w-full my-:1 text-default-black dark:text-default-white"
              />
            </section>
            <section class="m-:2 w-full">
              <h2 class="dark:text-default-blueTertiary text-default-black">Ponto de Quebra</h2>
              <textarea 
                vModel={character.breakPoint} 
                rows = "8"
                class="font-ralewayMedium bg-white-one hover:bg-white-oneHover focus:bg-white-oneHover dark:bg-dark-bgHover text-base border-none w-full my-:1 text-default-black dark:text-default-white"
              />
            </section>
            <section class="m-:2 w-full">
              <h2 class="dark:text-default-blueTertiary text-default-black">Pontos de Vida</h2>
              <input 
                vModel={[character.hitPoints, ['number']]} 
                type="text"
                class="font-ralewayMedium text-sm w-full p-:1 bg-white-one dark:bg-dark-bgHover text-default-black dark:text-default-white"
              />
            </section>
            <section class="m-:2 w-full">
              <h2 class="dark:text-default-blueTertiary text-default-black">Pontos de Vida Máximo</h2>
              <input 
                vModel={[character.maxHitPoints, ['number']]} 
                type="text"
                class="font-ralewayMedium text-sm w-full p-:1 bg-white-one dark:bg-dark-bgHover text-default-black dark:text-default-white"
              />
            </section>
            <section class="m-:2 w-full">
              <h2 class="dark:text-default-blueTertiary text-default-black">Dados de Vida</h2>
              <select 
                vModel={character.hitDice} 
                class="select-modal"
              >
                <option value="4">4</option>
                <option value="6">6</option>
                <option value="8">8</option>
                <option value="10">10</option>
                <option value="12">12</option>
                <option value="20">20</option>
              </select>
            </section>
          </section>
        </section>
      </section>
    )
  }
})