import { defineComponent, ref } from "vue";
import { useCharacterStore } from "-/character";
import { useToast } from "vue-toastification";

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
        <section class="flex w-full min-h-full flex-wrap justify-between py-:2">
          <section class="flex w-2/5 justify-around items-center flex-col pt-:2">
            <section class="flex flex-col justify-between items-center">
              <h2 class="h2-title">Foto</h2>
              <img 
                id="img"
                v-show={character.image}
                class="border-2 border-default-black dark:border-default-white"
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
            </section>
            <button 
              onClick={props.close}
              class="p-:1 mt-:3 w-2/4 rounded-full"
            >Salvar</button>
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
                  <select vModel={character.subrace} class="font-ralewayMedium text-sm w-full p-:1 bg-white-one dark:bg-dark-bgHover text-default-black dark:text-default-white">
                    {multiclass.value.map((cl) => 
                      <option value={cl.code} class="bg-none text-default-black dark:text-default-white">{cl.name}</option>
                    )}
                  </select>
                </section>
                <section class="m-:2 w-full">
                  <h2 class="dark:text-default-blueTertiary text-default-black">Nível da Classe Secundária</h2>
                  <input 
                    vModel={[character.subClassLevel, ['number']]} 
                    type="text"
                    class="font-ralewayMedium text-sm w-full p-:1 bg-white-one dark:bg-dark-bgHover text-default-black dark:text-default-white"
                  />
                </section>
              </>
            )}
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
              <input 
                vModel={[character.hitDice, ['number']]} 
                type="text"
                class="font-ralewayMedium text-sm w-full h-full p-:1 bg-white-one dark:bg-dark-bgHover text-default-black dark:text-default-white"
              />
            </section>
          </section>
        </section>
      </section>
    )
  }
})