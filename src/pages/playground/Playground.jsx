import { defineComponent, ref } from "vue";
import { useDice } from "@/use/dice";
import PlaygroundGeneral from "@/lib/playground/PlaygroundGeneral";

export default defineComponent({
  setup() {
    const { RollDice } = useDice();
    const test = ref(0);

    const roll = () => {
      test.value = RollDice(20, 1, 0);
    }
    
    return () => (
      <>
        <PlaygroundGeneral />
      </>
    )
  }
});