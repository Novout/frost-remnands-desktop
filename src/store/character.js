import { defineStore } from "pinia";

export const useCharacterStore = defineStore({
  id: "character",
  state: () => ({
    race: "",
    origin: "",
    class: "",
    name: "",
    description: "",
    breakPoint: "",
    level: 1,
    classLevel: 1,
    talents: [],
    equipment: [],
    anotations: []
  }),
  getters: {},
  actions: {
    addNewTalent(talent) {
      console.log(talent)
    },
    reset() {},
  },
})