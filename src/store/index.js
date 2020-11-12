import { defineStore } from "pinia";

export const useDefaultStore = defineStore({
  id: "main",
  state: () => ({
    characters: []
  }),
  getters: {},
  actions: {
    reset() {},
  },
})