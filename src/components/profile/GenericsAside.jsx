import { 
  defineComponent,  
} from "vue";
import { JsonFileSync } from "_/services/fs";
import { useCharacterStore } from "-/character";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useSave } from "@/use/save";
import "./styles.css";

export default defineComponent({
  setup() {
    const { saveCharacter } = useSave();
    const router = useRouter();
    const toast = useToast();

    const save = () => {
      const canon = JsonFileSync("constants/character/canon.json");
      const character = useCharacterStore();
        
      if(!canon.includes(character.name)) {
        saveCharacter();
        toast.success("Personagem salvo com sucesso!");
      } else {
        toast.error("Não é possível salvar um Personagem Relevante.");
      }
    }

    const initialMenu = () => {
      router.push("/");
    }

    const playground = () => {
      router.push("/playground");
    }

    return () => (
      <section
        class="flex flex-row sm:justify-between md:justify-between lg:justify-around xl:justify-around items-center w-full bg-profile p-:1 ml-:2 mb-:2"
      >
        <button
          class="p-:1 border rounded-md dark:border-default-white border-default-black"
          onClick={initialMenu}
        >Menu Inicial</button>
        <button
          class="p-:1 border rounded-md dark:border-default-white border-default-black"
          onClick={playground}
        >Playground</button>
        <button
          class="p-:1 border rounded-md dark:border-default-white border-default-black"
          onClick={save}
        >Salvar Personagem</button>
      </section>
    )
  }
})