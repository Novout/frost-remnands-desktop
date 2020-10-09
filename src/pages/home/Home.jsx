import { defineComponent, ref, watchEffect } from "vue";
import Test from "@/components/Test.jsx";
import "./styles.css";

export default defineComponent({
  name: "Home",
  components: {
    Test
  },
  setup() {
    const value = ref(0);

    watchEffect(() => {
      console.log(value.value);
    })

    return () => (
      <>
        <main>

        </main>
      </>
    )
  }
});
