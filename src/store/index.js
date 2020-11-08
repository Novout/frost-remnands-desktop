import { defineStore } from "pinia";

export const useDefaultStore = defineStore({
  id: "character",
  state: () => ({
    characters: []
  }),
  getters: {},
  actions: {
    reset() {},
  },
})