import { 
  defineComponent, 
  ref, 
  computed, 
  toRefs, 
} from "vue";
import { useToast } from "vue-toastification";
import { useCharacterStore } from "-/character";
import { JsonFileSync, PathRead, PathWrite } from "_/services/fs";

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
    const toggle = ref(false);
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

    const closeItem = () => {
      toggle.value = false;
    }

    const addItem = () => {
      const items = [...JsonFileSync("constants/character/items.json"), ...PathRead("items")];
      const [def] = items.filter(item => item.id === idDefine.value);

      def.quantity = props.quantity;
      
      character.equipment = [...character.equipment, def];

      toast.success("Item adicionado com sucesso!");
      
      toggle.value = false;
    }

    return { 
      ...toRefs(props), 
      openItem, 
      closeItem, 
      addItem, 
      toggle, 
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
          <button
            class="px-:2 py-:1 bg-default-black dark:bg-default-white text-default-white dark:text-default-black"
            onClick={this.closeItem}
          >Fechar</button>
          <button
            class="px-:2 py-:1 bg-default-black dark:bg-default-white text-default-white dark:text-default-black"
            onClick={this.addItem}
          >Adicionar no Inventário</button>
        </section>
        <article 
          class="flex flex-1 flex-col justify-around items-center h-44 min-w-40 p-:2 mt-:1 bg-opacity-70 cursor-pointer"
          class={this.rarityBackground}
          id={this.id}
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