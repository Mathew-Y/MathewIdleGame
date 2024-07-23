import { ImageProps } from "react-native";

export interface Character {
  id: string;
  image: ImageProps["source"];
  rarity: number;
  currentLevel: number;
  numUpgrades: number;
}

const MAX_LEVELS = [10, 20, 30, 40, 50, 60]; // Max levels for 1 star to 5 star characters

export const getMaxLevel = (character: Character) => {
  return MAX_LEVELS[character.rarity - 1] + character.numUpgrades * 10;
};
