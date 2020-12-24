import { defineStore } from "pinia";

export const useCharacterStore = defineStore({
  id: "character",
  state: () => ({
    race: "nekro",
    origin: "rouanir",
    class: "taught",
    name: "Rouanir Intirl",
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
    expertises: {
      athletics: false,
      reaction: false,
      acrobatics: false,
      resilience: false,
      oldworld: false,
      newworld: false,
      investigation: false,
      nature: false,
      faith: false,
      strategy: false,
      misticism: false,
      perception: false,
      piloting: false,
      deception: false,
      intimidation: false,
      performance: false,
      persuasion: false
    },
    proficiencyBonus: 2,
    hitPoints: 0,
    hitDice: 6,
    lastChance: true,
    CA: 10,
    speed: 30,
    initiative: 0,
    exhaustion: true,
    exhaustionTime: 3,
    talents: [
      {
        "id": "iluminated",
        "title": "Iluminado",
        "code": "unity",
        "description": "A percepção da realidade é apenas uma pura questão de sorte.",
        "requirements": "Nenhum",
        "bonus": "Ganha +1 de Sabedoria e +1 de Inteligência."
      },
      {
        "id": "crooked-talk",
        "title": "Papo Torto",
        "code": "unity",
        "description": "Lábia de certa forma duvidosa.",
        "requirements": "Nenhum",
        "bonus": "Ganha a perícia Persuasão. O bônus de proficiência é dobrado para Persuasão."
      },
    ],
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
      if(this.hability.strength === 1) return -5;
      if(this.hability.strength === 2 || this.hability.strength === 3) return -4;
      if(this.hability.strength === 4 || this.hability.strength === 5) return -3;
      if(this.hability.strength === 6 || this.hability.strength === 7) return -2;
      if(this.hability.strength === 8 || this.hability.strength === 9) return -1;
      if(this.hability.strength === 10 || this.hability.strength === 11) return 0;
      if(this.hability.strength === 12 || this.hability.strength === 13) return 1;
      if(this.hability.strength === 14 || this.hability.strength === 15) return 2;
      if(this.hability.strength === 16 || this.hability.strength === 17) return 3;
      if(this.hability.strength === 18 || this.hability.strength === 19) return 4;
      if(this.hability.strength === 20 || this.hability.strength === 21) return 5;
      if(this.hability.strength === 22 || this.hability.strength === 23) return 6;
      if(this.hability.strength === 24 || this.hability.strength === 25) return 7;
      if(this.hability.strength === 26 || this.hability.strength === 27) return 8;
      if(this.hability.strength === 28 || this.hability.strength === 29) return 9;
      if(this.hability.strength >= 30) return 10;
    },
    dexterityModifier() {
      if(this.hability.dexterity === 1) return -5;
      if(this.hability.dexterity === 2 || this.hability.dexterity === 3) return -4;
      if(this.hability.dexterity === 4 || this.hability.dexterity === 5) return -3;
      if(this.hability.dexterity === 6 || this.hability.dexterity === 7) return -2;
      if(this.hability.dexterity === 8 || this.hability.dexterity === 9) return -1;
      if(this.hability.dexterity === 10 || this.hability.dexterity === 11) return 0;
      if(this.hability.dexterity === 12 || this.hability.dexterity === 13) return 1;
      if(this.hability.dexterity === 14 || this.hability.dexterity === 15) return 2;
      if(this.hability.dexterity === 16 || this.hability.dexterity === 17) return 3;
      if(this.hability.dexterity === 18 || this.hability.dexterity === 19) return 4;
      if(this.hability.dexterity === 20 || this.hability.dexterity === 21) return 5;
      if(this.hability.dexterity === 22 || this.hability.dexterity === 23) return 6;
      if(this.hability.dexterity === 24 || this.hability.dexterity === 25) return 7;
      if(this.hability.dexterity === 26 || this.hability.dexterity === 27) return 8;
      if(this.hability.dexterity === 28 || this.hability.dexterity === 29) return 9;
      if(this.hability.dexterity >= 30) return 10;
    },
    constitutionModifier() {
      if(this.hability.constitution === 1) return -5;
      if(this.hability.constitution === 2 || this.hability.constitution === 3) return -4;
      if(this.hability.constitution === 4 || this.hability.constitution === 5) return -3;
      if(this.hability.constitution === 6 || this.hability.constitution === 7) return -2;
      if(this.hability.constitution === 8 || this.hability.constitution === 9) return -1;
      if(this.hability.constitution === 10 || this.hability.constitution === 11) return 0;
      if(this.hability.constitution === 12 || this.hability.constitution === 13) return 1;
      if(this.hability.constitution === 14 || this.hability.constitution === 15) return 2;
      if(this.hability.constitution === 16 || this.hability.constitution === 17) return 3;
      if(this.hability.constitution === 18 || this.hability.constitution === 19) return 4;
      if(this.hability.constitution === 20 || this.hability.constitution === 21) return 5;
      if(this.hability.constitution === 22 || this.hability.constitution === 23) return 6;
      if(this.hability.constitution === 24 || this.hability.constitution === 25) return 7;
      if(this.hability.constitution === 26 || this.hability.constitution === 27) return 8;
      if(this.hability.constitution === 28 || this.hability.constitution === 29) return 9;
      if(this.hability.constitution >= 30) return 10;
    },
    intelligenceModifier() {
      if(this.hability.intelligence === 1) return -5;
      if(this.hability.intelligence === 2 || this.hability.intelligence === 3) return -4;
      if(this.hability.intelligence === 4 || this.hability.intelligence === 5) return -3;
      if(this.hability.intelligence === 6 || this.hability.intelligence === 7) return -2;
      if(this.hability.intelligence === 8 || this.hability.intelligence === 9) return -1;
      if(this.hability.intelligence === 10 || this.hability.intelligence === 11) return 0;
      if(this.hability.intelligence === 12 || this.hability.intelligence === 13) return 1;
      if(this.hability.intelligence === 14 || this.hability.intelligence === 15) return 2;
      if(this.hability.intelligence === 16 || this.hability.intelligence === 17) return 3;
      if(this.hability.intelligence === 18 || this.hability.intelligence === 19) return 4;
      if(this.hability.intelligence === 20 || this.hability.intelligence === 21) return 5;
      if(this.hability.intelligence === 22 || this.hability.intelligence === 23) return 6;
      if(this.hability.intelligence === 24 || this.hability.intelligence === 25) return 7;
      if(this.hability.intelligence === 26 || this.hability.intelligence === 27) return 8;
      if(this.hability.intelligence === 28 || this.hability.intelligence === 29) return 9;
      if(this.hability.intelligence >= 30) return 10;
    },
    wisdomModifier() {
      if(this.hability.wisdom === 1) return -5;
      if(this.hability.wisdom === 2 || this.hability.wisdom === 3) return -4;
      if(this.hability.wisdom === 4 || this.hability.wisdom === 5) return -3;
      if(this.hability.wisdom === 6 || this.hability.wisdom === 7) return -2;
      if(this.hability.wisdom === 8 || this.hability.wisdom === 9) return -1;
      if(this.hability.wisdom === 10 || this.hability.wisdom === 11) return 0;
      if(this.hability.wisdom === 12 || this.hability.wisdom === 13) return 1;
      if(this.hability.wisdom === 14 || this.hability.wisdom === 15) return 2;
      if(this.hability.wisdom === 16 || this.hability.wisdom === 17) return 3;
      if(this.hability.wisdom === 18 || this.hability.wisdom === 19) return 4;
      if(this.hability.wisdom === 20 || this.hability.wisdom === 21) return 5;
      if(this.hability.wisdom === 22 || this.hability.wisdom === 23) return 6;
      if(this.hability.wisdom === 24 || this.hability.wisdom === 25) return 7;
      if(this.hability.wisdom === 26 || this.hability.wisdom === 27) return 8;
      if(this.hability.wisdom === 28 || this.hability.wisdom === 29) return 9;
      if(this.hability.wisdom >= 30) return 10;
    },
    charismaModifier() {
      if(this.hability.charisma === 1) return -5;
      if(this.hability.charisma === 2 || this.hability.charisma === 3) return -4;
      if(this.hability.charisma === 4 || this.hability.charisma === 5) return -3;
      if(this.hability.charisma === 6 || this.hability.charisma === 7) return -2;
      if(this.hability.charisma === 8 || this.hability.charisma === 9) return -1;
      if(this.hability.charisma === 10 || this.hability.charisma === 11) return 0;
      if(this.hability.charisma === 12 || this.hability.charisma === 13) return 1;
      if(this.hability.charisma === 14 || this.hability.charisma === 15) return 2;
      if(this.hability.charisma === 16 || this.hability.charisma === 17) return 3;
      if(this.hability.charisma === 18 || this.hability.charisma === 19) return 4;
      if(this.hability.charisma === 20 || this.hability.charisma === 21) return 5;
      if(this.hability.charisma === 22 || this.hability.charisma === 23) return 6;
      if(this.hability.charisma === 24 || this.hability.charisma === 25) return 7;
      if(this.hability.charisma === 26 || this.hability.charisma === 27) return 8;
      if(this.hability.charisma === 28 || this.hability.charisma === 29) return 9;
      if(this.hability.charisma >= 30) return 10;
    },
  },
  actions: {},
})