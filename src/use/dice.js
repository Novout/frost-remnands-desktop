const Random = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}

const DiceD4 = () => Random(1, 4); 
const DiceD6 = () => Random(1, 6); 
const DiceD8 = () => Random(1, 8); 
const DiceD10 = () => Random(1, 10); 
const DiceD12 = () => Random(1, 12); 
const DiceD20 = () => Random(1, 20); 
const DiceD50 = () => Random(1, 50); 
const DiceD100 = () => Random(1, 100); 

const RollDice = (dice = 20, quantity = 1, constant = 0) => {
  let sum = 0;

  for(let i = 0; i < quantity; i++) {
    sum += Random(1, dice);
  }

  sum += constant;

  return sum;
}

export const useDice = () => {
  return { 
    DiceD4,
    DiceD6,
    DiceD8,
    DiceD10,
    DiceD12,
    DiceD20,
    DiceD50,
    DiceD100,
    RollDice,
  };
}