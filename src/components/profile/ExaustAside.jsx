import { 
  defineComponent
} from "vue";
import { useCharacterStore } from "-/character";
import "./styles.css";

export default defineComponent({
  setup() {
    const character = useCharacterStore();

    const subTime = () => {
      character.exhaustionTime = character.exhaustionTime - 1;
      character.exhaustion = false;
      if(character.exhaustionTime === 0) {
        character.exhaustion = true;
        character.exhaustionTime = 3;
      }
    }

    return () => (
      <section class="flex justify-between xl:justify-around lg:justify-between md:justify-between sm:justify-between p-:2 w-full h-full">
        <section class="flex flex-col p-:1 justify-center items-center">
          <h2 class="font-ralewayMedium">Exaustão Atual</h2>
          <p>{character.exhaustion ? "Disponível" : "Não-Disponível"}</p>
        </section>
        <section
          class="flex flex-col p-:1 justify-center items-center cursor-pointer"
          onClick={subTime}
        >
          <h2 class="font-ralewayMedium">Tempo de Exaustão</h2>
          <p>{character.exhaustionTime}</p>
        </section>
      </section>
    )
  }
})