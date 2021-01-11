import { defineComponent, computed } from "vue";
import { JsonFileSync } from "_/services/fs";
import { useDefaultStore } from "-/config";

export default defineComponent({
  name: "Home",
  setup() {
    const options = JsonFileSync("constants/pages/home.json");

    const config = useDefaultStore();
    const theme = computed(() => config.base.theme);

    const background = computed(() => {
      return theme.value === "dark" ? "bg-page-dark" : "bg-page-light"
    });

    return () => (
      <>
        <section 
          class="bg-center bg-default-white dark:bg-default-black bg-no-repeat bg-cover h-screen w-full overflow-hidden"
          class={background.value}
        >
          <main class="main flex justify-center items-center flex-col px-:2 bg-none h-medium w-11/12 center">
            <h1 class="font-poppinsBold text-1wh pb-8 xl:pb-40 mb-:5 pointer-events-none text-default-blueDark dark:text-default-blueTertiary">Restos da Geada</h1>
            {options.map(option => 
              <router-link to={option.to} class="flex justify-center font-ralewayMedium dark:text-default-white bg-white-one dark:bg-dark-one border-none py-:2 my-:1 w-8/12 text-lg cursor-pointer no-underline shadow-2xl transition-all duration-200 dark:hover:bg-default-blueLight hover:bg-default-blueLight hover:text-dark-one dark:hover:text-default-black ">{option.title}</router-link>
            )}
          </main>
        </section>
      </>
    )
  }
});
