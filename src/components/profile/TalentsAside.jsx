import { 
  defineComponent,  
} from "vue";
import { useCharacterStore } from "-/character";
import "./styles.css";

export default defineComponent({
  setup() {
    const character = useCharacterStore();

    return () => (
      <section class="flex flex-col items-center w-full max-h-60 overflow-y-auto py-:2">
        {character.talents.map(talent => 
          <article class="sm:w-full md:w-full lg:w-4/5 xl:w-2/3 border-2 rounded-sm my-:1 border-default-blueLight dark:border-default-blueTertiary p-:1">
            <h2 class="text-lg mb-:1 border-b dark:text-default-white text-default-black">{talent.title}</h2>
            <p class="font-ralewayMedium mb-:1 dark:text-default-white text-default-black">{talent.description}</p>
            <p class="font-ralewayMedium mb-:1 dark:text-default-white text-default-black">{talent.bonus}</p>
          </article>
        )}
      </section>
    )
  }
})