const item = (name) => {
  return ({
    "simple-melee-weapon": "Arma Corpo-A-Corpo Simples",
    "martial-melee-weapon": "Arma Marcial Corpo-A-Corpo",
    "light-armor": "Armadura Leve",
    "medium-armor": "Armadura Mediana"
  }[name] || "Padrão");
}

const rarityType = (name) => {
  return ({
    "common": "Comum",
    "rare": "Raro",
    "epic": "Épico",
    "legendary": "Lendário"
  }[name] || "Padrão");
}

export const useLocalisation = () => {
  return {
    item,
    rarityType
  }
}