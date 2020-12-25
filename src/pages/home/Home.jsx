import { defineComponent } from "vue";
import { JsonFileSync } from "_/services/fs";

export default defineComponent({
  name: "Home",
  setup() {
    const options = JsonFileSync("constants/pages/home.json");

    return () => (
      <>
        <section class="bg-default-white dark:bg-dark-one bg-center bg-no-repeat bg-cover h-screen w-full overflow-hidden">
          <main class="main flex justify-center items-center flex-col px-:2 bg-none h-medium w-11/12 center">
            <h1 class="font-poppinsBold text-1wh pb-8 xl:pb-40 mb-:5 pointer-events-none text-default-black dark:text-default-white">Restos da Geada</h1>
            {options.map(option => 
              <router-link to={option.to} class="flex justify-center text-default-white font-ralewayMedium bg-dark-one dark:bg-white-one border-none py-:2 my-:1 w-8/12 text-lg cursor-pointer no-underline shadow-2xl transition-all duration-200 dark:text-default-black dark:hover:bg-default-blueLight hover:bg-default-blueLight hover:text-dark-one dark:hover:text-default-black ">{option.title}</router-link>
            )}
          </main>
        </section>
      </>
    )
  }
});
