import { defineComponent, ref, withModifiers } from "vue";
import { useCharacterStore } from "-/character";
import { PathWrite, PathRead } from "_/services/fs";
import { useToggle } from "@/use/toggle";
import { useRouter } from "vue-router";

export default defineComponent({
  props: {
    title: {
      required: true,
      type: String
    },
    load: {
      required: true,
      type: String
    },
    canon: {
      required: false,
      default: false,
      type: Boolean
    }
  },
  setup(props) {
    const list = ref(PathRead(props.load));
    const router = useRouter();

    const remove = (event) => {
      const name = event.target.id;

      const filtered = list.value.filter(char => char.name !== name);

      list.value = filtered;

      PathWrite(props.load, filtered);
    }

    const load = (event) => {
      const character = useCharacterStore();
      const name = event.target.id;
      
      list.value.forEach(char => {
        if(char.name === name) {
          character.$patch(char);
          return;
        }
      })

      router.push("/profile");
    }

    return { 
      ...useToggle(), 
      list, 
      remove, 
      load, 
      canon: props.canon,
      title: props.title 
    }
  },
  render() {
    return (
      <section
        class="p-:1 my-:1 dark:bg-dark-bg bg-white-input"
      >
        <section class="flex justify-between w-full p-:1">
          <h2 class="text-2xl">{this.title}</h2>
          <button 
            class="relative right-0 focus:outline-none text-xl border-none"
            onClick={this.toggleButton}
          >
            {this.toggle && <font-awesome-icon icon={['fas', 'angle-double-down']} size="sm" />}
            {!this.toggle && <font-awesome-icon icon={['fas', 'angle-double-right']} size="lg" />}
          </button>
        </section>
        <section 
          v-show={this.toggle}
        >
          {this.list.map(char => {
            return (
              <article class="flex flex-row justify-start items-center w-full p-:1">
                <h2 
                  class="flex-1 text-xl pointer-events-none text-default-blueDark dark:text-default-blueTertiary dark:hover:text-default-blueTertiaryHover"
                >{char.name}</h2>
                <p class="pointer-events-none">Nível {char.level}</p>
                {!this.canon && 
                  <button
                    id={char.name}
                    class="mx-:1 dark:hover:text-white-oneHover border-none"
                    onClick={withModifiers(this.remove, ['prevent'])}
                  >Excluir</button>}
                <button
                  id={char.name}
                  class="dark:hover:text-white-oneHover ml-:1 border-none"
                  onClick={withModifiers(this.load, ['prevent'])}
                >Carregar</button>
              </article>
            )
          })}
          {this.list.length === 0 && <p class="p-:1">Nenhum Personagem Pessoal para Carregar :(</p>}
        </section>
      </section>
    )
  }
});