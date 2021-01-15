import { 
  defineComponent,  
} from "vue";
import { JsonFileSync } from "_/services/fs";
import { useCharacterStore } from "-/character";
import "./styles.css";


export default defineComponent({
  setup() {
    const character = useCharacterStore();

    const expertises = JsonFileSync("constants/character/expertise.json");

    return () => (
      <>
        {expertises.map((expertise) => {
          return (
            <article class="flex justify-between items-center mt-:1 bg-white-one dark:bg-dark-bg hover:bg-white-oneHover dark:hover:bg-dark-bgHover w-full p-:1">
              <label class="toggle">
                <input 
                  class="input-custom" 
                  type="checkbox"
                  vModel={character.expertises[expertise.code]} 
                />
                <span class="label-custom">
                  <span class="input-text-custom">{expertise.name}</span>
                </span>
              </label>
              <p 
                class="pointer-events-none"
              >
                {(character.habilityModifier[expertise.type] + (character.expertises[expertise.code] ? character.proficiencyBonus : 0))}
              </p>
            </article>
          )
        })}
      </>
    )
  }
})