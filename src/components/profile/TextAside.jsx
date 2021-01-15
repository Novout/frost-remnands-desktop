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
        {character.description ? (<span 
        class="font-ralewayMedium text-base text-default-white dark:text-default-white"
      >{character.description}</span>) : <p>A descrição está vazia</p>}
      </>
    )
  }
})