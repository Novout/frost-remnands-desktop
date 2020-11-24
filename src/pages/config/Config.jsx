import { defineComponent, ref, watch } from "vue";
import { useDefaultStore } from "-/config";

export default defineComponent({
  name: "Config",
  setup() {
    const store = useDefaultStore();
    const theme = ref(store.base.theme);

    watch(theme, (theme) => {
      theme === "dark" 
        ? document.querySelector("html").classList.add("dark")
        : document.querySelector("html").classList.remove("dark");

      store.base.theme = theme;
    })

    return () => (
      <section class="pt-8">
        <select vModel={theme.value} class="bg-dark-one dark:bg-default-white dark:text-default-black rounded-lg p-1">
          <option value="light" class="text-default-white dark:text-default-black">Light</option>
          <option value="dark" class="text-default-white dark:text-default-black">Dark</option>
        </select>
        <router-link to="/">Home</router-link>
      </section>
    )
  }
});
