import { 
  defineComponent, 
  ref, 
  computed, 
} from "vue";
import { useToast } from "vue-toastification";
import { useCharacterStore } from "-/character";
import { JsonFileSync, PathRead } from "_/services/fs";
import { useToggle } from "@/use/toggle";
import "./styles.css";

export default defineComponent({
  props: {
    id: {
      required: true
    },
    title: {
      required: true
    },
    description: {
      required: true
    },
    rarity: {
      required: true
    },
    bonus: {
      required: true
    },
    additional: {
      required: false,
      default: "Nenhum"
    },
    type: {
      required: true
    },
    typeId: {
      required: true
    },
    equipped: {
      required: false,
      default: false
    },
    quantity: {
      required: true
    }
  },
  setup(props) {
    const { toggle, close } = useToggle();
    const idDefine = ref("");
    
    const character = useCharacterStore();
    const toast = useToast();

    const rarityBackground = computed(() => {
      return ({
        "common": "rarity-common",
        "rare": "rarity-uncommon",
        "epic": "rarity-epic",
        "legendary": "rarity-legendary"
      }[props.rarity]);
    });

    const openItem = (event) => {
      idDefine.value = event.target.id;
      toggle.value = true;
    }

    const removeItem = () => {
      const items = [...JsonFileSync("constants/character/items.json"), ...PathRead("items")];
      const [item] = items.filter(item => item.id === idDefine.value);
      character.equipment = character.equipment.filter(equip => item.id !== equip.id);
      toast.success("Item removido com sucesso!");
    }

    return { 
      props, 
      openItem, 
      removeItem, 
      toggle, 
      close,
      rarityBackground 
    }
  },
  render() {
    return (
      <>
        <section 
          class="modal-background"
          v-show={this.toggle}
        >
          <section class="w-2/5 h-medium">
            <button
              class="px-:2 py-:1 bg-default-black dark:bg-default-white text-default-white dark:text-default-black"
              onClick={this.close}
            >Fechar</button>
            <button
              class="px-:2 py-:1 bg-default-black dark:bg-default-white text-default-white dark:text-default-black"
              onClick={this.removeItem}
            >Remover do Inventário</button>
          </section>
        </section>
        <article 
          class="flex flex-col justify-around items-center min-h-44 min-w-40 p-:2 mt-:1 bg-opacity-70 cursor-pointer"
          class={this.rarityBackground}
          id={this.props.id}
          onClick={this.openItem}
        >
          <h2 class="inventory-text">{this.title}</h2>
          <p class="inventory-text">{this.bonus}</p>
          <p class="inventory-text">{this.type}</p>
        </article>
      </>
    )
  }
})