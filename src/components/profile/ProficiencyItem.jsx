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
        <article class="character-proficiency bg-profile">
          <p 
            class="bg-default-white pointer-events-none py-:1 px-:2 dark:text-default-white text-default-black rounded-full dark:bg-default-black ml-:2"
          >{character.getProficiencyBonus}</p>
          <p 
          class="flex pointer-events-none justify-around items-center font-ralewayMedium"
          >Proficiência</p>
        </article>
      </>
    )
  }
})