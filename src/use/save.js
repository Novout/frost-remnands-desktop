import { useCharacterStore } from "-/character";
import { PathRead, PathWrite } from "_/services/fs";

export const useSave = () => {
  const saveCharacter = () => {
    const character = useCharacterStore();
    const register = PathRead("characters");
    const filtered = register.filter(char => char.name !== character.name);
    filtered.push(character.$state);
    PathWrite("characters", filtered);
  }

  const saveAll = () => {
    saveCharacter();
  }

  return { 
    saveCharacter,
    saveAll
  };
}