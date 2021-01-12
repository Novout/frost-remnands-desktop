import { defineStore } from "pinia";
import { PathRead, JsonFileSync } from "_/services/fs";

export const useDefaultStore = defineStore({
  id: "config",
  state: () => ({
    base: PathRead("base", JsonFileSync("config/base.json")),
    save: {
      characters: []
    },
    aux: {
      scroll: false
    }
  }),
  getters: {},
  actions: {
    reset() {},
  },
})