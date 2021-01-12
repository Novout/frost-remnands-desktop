import { defineComponent, ref } from "vue";
import { useDice } from "@/use/dice";

export default defineComponent({
  setup() {
    const { RollDice } = useDice();
    const test = ref(0);

    const roll = () => {
      test.value = RollDice(20, 1, 0);
    }
    
    return () => (
      <>
        <p>{test.value}</p>
        <button onClick={roll}>Click here</button>
      </>
    )
  }
});