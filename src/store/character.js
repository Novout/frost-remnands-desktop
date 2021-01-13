import { defineStore } from "pinia";

export const useCharacterStore = defineStore({
  id: "character",
  state: () => ({
    image: undefined,
    race: "nekro",
    subrace: "",
    origin: "rouanir",
    suborigin: "",
    class: "taught",
    name: "_template",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    breakPoint: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    level: 20,
    classLevel: 20,
    classDetails: [],
    availableLevelPoints: 27,
    hability: {
      strength: 8,
      dexterity: 8,
      constitution: 8,
      intelligence: 8,
      wisdom: 8,
      charisma: 8
    },
    habilityModifier: {
      strength: -1,
      dexterity: -1,
      constitution: -1,
      intelligence: -1,
      wisdom: -1,
      charisma: -1
    },
    expertises: {
      athletics: false,
      acrobatics: false,
      resilience: false,
      prestidigitation: false,
      efrium: false,
      oldworld: false,
      newworld: false,
      investigation: false,
      nature: false,
      faith: false,
      strategy: false,
      intuition: false,
      perception: false,
      piloting: false,
      deception: false,
      intimidation: false,
      performance: false,
      persuasion: false
    },
    proficiencyBonus: 2,
    maxHitPoints: 0,
    hitPoints: 0,
    hitDice: 6,
    lastChance: true,
    CA: 10,
    speed: 30,
    initiative: 0,
    exhaustion: true,
    exhaustionTime: 3,
    efrium: 20,
    baseResource: 50,
    talents: [],
    equipment: [],
    anotations: []
  }),
  getters: {
    getCharacterClass() {
      return ({
        "shooter": "Atirador",
        "taught": "Autodidata",
        "barbarian": "Bárbaro",
        "bard": "Bardo",
        "witcher": "Bruxo",
        "conjurer": "Conjurador",
        "corrupt": "Corrupto",
        "inventor": "Inventor",
        "fighter": "Lutador",
        "monk": "Monge",
        "necromancer": "Necromante",
        "psionic": "Psiônico"
      }[this.class]);
    },
    getProficiencyBonus() {
      let proficiency = 0;

      if(this.level >= 1 && this.level <= 4) proficiency = 2;
      if(this.level >= 5 && this.level <= 8) proficiency = 3;
      if(this.level >= 9 && this.level <= 12) proficiency = 4;
      if(this.level >= 13 && this.level <= 16) proficiency = 5;
      if(this.level >= 17 && this.level <= 20) proficiency = 6;
      if(this.origin === "rouanir") proficiency += 1;

      this.proficiencyBonus = proficiency;

      return proficiency;
    },
    getRaceName() {
      return ({
        "nekro": "Nekro",
        "tiudren": "Tiudren",
        "asserkarus": "Asserkarus",
        "phortem": "Phortem",
        "neutral": "Raça Neutra"
      }[this.race]);
    },
    getOriginName() {
      return ({
        "aligned": "Não-Alinhado",
        "rouanir": "Complexo de Rounir",
        "yayr": "Yayr",
        "gyni": "Gyni",
        "frederitch": "Frederitch",
        "agoni": "Agoni",
        "pacyentesn": "Império de Pacyentesn"
      }[this.origin]);
    },
    strengthModifier() {
      let quantity = 0;

      if(this.hability.strength === 1) quantity = -5;
      if(this.hability.strength === 2 || this.hability.strength === 3) quantity = -4;
      if(this.hability.strength === 4 || this.hability.strength === 5) quantity = -3;
      if(this.hability.strength === 6 || this.hability.strength === 7) quantity = -2;
      if(this.hability.strength === 8 || this.hability.strength === 9) quantity = -1;
      if(this.hability.strength === 10 || this.hability.strength === 11) quantity = 0;
      if(this.hability.strength === 12 || this.hability.strength === 13) quantity = 1;
      if(this.hability.strength === 14 || this.hability.strength === 15) quantity = 2;
      if(this.hability.strength === 16 || this.hability.strength === 17) quantity = 3;
      if(this.hability.strength === 18 || this.hability.strength === 19) quantity = 4;
      if(this.hability.strength === 20 || this.hability.strength === 21) quantity = 5;
      if(this.hability.strength === 22 || this.hability.strength === 23) quantity = 6;
      if(this.hability.strength === 24 || this.hability.strength === 25) quantity = 7;
      if(this.hability.strength === 26 || this.hability.strength === 27) quantity = 8;
      if(this.hability.strength === 28 || this.hability.strength === 29) quantity = 9;
      if(this.hability.strength >= 30) quantity = 10;

      this.habilityModifier.strength = quantity;

      return quantity;
    },
    dexterityModifier() {
      let quantity = 0;

      if(this.hability.dexterity === 1) quantity = -5;
      if(this.hability.dexterity === 2 || this.hability.dexterity === 3) quantity = -4;
      if(this.hability.dexterity === 4 || this.hability.dexterity === 5) quantity = -3;
      if(this.hability.dexterity === 6 || this.hability.dexterity === 7) quantity = -2;
      if(this.hability.dexterity === 8 || this.hability.dexterity === 9) quantity = -1;
      if(this.hability.dexterity === 10 || this.hability.dexterity === 11) quantity = 0;
      if(this.hability.dexterity === 12 || this.hability.dexterity === 13) quantity = 1;
      if(this.hability.dexterity === 14 || this.hability.dexterity === 15) quantity = 2;
      if(this.hability.dexterity === 16 || this.hability.dexterity === 17) quantity = 3;
      if(this.hability.dexterity === 18 || this.hability.dexterity === 19) quantity = 4;
      if(this.hability.dexterity === 20 || this.hability.dexterity === 21) quantity = 5;
      if(this.hability.dexterity === 22 || this.hability.dexterity === 23) quantity = 6;
      if(this.hability.dexterity === 24 || this.hability.dexterity === 25) quantity = 7;
      if(this.hability.dexterity === 26 || this.hability.dexterity === 27) quantity = 8;
      if(this.hability.dexterity === 28 || this.hability.dexterity === 29) quantity = 9;
      if(this.hability.dexterity >= 30) quantity = 10;

      this.habilityModifier.dexterity = quantity;

      return quantity;
    },
    constitutionModifier() {
      let quantity = 0;

      if(this.hability.constitution === 1) quantity = -5;
      if(this.hability.constitution === 2 || this.hability.constitution === 3) quantity = -4;
      if(this.hability.constitution === 4 || this.hability.constitution === 5) quantity = -3;
      if(this.hability.constitution === 6 || this.hability.constitution === 7) quantity = -2;
      if(this.hability.constitution === 8 || this.hability.constitution === 9) quantity = -1;
      if(this.hability.constitution === 10 || this.hability.constitution === 11) quantity = 0;
      if(this.hability.constitution === 12 || this.hability.constitution === 13) quantity = 1;
      if(this.hability.constitution === 14 || this.hability.constitution === 15) quantity = 2;
      if(this.hability.constitution === 16 || this.hability.constitution === 17) quantity = 3;
      if(this.hability.constitution === 18 || this.hability.constitution === 19) quantity = 4;
      if(this.hability.constitution === 20 || this.hability.constitution === 21) quantity = 5;
      if(this.hability.constitution === 22 || this.hability.constitution === 23) quantity = 6;
      if(this.hability.constitution === 24 || this.hability.constitution === 25) quantity = 7;
      if(this.hability.constitution === 26 || this.hability.constitution === 27) quantity = 8;
      if(this.hability.constitution === 28 || this.hability.constitution === 29) quantity = 9;
      if(this.hability.constitution >= 30) quantity = 10;

      this.habilityModifier.constitution = quantity;

      return quantity;
    },
    intelligenceModifier() {
      let quantity = 0;

      if(this.hability.intelligence === 1) quantity = -5;
      if(this.hability.intelligence === 2 || this.hability.intelligence === 3) quantity = -4;
      if(this.hability.intelligence === 4 || this.hability.intelligence === 5) quantity = -3;
      if(this.hability.intelligence === 6 || this.hability.intelligence === 7) quantity = -2;
      if(this.hability.intelligence === 8 || this.hability.intelligence === 9) quantity = -1;
      if(this.hability.intelligence === 10 || this.hability.intelligence === 11) quantity = 0;
      if(this.hability.intelligence === 12 || this.hability.intelligence === 13) quantity = 1;
      if(this.hability.intelligence === 14 || this.hability.intelligence === 15) quantity = 2;
      if(this.hability.intelligence === 16 || this.hability.intelligence === 17) quantity = 3;
      if(this.hability.intelligence === 18 || this.hability.intelligence === 19) quantity = 4;
      if(this.hability.intelligence === 20 || this.hability.intelligence === 21) quantity = 5;
      if(this.hability.intelligence === 22 || this.hability.intelligence === 23) quantity = 6;
      if(this.hability.intelligence === 24 || this.hability.intelligence === 25) quantity = 7;
      if(this.hability.intelligence === 26 || this.hability.intelligence === 27) quantity = 8;
      if(this.hability.intelligence === 28 || this.hability.intelligence === 29) quantity = 9;
      if(this.hability.intelligence >= 30) quantity = 10;

      this.habilityModifier.intelligence = quantity;

      return quantity;
    },
    wisdomModifier() {
      let quantity = 0;

      if(this.hability.wisdom === 1) quantity = -5;
      if(this.hability.wisdom === 2 || this.hability.wisdom === 3) quantity = -4;
      if(this.hability.wisdom === 4 || this.hability.wisdom === 5) quantity = -3;
      if(this.hability.wisdom === 6 || this.hability.wisdom === 7) quantity = -2;
      if(this.hability.wisdom === 8 || this.hability.wisdom === 9) quantity = -1;
      if(this.hability.wisdom === 10 || this.hability.wisdom === 11) quantity = 0;
      if(this.hability.wisdom === 12 || this.hability.wisdom === 13) quantity = 1;
      if(this.hability.wisdom === 14 || this.hability.wisdom === 15) quantity = 2;
      if(this.hability.wisdom === 16 || this.hability.wisdom === 17) quantity = 3;
      if(this.hability.wisdom === 18 || this.hability.wisdom === 19) quantity = 4;
      if(this.hability.wisdom === 20 || this.hability.wisdom === 21) quantity = 5;
      if(this.hability.wisdom === 22 || this.hability.wisdom === 23) quantity = 6;
      if(this.hability.wisdom === 24 || this.hability.wisdom === 25) quantity = 7;
      if(this.hability.wisdom === 26 || this.hability.wisdom === 27) quantity = 8;
      if(this.hability.wisdom === 28 || this.hability.wisdom === 29) quantity = 9;
      if(this.hability.wisdom >= 30) quantity = 10;

      this.habilityModifier.wisdom = quantity;

      return quantity;
    },
    charismaModifier() {
      let quantity = 0;

      if(this.hability.charisma === 1) quantity = -5;
      if(this.hability.charisma === 2 || this.hability.charisma === 3) quantity = -4;
      if(this.hability.charisma === 4 || this.hability.charisma === 5) quantity = -3;
      if(this.hability.charisma === 6 || this.hability.charisma === 7) quantity = -2;
      if(this.hability.charisma === 8 || this.hability.charisma === 9) quantity = -1;
      if(this.hability.charisma === 10 || this.hability.charisma === 11) quantity = 0;
      if(this.hability.charisma === 12 || this.hability.charisma === 13) quantity = 1;
      if(this.hability.charisma === 14 || this.hability.charisma === 15) quantity = 2;
      if(this.hability.charisma === 16 || this.hability.charisma === 17) quantity = 3;
      if(this.hability.charisma === 18 || this.hability.charisma === 19) quantity = 4;
      if(this.hability.charisma === 20 || this.hability.charisma === 21) quantity = 5;
      if(this.hability.charisma === 22 || this.hability.charisma === 23) quantity = 6;
      if(this.hability.charisma === 24 || this.hability.charisma === 25) quantity = 7;
      if(this.hability.charisma === 26 || this.hability.charisma === 27) quantity = 8;
      if(this.hability.charisma === 28 || this.hability.charisma === 29) quantity = 9;
      if(this.hability.charisma >= 30) quantity = 10;

      this.habilityModifier.charisma = quantity;

      return quantity;
    },
  },
  actions: {},
})