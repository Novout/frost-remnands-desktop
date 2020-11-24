import { defineStore } from "pinia";
import { JsonFileSync } from "_/services/fs";

export const useDefaultStore = defineStore({
  id: "config",
  state: () => ({
    base: JsonFileSync("config/base.json"),
    save: {
      characters: []
    }
  }),
  getters: {},
  actions: {
    reset() {},
  },
})