import { defineComponent } from "vue";
import { useCharacterStore } from "-/character";

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

    return () => (
      <section 
        class="generics-background" 
        v-show={props.toggle}
      >
        <h1 class="h1-title">Perfil</h1>
        <section class="flex justify-between w-full py-:2">
          <section class="flex-1 mr-:2">
            <h2 class="dark:text-default-blueTertiary text-default-black">Nome</h2>
            <input 
              vModel={character.name} 
              type="text"
              class="font-ralewayMedium text-sm w-full p-:1 bg-white-one dark:bg-dark-bgHover text-default-black dark:text-default-white"
            />
          </section>
          <section class="flex-1 mr-:2">
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
          <section class="flex-1">
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
        </section>
        <section class="flex justify-between w-full py-:2">
          <section class="flex-1 mr-:2">
            <h2 class="dark:text-default-blueTertiary text-default-black">Pontos de Vida</h2>
            <input 
              vModel={[character.hitPoints, ['number']]} 
              type="text"
              class="font-ralewayMedium text-sm w-full p-:1 bg-white-one dark:bg-dark-bgHover text-default-black dark:text-default-white"
            />
          </section>
          <section class="flex-1 mr-:2">
            <h2 class="dark:text-default-blueTertiary text-default-black">Pontos de Vida Máximo</h2>
            <input 
              vModel={[character.maxHitPoints, ['number']]} 
              type="text"
              class="font-ralewayMedium text-sm w-full p-:1 bg-white-one dark:bg-dark-bgHover text-default-black dark:text-default-white"
            />
          </section>
          <section class="flex-1">
            <h2 class="dark:text-default-blueTertiary text-default-black">Dados de Vida</h2>
            <input 
              vModel={[character.hitDice, ['number']]} 
              type="text"
              class="font-ralewayMedium text-sm w-full p-:1 bg-white-one dark:bg-dark-bgHover text-default-black dark:text-default-white"
            />
          </section>
        </section>
        <section class="flex flex-col justify-around items-center bg-default-white dark:bg-dark-bg rounded h-full w-full">
          <button 
            onClick={props.close}
            class="px-:2 py-1 rounded-full"
          >Salvar</button>
        </section>
      </section>
    )
  }
})