import { 
  defineComponent, 
  reactive, 
} from "vue";
import { useCharacterStore } from "-/character";
import { useToast } from "vue-toastification";
import "./styles.css";

export default defineComponent({
  props: ["toggle"],
  setup(props) {
    const character = useCharacterStore();
    const toast = useToast();

    const state = reactive({
      title: "",
      description: ""
    });

    const add = () => {
      const item = {
        title: state.title,
        description: state.description
      }

      character.anotations.push(item);

      state.title = "";
      state.description = "";

      toast.success("Anotação criada com sucesso!");
    }

    const remove = (event) => {
      const id = event.target.id;

      const filtered = character.anotations.filter(item => item.title !== id);
      character.anotations = filtered;

      toast.success("Anotação excluida com sucesso!");
    }

    return () => (
      <section class="flex items-center justify-center full-background">
        <section class="h-fully overflow-y-auto p-:2 w-4/5 bg-white-one dark:bg-dark-bg">
          <h1 class="text-2xl text-default-blueDark dark:text-default-blueTertiary border-b border-default-blueDark dark:border-default-blueTertiary mb-:4 pb-:1">Anotações</h1>
          <form class="flex rounded-l-full w-full items-center justify-between h-10">
            <input
              class="flex-1 h-full mr-:1 text-sm rounded-l-full p-:1 text-default-black dark:text-default-white bg-white-oneHover dark:bg-dark-bgHover"
              vModel={state.title}
              placeholder="Digite o título..."
            />
            <input 
              class="flex-1 h-full font-ralewayMedium text-sm w-2/5 p-:1 text-default-black dark:text-default-white bg-white-oneHover dark:bg-dark-bgHover"
              vModel={state.description}
              placeholder="Digite a descrição..."
            />
            <button
              class="p-:1 text-lg focus:outline-none bg-default-white hover:bg-white-one dark:bg-default-black dark:hover:bg-dark-oneHover"
              onClick={add}
            >+</button>
          </form>
          <section class="flex flex-col rounded-l-full w-full items-start">
            {character.anotations.map(item => (
              <article class="border border-default-blueDark dark:border-default-blueTertiary p-:2 my-:2 min-w-full min-h-full">
                <h2 class="text-xl text-default-blueDark dark:text-default-blueTertiary">{item.title}</h2>
                <p class="font-ralewayMedium py-:1">{item.description}</p>
                <button
                  id={item.title}
                  class="w-10 mt-:2 hover:bg-default-red"
                  onClick={remove}
                >-</button>
              </article>
            ))}
          </section>
          <button 
            class="font-ralewayMedium p-:1 mt-:3 text-default-black dark:text-default-white"
            onClick={props.toggle}
          >Fechar</button>
        </section>
      </section>
    )
  }
})
