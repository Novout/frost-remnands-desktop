import { defineComponent, toRefs } from "vue";

export default defineComponent({
  props: {
    toggle: {
      required: true,
      type: String
    }
  },
  setup(props) {
    const { toggle } = toRefs(props);
    const closeInventory = () => toggle.value = false;

    return { closeInventory }
  },
  render() {
    return (
      <section class="flex xl:flex-row-reverse lg:flex-col md:flex-col sm:flex-col flex-col full-background">
        <main class="flex-1 flex justify-center w-full px-:2 py-:1 h-auto">
          <nav class="flex px-:2 py-:1 justify-around items-start no-underline list-none w-full">
            <li class="cursor-pointer text-default-blueDark dark:text-default-blueTertiary text-lg">Procurar</li>
            <li class="cursor-pointer text-default-blueDark dark:text-default-blueTertiary text-lg">Adicionar</li>
          </nav>
        </main>
        <section class="flex-1">
          <p onClick={this.closeInventory}>X</p>
        </section>
      </section>
    )
  }
})