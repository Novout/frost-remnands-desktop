import { defineComponent, ref, reactive } from "vue";
import { useCharacterStore } from "-/character";
import { useDice } from "@/use/dice";
import { useToast } from "vue-toastification";

export default defineComponent({
  setup() {
    const toast = useToast();
    const result = ref(0);
    const proficiency = reactive({
      attack: true
    });
    const vantage = reactive({
      attack: false
    });

    const character = useCharacterStore();
    const attack = () => {
      result.value = 0;
      let calc = 0;
      const { RollDice } = useDice();
      calc += character.habilityModifier.strength;
      if(proficiency.attack) calc += character.proficiencyBonus;
      if(vantage.attack) {
        let one = RollDice(20);
        let two = RollDice(20);
        console.log(one);
        console.log(two);
        one > two ? result.value = one : result.value = two;
        result.value += calc;
      } else {
        result.value = RollDice(20);
        result.value += calc;
      }

      toast.success("Dado rolado com sucesso!");
    }

    return () => (
      <>
        <section class="flex justify-between items-center py-:1">
          <h2 class="p-title flex-1">Atacar</h2>
          <p class="mx-:1">d20 + Força ({character.habilityModifier.strength}) + {proficiency.attack ? character.proficiencyBonus : 0} = {result.value}</p>
          <section class="flex justify-center items-center mx-:1">
            <label for="vantage">Vantagem</label>
            <input type="checkbox" vModel={vantage.attack} />
          </section>
          <section class="flex justify-center items-center mx-:1">
            <label for="proficiency">Proficiência</label>
            <input type="checkbox" vModel={proficiency.attack} />
          </section>
          <button 
            class="btn-playground"
            onClick={attack}
          >Rolar</button>
        </section>
      </>
    )
  }
})