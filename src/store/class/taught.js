import { defineStore } from "pinia";

export const useTaughtStore = defineStore({
  id: "config",
  state: () => ({
    subclass: "",
    subClassLevel: 0,
  }),
  getters: {},
  actions: {
    reset() {},
  },
})