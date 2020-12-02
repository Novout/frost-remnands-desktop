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

      // router reload page in write file, remove with vue-router fix.
      setTimeout(() => {
        JsonWriteFile("config/base.json", store.base);
      }, 1000);
    });

    return () => (
      <section class="pt-8 bg-default-white dark:bg-default-black h-screen">
        <select vModel={theme.value} class="bg-dark-one dark:bg-default-white dark:text-default-black rounded-lg p-1">
          <option value="light" class="text-default-white dark:text-default-black">Claro</option>
          <option value="dark" class="text-default-white dark:text-default-black">Escuro</option>
        </select>
      </section>
    )
  }
});
