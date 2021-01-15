import { defineComponent, ref, reactive } from "vue";
import { useDice } from "@/use/dice";
import "./styles.css";

export default defineComponent({
  setup() {
    const auxState = reactive({
      'd4': 0,
      'd6': 0,
      'd8': 0,
      'd10': 0,
      'd12': 0,
      'd20': 0,
      'd50': 0,
      'd100': 0,
    });

    const auxModifier = reactive({
      'd4': 0,
      'd6': 0,
      'd8': 0,
      'd10': 0,
      'd12': 0,
      'd20': 0,
      'd50': 0,
      'd100': 0,
    });

    const state = reactive({
      'd4': 0,
      'd6': 0,
      'd8': 0,
      'd10': 0,
      'd12': 0,
      'd20': 0,
      'd50': 0,
      'd100': 0,
    });

    const result = ref(0);

    const roll = () => {
      const { RollDice } = useDice();
      state.d4 = RollDice(4, auxState.d4, auxModifier.d4);
      state.d6 = RollDice(6, auxState.d6, auxModifier.d6);
      state.d8 = RollDice(8, auxState.d8, auxModifier.d8);
      state.d10 = RollDice(10, auxState.d10, auxModifier.d10);
      state.d12 = RollDice(12, auxState.d12, auxModifier.d12);
      state.d20 = RollDice(20, auxState.d20, auxModifier.d20);
      state.d50 = RollDice(50, auxState.d50, auxModifier.d50);
      state.d100 = RollDice(100, auxState.d100, auxModifier.d100);
    }

    const reset = () => {
      auxState.d4 = 0;
      auxState.d6 = 0;
      auxState.d8 = 0;
      auxState.d10 = 0;
      auxState.d12 = 0;
      auxState.d20 = 0;
      auxState.d50 = 0;
      auxState.d100 = 0;
      auxModifier.d4 = 0;
      auxModifier.d6 = 0;
      auxModifier.d8 = 0;
      auxModifier.d10 = 0;
      auxModifier.d12 = 0;
      auxModifier.d20 = 0;
      auxModifier.d50 = 0;
      auxModifier.d100 = 0;
    }

    const resultButton = () => {
      roll();
      result.value = state.d4 + state.d6 + state.d8 + state.d10 + state.d12 + state.d20 + state.d50 + state.d100;
      reset();
    }

    return () => (
      <>
        <h1 class="h1-title mb-:3">Rolagem Geral</h1>
        <section class="w-3/4 border rounded p-:1">
          <section class="flex justify-between items-center py-:1 border-b dark:border-default-blueLight border-default-blueDark">
            <h2 class="p-title">Dado</h2>
            <p>Quantidade</p>
            <p class="mr-:5">Modificador</p>
          </section>
          <section class="flex justify-between items-center py-:1">
            <h2 class="p-title flex-1">D4</h2>
            <input type="text" class="input-modal" vModel={[auxState.d4, ['number']]} />
            <input type="text" class="input-modal" vModel={[auxModifier.d4, ['number']]} />
          </section>
          <section class="flex justify-between items-center py-:1">
            <h2 class="p-title flex-1">D6</h2>
            <input type="text" class="input-modal" vModel={[auxState.d6, ['number']]} />
            <input type="text" class="input-modal" vModel={[auxModifier.d6, ['number']]} />
          </section>
          <section class="flex justify-between items-center py-:1">
            <h2 class="p-title flex-1">D8</h2>
            <input type="text" class="input-modal" vModel={[auxState.d8, ['number']]} />
            <input type="text" class="input-modal" vModel={[auxModifier.d8, ['number']]} />
          </section>
          <section class="flex justify-between items-center py-:1">
            <h2 class="p-title flex-1">D10</h2>
            <input type="text" class="input-modal" vModel={[auxState.d10, ['number']]} />
            <input type="text" class="input-modal" vModel={[auxModifier.d10, ['number']]} />
          </section>
          <section class="flex justify-between items-center py-:1">
            <h2 class="p-title flex-1">D12</h2>
            <input type="text" class="input-modal" vModel={[auxState.d12, ['number']]} />
            <input type="text" class="input-modal" vModel={[auxModifier.d12, ['number']]} />
          </section>
          <section class="flex justify-between items-center py-:1">
            <h2 class="p-title flex-1">D20</h2>
            <input type="text" class="input-modal" vModel={[auxState.d20, ['number']]} />
            <input type="text" class="input-modal" vModel={[auxModifier.d20, ['number']]} />
          </section>
          <section class="flex justify-between items-center py-:1">
            <h2 class="p-title flex-1">D50</h2>
            <input type="text" class="input-modal" vModel={[auxState.d50, ['number']]} />
            <input type="text" class="input-modal" vModel={[auxModifier.d50, ['number']]} />
          </section>
          <section class="flex justify-between items-center py-:1">
            <h2 class="p-title flex-1">D100</h2>
            <input type="text" class="input-modal" vModel={[auxState.d100, ['number']]} />
            <input type="text" class="input-modal" vModel={[auxModifier.d100, ['number']]} />
          </section>
          <section class="flex justify-between h-20 items-end">
            <button 
              class="btn-playground" 
              onClick={resultButton}
            >Rolar</button>
            <p class="text-lg">Resultado Final: {result.value}</p>
          </section>
        </section>
      </>
    )


  }
});