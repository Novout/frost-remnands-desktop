import { defineComponent, ref, computed, toRefs, watch } from "vue";
import { useCharacterStore } from "-/character";
import { JsonFileSync } from "_/services/fs";

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
    }
  },
  setup(props) {
    const toggle = ref(false);
    const idDefine = ref("");
    const character = useCharacterStore();
    const rarityBackground = computed(() => {
      return ({
        "common": "rarity-common",
        "rare": "rarity-uncommon",
        "epic": "rarity-epic",
        "legendary": "rarity-legendary"
      }[props.rarity]);
    });

    const openItem = (event) => {
      console.log(event.target.id);
      idDefine.value = event.target.id;
      toggle.value = true;
    }

    const closeItem = () => {
      toggle.value = false;
    }

    const addItem = () => {
      const items = JsonFileSync("constants/character/items.json");
      const item = items.filter(item => item.id === idDefine.value);
      character.equipment = [...character.equipment, item[0]];
    }

    return { 
      props, 
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
          class="flex flex-col justify-around items-center h-52 min-w-40 p-:2 mt-:1 bg-opacity-70 cursor-pointer"
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

export default defineComponent({
  props: {
    toggle: {
      required: true,
      type: Object
    }
  },
  setup(props) {
    const { toggle } = toRefs(props);
    const items = JsonFileSync("constants/character/items.json");
    const added = ref(true);
    const itemsFiltered = ref(items);
    const search = ref("");
    const character = useCharacterStore();

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

    watch(search, (search) => {
      const filtered = items.filter(item => { 
        if(search === "") return true;
        return item.title.includes(search) 
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
      switchItem, 
      closeInventory 
    }
  },
  render() {
    return (
      <section class="flex xl:flex-row-reverse lg:flex-col md:flex-col sm:flex-col flex-col full-background pt-bar">
        <main class="flex-1 flex flex-col justify-center items-center w-full px-:2 py-:1 h-full">
          <nav class="flex px-:2 py-:1 justify-around items-start no-underline list-none w-full">
            <li 
              class="cursor-pointer text-default-blueDark dark:text-default-blueTertiary text-lg"
              class={this.searchClass}
              onClick={this.switchItem}
              id="search"
            >Procurar</li>
            <li 
              class="cursor-pointer text-default-blueDark dark:text-default-blueTertiary text-lg"
              class={this.addClass}
              onClick={this.switchItem}
              id="add"
            >Criar</li>
          </nav>
          <section 
            v-show={this.added}
            class="w-full flex-1 h-auto border-2 rounded-lg max-h-full border-default-blueDark dark:border-default-blueTertiary"
          >
            <section class="flex">
              <h2 class="text-default-blueDark dark:text-default-blueTertiary text-lg">Pesquisar:</h2>
              <input 
                vModel={this.search} 
                type="text"
                class="dark:bg-dark-bg bg-white-one text-default-black dark:text-default-white rounded px-:1" 
              />
            </section>
            <section class="flex flex-row xl:flex-wrap lg:flex-nowrap md:flex-nowrap sm:flex-nowrap flex-nowrap justify-start p-:1 h-full overflow-x-auto xl:overflow-y-auto lg:overflow-y-auto md:overflow-y-hidden sm:overflow-y-hidden">
              {this.itemsFiltered.map(({
                id,
                title,
                description,
                rarity,
                bonus,
                additional,
                type,
                typeId
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
                />
              )}
            </section>
          </section>
          <section 
            v-show={!this.added}
            class="w-full flex-1 h-full border-2 rounded-lg border-default-blueDark dark:border-default-blueTertiary"
          >B</section>
        </main>
        <section class="flex-1">
          <p onClick={this.closeInventory}>X</p>
          {this.equipment.map(eq => <p>{eq.title}</p>)}
        </section>
      </section>
    )
  }
})