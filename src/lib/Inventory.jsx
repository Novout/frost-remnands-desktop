import { 
  defineComponent, 
  ref, 
  reactive, 
  computed, 
  toRefs, 
  withModifiers,
  watch 
} from "vue";
import { useToast } from "vue-toastification";
import { useCharacterStore } from "-/character";
import { useToggle } from "@/use/toggle";
import { JsonFileSync, PathRead, PathWrite } from "_/services/fs";

export const InventoryItemEquipped = defineComponent({
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
      const item = items.filter(item => item.id === idDefine.value);
      character.equipment = character.equipment.filter(equip => item[0].id !== equip.id);
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
          class="flex flex-col justify-around items-center h-44 min-w-40 p-:2 mt-:1 bg-opacity-70 cursor-pointer"
          class={this.rarityBackground}
          id={this.props.id}
          onClick={this.openItem}
        >
          <h2 class="font-ralewayMedium text-default-white dark:text-default-blueLight xl:text-xl lg:text-xl md:text-lg sm:text-base text-base pointer-events-none">{this.title}</h2>
          <p class="font-ralewayMedium text-default-white dark:text-default-blueLight xl:text-lg lg:text-lg md:text-base sm:text-sm text-sm pointer-events-none">{this.bonus}</p>
          <p class="font-ralewayMedium text-default-white dark:text-default-blueLight xl:text-lg lg:text-lg md:text-base sm:text-sm text-sm pointer-events-none">{this.type}</p>
        </article>
      </>
    )
  }
})

export const InventoryItem = defineComponent({
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
      const item = items.filter(item => item.id === idDefine.value);

      const def = item[0];
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
          <h2 class="font-ralewayMedium text-default-white dark:text-default-blueLight xl:text-xl lg:text-xl md:text-lg sm:text-base text-base pointer-events-none">{this.title}</h2>
          <p class="font-ralewayMedium text-default-white dark:text-default-blueLight xl:text-lg lg:text-lg md:text-base sm:text-sm text-sm pointer-events-none">{this.bonus}</p>
          <p class="font-ralewayMedium text-default-white dark:text-default-blueLight xl:text-lg lg:text-lg md:text-base sm:text-sm text-sm pointer-events-none">{this.type}</p>
        </article>
      </>
    )
  }
})

