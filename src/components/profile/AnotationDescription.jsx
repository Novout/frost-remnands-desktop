import { 
  defineComponent, 
} from "vue";
import { useCharacterStore } from "-/character";
import "./styles.css";

export default defineComponent({
  setup() {
    const character = useCharacterStore();

    return () => (
      <>
        <section class="flex flex-col max-h-72 overflow-y-auto w-full p-:2">
          {character.anotations.map(item => (
            <article 
              class="flex my-:1 border-2 border-default-blueDark dark:border-default-blueTertiary flex-col p-:1 justify-between w-full"
            >   
              <h2 
                class="font-ralewayMedium text-default-blueDark dark:text-default-blueTertiary text-lg"
              >{item.title}</h2>
              <span 
                class="font-ralewayMedium text-base w-full"
              >{item.description}</span>
            </article>
          ))}
        </section>
      </>
    )
  }
})