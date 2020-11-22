import { defineComponent } from "vue";
import { JsonFileSync } from "_/services/fs";

const HomeItem = defineComponent({
  setup() {
    const options = JsonFileSync("constants/pages/home.json");

    return () => (
      <>
        <main class="main flex justify-center items-center flex-col px-:2 bg-none h-medium w-11/12 center">
          <p class="font-poppinsBold text-5xl mb-:5 pointer-events-none">Restos da Geada</p>
          {options.map(option => 
            <router-link to={option.to} class="flex justify-center font-ralewayMedium bg-dark-one border-none py-:2 my-:1 w-7/12 text-lg cursor-pointer no-underline shadow-2xl transition-all duration-200 hover:bg-default-blueLight hover:text-default-black ">{option.title}</router-link>
          )}
        </main>
      </>
    )
  }
});

export default defineComponent({
  name: "Home",
  setup() {
    return () => (
      <>
        <section class="bg-home-page bg-center bg-no-repeat bg-cover h-screen w-full overflow-hidden">
          <HomeItem />
        </section>
      </>
    )
  }
});
