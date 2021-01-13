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
import { JsonFileSync, PathRead, PathWrite } from "_/services/fs";
import InventoryItemEquipped from "./InventoryItemEquipped.jsx";
import InventoryItem from "./InventoryItem.jsx";
import "./styles.css";

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
    const filteredItems = ref(items);
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
      });

      filteredItems.value = filtered;
    })

    return { 
      equipment: computed(() => character.equipment),
      filteredItems,
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
      <section class="flex xl:flex-row-reverse lg:flex-col md:flex-col sm:flex-col flex-col generics-background pt-bar overflow-y-hidden p-:3">
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
            class="w-full flex-1 overflow-y-hidden max-h-full"
          >
            <section class="flex items-center h-10">
              <h2 class="h2-title">Pesquisar</h2>
              <input 
                vModel={this.search} 
                type="text"
                class="dark:bg-dark-bg ml-:2 bg-white-one text-default-black dark:text-default-white rounded px-:1" 
              />
            </section>
            <section class="flex flex-row xl:flex-wrap lg:flex-nowrap md:flex-nowrap sm:flex-nowrap flex-nowrap py-:1 max-h-full overflow-x-auto xl:overflow-y-auto lg:overflow-y-auto md:overflow-y-hidden sm:overflow-y-hidden">
              {this.filteredItems.map(({
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
            class="w-full flex-1 max-h-full"
          >
            <form
              class="flex flex-row flex-wrap py-:1"
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
                  class="btn-modal"
                  onClick={withModifiers(this.createItem, ['prevent'])}
                >Criar Item</button>
              </section>
            </form>
          </section>
        </main>
        <section 
          class="w-full flex-1 max-h-full overflow-y-auto"
        >
          <section>
            <h2 class="text-default-blueDark dark:text-default-blueTertiary text-lg">Seu Inventário</h2>
          </section>
          <section class="flex flex-row xl:flex-wrap lg:flex-nowrap md:flex-nowrap sm:flex-nowrap flex-nowrap py-:1 max-h-44 overflow-x-auto xl:overflow-y-auto lg:overflow-y-auto md:overflow-y-hidden sm:overflow-y-hidden">
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