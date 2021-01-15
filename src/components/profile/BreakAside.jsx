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
        {character.breakPoint ? (<span 
        class="font-ralewayMedium text-base text-default-white dark:text-default-white"
      >{character.breakPoint}</span>) : <p>O ponto de quebra está vazio</p>}
      </>
    )
  }
})