export default defineComponent({
  props: {
    toggle: {
      required: true,
      type: Object
    }
  },
  setup(props) {
    const { toggle } = toRefs(props);
    const items = [...JsonFileSync("constants/character/items.json"), ...PathRead("items")];
    const added = ref(true);
    const itemsFiltered = ref(items);
    const search = ref("");

    const character = useCharacterStore();
    const toast = useToast();
    
    const create = reactive({
      id: "",
      title: "",
      description: "",
      rarity: "",
      bonus: "",
      additional: "",
      type: "",
      idType: [],
      quantity: 1
    });
    
    const createItem = () => {
      const items = PathRead("items");
      PathWrite("items", [...items, create]);
      toast.success("Item criado com sucesso!");
    }

    const closeInventory = () => toggle.value = false;

    const searchClass = computed(() => {
      return added.value ? [
        "border-b-2", 
        "border-default-black", 
        "dark:border-default-white",
        "transition",
        "duration-200",
        "ease-in-out"
      ] : "border-none";
    });

    const addClass = computed(() => {
      return !added.value ? [
        "border-b-2", 
        "border-default-black", 
        "dark:border-default-white",
        "transition",
        "duration-200",
        "ease-in-out"
      ] : "border-none";
    });
    
    const switchItem = (event) => {
      const id = event.target.id;

      added.value = (id === "search");
    }

    watch(search, (_search) => {
      const filtered = items.filter(item => { 
        if(!_search) return true;
        return item.title.includes(_search); 
      })
      itemsFiltered.value = filtered;
    })

    return { 
      equipment: computed(() => character.equipment),
      itemsFiltered,
      added,
      search,
      searchClass, 
      addClass,
      create,
      createItem,
      switchItem, 
      closeInventory,
    }
  },
  render() {
    return (
      <section class="flex xl:flex-row-reverse lg:flex-col md:flex-col sm:flex-col flex-col full-background pt-bar overflow-y-hidden px-:2 py-:1">
        <main class="flex-1 flex flex-col justify-center items-center w-full h-full">
          <nav class="flex px-:2 py-:1 justify-around items-start no-underline list-none w-full">
            <li 
              class="cursor-pointer text-default-blueDark dark:text-default-blueTertiary hover:text-default-blueLight dark:hover:text-default-blueDark text-lg"
              class={this.searchClass}
              onClick={this.switchItem}
              id="search"
            >Procurar</li>
            <li 
              class="cursor-pointer text-default-blueDark dark:text-default-blueTertiary hover:text-default-blueLight dark:hover:text-default-blueDark text-lg"
              class={this.addClass}
              onClick={this.switchItem}
              id="add"
            >Criar</li>
            <li 
              class="cursor-pointer text-default-blueDark dark:text-default-blueTertiary hover:text-default-blueLight dark:hover:text-default-blueDark text-lg"
              onClick={this.closeInventory}
            >Fechar</li>
          </nav>
          <section 
            v-show={this.added}
            class="w-full flex-1 overflow-y-hidden border-2 rounded-lg max-h-full border-default-blueDark dark:border-default-blueTertiary"
          >
            <section class="flex">
              <h2 class="text-default-blueDark dark:text-default-blueTertiary text-lg">Pesquisar:</h2>
              <input 
                vModel={this.search} 
                type="text"
                class="dark:bg-dark-bg bg-white-one text-default-black dark:text-default-white rounded px-:1" 
              />
            </section>
            <section class="flex flex-row xl:flex-wrap lg:flex-nowrap md:flex-nowrap sm:flex-nowrap flex-nowrap p-:1 max-h-full overflow-x-auto xl:overflow-y-auto lg:overflow-y-auto md:overflow-y-hidden sm:overflow-y-hidden">
              {this.itemsFiltered.map(({
                id,
                title,
                description,
                rarity,
                bonus,
                additional,
                type,
                typeId,
                quantity
              }) => 
                <InventoryItem
                  id={id}
                  title={title}
                  description={description}
                  rarity={rarity}
                  bonus={bonus}
                  additional={additional}
                  type={type}
                  typeId={typeId}
                  quantity={quantity}
                />
              )}
            </section>
          </section>
          <section 
            v-show={!this.added}
            class="w-full flex-1 max-h-full border-2 rounded-lg border-default-blueDark dark:border-default-blueTertiary"
          >
            <form
              class="flex flex-row flex-wrap p-:1"
            >
              <section class="form-basic">
                <label>ID</label>
                <input 
                  class="bg-dark-bg"
                  vModel={this.create.id} 
                />
              </section>
              <section class="form-basic">
                <label>Título</label>
                <input 
                  class="bg-dark-bg" 
                  vModel={this.create.title} 
                />
              </section>
              <section class="form-basic">
                <label>Descrição</label>
                <input 
                  class="bg-dark-bg" 
                  vModel={this.create.description} 
                />
              </section>
              <section class="form-basic">
                <label>Raridade</label>
                <input 
                  class="bg-dark-bg" 
                  vModel={this.create.rarity} 
                />
              </section>
              <section class="form-basic">
                <label>Bônus</label>
                <input 
                  class="bg-dark-bg" 
                  vModel={this.create.bonus} 
                />
              </section>
              <section class="form-basic">
                <label>Adicional</label>
                <input 
                  class="bg-dark-bg" 
                  vModel={this.create.additional} 
                />
              </section>
              <section class="form-basic">
                <label>Tipo:</label>
                <input 
                  class="bg-dark-bg" 
                  vModel={this.create.type} 
                />
              </section>
              <section class="form-basic">
                <label>Quantidade:</label>
                <input 
                  class="bg-dark-bg" 
                  vModel={[this.create.quantity, ['number']]} 
                />
              </section>
              <section class="form-basic">
                <button 
                  class="focus:outline-none"
                  onClick={withModifiers(this.createItem, ['prevent'])}
                >Criar Item</button>
              </section>
            </form>
          </section>
        </main>
        <section 
          class="w-full flex-1 max-h-full overflow-y-auto border-2 rounded-lg border-default-blueDark dark:border-default-blueTertiary"
        >
          <section>
            <h2 class="text-xl text-default-blueDark dark:text-default-blueTertiary">Seu Inventário:</h2>
          </section>
          <section class="flex flex-row xl:flex-wrap lg:flex-nowrap md:flex-nowrap sm:flex-nowrap flex-nowrap p-:1 overflow-x-auto xl:overflow-y-auto lg:overflow-y-auto md:overflow-y-hidden sm:overflow-y-hidden">
            {this.equipment.map(({
              id,
              title,
              description,
              rarity,
              bonus,
              additional,
              type,
              typeId,
              quantity
            }) => 
              <InventoryItemEquipped
                id={id}
                title={title}
                description={description}
                rarity={rarity}
                bonus={bonus}
                additional={additional}
                type={type}
                typeId={typeId}
                quantity={quantity}
              />
            )}
          </section>
        </section>
      </section>
    )
  }
})