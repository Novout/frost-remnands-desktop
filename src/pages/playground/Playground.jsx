import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import PlaygroundGeneral from "@/components/playground/PlaygroundGeneral.jsx";
import PlaygroundSystem from "@/components/playground/PlaygroundSystem.jsx";

export default defineComponent({
  setup() {
    const router = useRouter();

    const route = () => {
      router.back();
    }

    return () => (
      <>
        <section class="flex flex-col justify-start items-center w-full h-screen overflow-y-auto pt-bar p-:5 bg-white-one dark:bg-dark-bg">
          <PlaygroundGeneral />
          <PlaygroundSystem />
        </section>
        <button 
          class="btn-modal fixed top-0 left-0"
          onClick={route}
        >Voltar</button>
      </>
    )
  }
});