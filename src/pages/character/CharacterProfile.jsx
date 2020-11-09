import { defineComponent, computed } from "vue";
import { useCharacterStore } from "@/store/character";
import "./profile.css";

export default defineComponent({
  name: "CharacterProfile",
  setup() {
    const store = useCharacterStore();

    const test = computed(() => store.name);

    return () => (
      <>
        <section class="profile">
          <router-link to="/">AAAA</router-link>
          <p>{test.value}</p>
        </section>
      </>
    )
  }
});
