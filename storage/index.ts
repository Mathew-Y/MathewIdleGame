import { MMKV } from "react-native-mmkv";

export enum StorageKeys {
  COINS = "coins",
  GEMS = "gems",
  TEAM_SIZE = "team_size",
  CHARACTERS = "characters",
  OWNEDCHESTS = "ownedChests",
  ALLCHESTS = "allChests",
  VISIBLECHESTS = "visibleChests",
  DAILY_CHEST_LAST_OPENED = "dailyChestLastOpened",
}

export const storage = new MMKV();
