import { defineComponent } from "vue";
import { useCharacterStore } from "-/character";
import AttackRoll from "./roll/AttackRoll.jsx";
import ShootRoll from "./roll/ShootRoll.jsx";
import "./styles.css";

export default defineComponent({
  setup() {
    const character = useCharacterStore();
    return () => (
      <>
        <h1 class="h1-title">Rolagem Específica</h1>
        <section class="border w-11/12 rounded p-:1 mt-:3">
          <AttackRoll />
          {character.class === "shooter" && <ShootRoll />}
        </section>
      </>
    )
  }
});