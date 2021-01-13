import { 
  defineComponent, 
  ref, 
  computed, 
  toRefs
} from "vue";
import { useToast } from "vue-toastification";
import { useCharacterStore } from "-/character";
import { JsonFileSync, PathRead } from "_/services/fs";
import { useToggle } from "@/use/toggle";
import { useLocalisation } from "@/use/localisation";
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
      ...toRefs(props), 
      ...useLocalisation(),
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
          <section class="flex flex-col w-3/4 h-fully overflow-y-auto pt-bar p-:5 bg-white-one dark:bg-dark-bg">
            <h1 class="h1-title">Item</h1>
            <p class="inventory-item-text">ID: {this.id}</p>
            <p class="inventory-item-text">Tipo do Item: {this.item(this.typeId)}</p>
            <p class="inventory-item-text">Título: {this.title}</p>
            <p class="inventory-item-text">Descrição: {this.description}</p>
            <p class="inventory-item-text">Raridade: {this.rarityType(this.rarity)}</p>
            <p class="inventory-item-text">Bônus: {this.bonus}</p>
            {this.additional !== "Nenhum" && (<p class="inventory-item-text">Adicional: {this.additional}</p>)}
            <p class="inventory-item-text">Característica: {this.type}</p>
            <p class="inventory-item-text">Quantidade: {this.quantity}</p>
            <button
              class="btn-modal"
              onClick={this.closeItem}
            >Fechar</button>
            <button
              class="btn-modal"
              onClick={this.removeItem}
            >Remover</button>
          </section>
        </section>
        <article 
          class="flex flex-col justify-around items-center min-h-44 min-w-40 p-:2 mt-:1 bg-opacity-70 cursor-pointer"
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