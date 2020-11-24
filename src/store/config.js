import { defineStore } from "pinia";

export const useDefaultStore = defineStore({
  id: "config",
  state: () => ({
    base: {
      theme: "light"
    },
    save: {
      characters: []
    }
  }),
  getters: {},
  actions: {
    reset() {},
  },
})