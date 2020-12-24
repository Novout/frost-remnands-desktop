import { defineComponent, ref, watch } from "vue";
import { useDefaultStore } from "-/config";
import { JsonWriteFile } from "_/services/fs";
import { useToast } from "vue-toastification";

export default defineComponent({
  name: "Config",
  setup() {
    const toast = useToast();
    const store = useDefaultStore();
    const theme = ref(store.base.theme);

    watch(theme, (theme) => {
      theme === "dark" 
        ? document.querySelector("html").classList.add("dark")
        : document.querySelector("html").classList.remove("dark");

      store.base.theme = theme;

      const msg = theme === "dark" ? "Escuro" : "Claro";

      toast.success(`Tema ${msg} selecionado!`);

      JsonWriteFile("config/base.json", store.base);
    });

    return () => (
      <section class="pt-bar px-:5 bg-default-white dark:bg-default-black h-screen">
        <h1 class="text-3xl my-:2 py-:1 border-b border-default-black dark:border-default-blueLight dark:text-default-blueTertiary text-default-blueDark">Opções</h1>
        <section class="flex items-center">
          <router-link 
            class="border-2 rounded-md border-default-black dark:border-default-white p-:1"
            to="/"
          >Menu Inicial</router-link>
        </section>
        <section class="flex items-center my-:2">
          <h2 class="mr-:2">Tema</h2>
          <select vModel={theme.value} class="rounded-lg p-1">
            <option value="light">Claro</option>
            <option value="dark">Escuro</option>
          </select>
        </section>
      </section>
    )
  }
});
