import { defineStore } from "pinia";
import { PathRead } from "_/services/fs";

export const useDefaultStore = defineStore({
  id: "config",
  state: () => ({
    base: PathRead("base", {
      theme: "dark"
    }),
    save: {
      characters: []
    }
  }),
  getters: {},
  actions: {
    reset() {},
  },
})