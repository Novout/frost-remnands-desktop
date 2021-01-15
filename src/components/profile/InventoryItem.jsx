import { 
  defineComponent,  
} from "vue";
import { useToggle } from "@/use/toggle";
import Inventory from "./inventory/Inventory.jsx";
import "./styles.css";

export default defineComponent({
  setup() {
    const { toggle, toggleButton } = useToggle();

    return () => (
      <>
        <section class="flex flex-col justify-start items-center bg-profile w-full p-:1 ml-:2 mt-:2">
          <section class="flex justify-between w-full">
            <h2 
              class="font-ralewayMedium"
            >Inventário:</h2>
            <button 
              class="item-right-button"
              onClick={toggleButton}
            ><font-awesome-icon icon={['fas', 'angle-double-right']} size="sm" /></button>
          </section>
          {toggle.value && <Inventory toggle={toggle} />}
        </section>
      </>
    )
  }
})