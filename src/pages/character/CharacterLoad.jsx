import { defineComponent } from "vue";
import { PathWrite, JsonFileSync } from "_/services/fs";
import ListLoad from "@/components/load/ListLoad.jsx";

export default defineComponent({
  name: "CharacterLoad",
  setup() {
    PathWrite("canon", JsonFileSync("register/canon.json"));

    return () => (
      <main class="bg-default-white h-screen w-full overflow-y-auto overflow-x-hidden px-:20 pt-bar dark:bg-default-black">
        <h1 class="text-3xl py-:1 my-:1 border-b border-default-black dark:border-default-blueTertiary dark:text-default-blueTertiary">Carregar</h1>
        <p class="font-ralewayMedium my-:2">Por aqui você conseguirá carregar tudo o que foi salvo anteriormente.</p>
        <ListLoad 
          title="Carregar Personagem"
          load="characters" 
        />
        <ListLoad 
          title="Personagens Canônicos"
          load="canon"
          canon={true}
        />
      </main>
    )
  }
})