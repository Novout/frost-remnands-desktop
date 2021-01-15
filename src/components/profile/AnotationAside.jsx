import { 
  defineComponent,
  ref, 
} from "vue";
import { useToggle } from "@/use/toggle";
import AnotationModal from "./AnotationModal.jsx";
import AnotationDescription from "./AnotationDescription.jsx";
import "./styles.css";

export default defineComponent({
  setup() {
    const { toggle, toggleButton } = useToggle();
    const toggleModal = ref(false);
    const toggleModalButton = () => toggleModal.value = !toggleModal.value;

    return () => (
      <>
        <section class="flex flex-col justify-start items-center w-full bg-profile p-:1 ml-:2 mt-:2">
          <section class="flex justify-between w-full">
            <h2 
              class="flex-1 font-ralewayMedium"
            >Anotações:</h2>
            <button 
              class="item-right-button text-default-white mr-:1" 
              onClick={toggleModalButton}
            >+</button>
            <button 
              class="item-right-button"
              onClick={toggleButton}
            ><font-awesome-icon icon={['fas', 'angle-double-right']} size="sm" /></button>
          </section>
          {toggle.value && <AnotationDescription />}
        </section>
        {toggleModal.value && <AnotationModal toggle={toggleModalButton} />}
      </>
    )
  }
})