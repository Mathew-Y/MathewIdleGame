import { storage, StorageKeys } from "@/storage";
import { create } from "zustand";
import { IMAGES } from "@/assets/images";
import { Character, getMaxLevel } from "@/objects/Character";
import { addHours, isAfter, differenceInSeconds } from "date-fns";
import { Chest } from "@/objects/Chest";

interface PlayerState {
  coins: number;
  gems: number;
  teamSize: number;
  dailyChestLastOpened: string | null;
  characters: Character[];
  allCharacters: Character[];
  ownedChests: Record<string, number>;
  visibleChests: Chest[];
  allChests: Chest[];
  addCoins: (coins: number) => void;
  addGems: (gems: number) => void;
  adjustTeamSize: (newSize: number) => void;
  levelUp: (id: string) => void;
  upgrade: (id: string) => void;
  addChest: (chest: Chest, quantity: number) => void;
  // useChest: (chest: Chest) => void;
  checkDailyChestCooldown: () => boolean;
  openChest: (chest: Chest) => void;
  getDailyChestCooldownTime: () => number;
}

const getCoins = (): number => {
  const coins = storage.getNumber(StorageKeys.COINS);
  if (coins === undefined) {
    storage.set(StorageKeys.COINS, 0);
    return 0;
  }
  return coins;
};

const getGems = (): number => {
  const gems = storage.getNumber(StorageKeys.GEMS);
  if (gems === undefined) {
    storage.set(StorageKeys.GEMS, 0);
    return 0;
  }
  return gems;
};

const getTeamSize = (): number => {
  const teamSize = storage.getNumber(StorageKeys.TEAM_SIZE);
  if (teamSize === undefined) {
    storage.set(StorageKeys.TEAM_SIZE, 3);
    return 3;
  }
  return teamSize;
};

const getCharacters = (): Character[] => {
  const storedCharacters = storage.getString(StorageKeys.CHARACTERS);
  if (storedCharacters) {
    return JSON.parse(storedCharacters);
  }

  return [
    { id: "1", image: IMAGES.AVATARS.ARCEUS, rarity: 6, currentLevel: 1, numUpgrades: 0 },
    { id: "2", image: IMAGES.AVATARS.KYOGRE, rarity: 5, currentLevel: 1, numUpgrades: 0 },
    { id: "3", image: IMAGES.AVATARS.INFERNAPE, rarity: 4, currentLevel: 1, numUpgrades: 0 },
    { id: "4", image: IMAGES.AVATARS.MOOKA, rarity: 3, currentLevel: 1, numUpgrades: 0 },
    { id: "5", image: IMAGES.AVATARS.MONFERNO, rarity: 2, currentLevel: 1, numUpgrades: 0 },
    { id: "6", image: IMAGES.AVATARS.CHIMCHAR, rarity: 1, currentLevel: 1, numUpgrades: 0 },
    { id: "7", image: IMAGES.CROWN, rarity: 3, currentLevel: 1, numUpgrades: 0 },
    { id: "8", image: IMAGES.CROWN, rarity: 3, currentLevel: 1, numUpgrades: 0 },
    { id: "9", image: IMAGES.CROWN, rarity: 3, currentLevel: 1, numUpgrades: 0 },
    { id: "10", image: IMAGES.CROWN, rarity: 3, currentLevel: 1, numUpgrades: 0 },
    { id: "11", image: IMAGES.CROWN, rarity: 3, currentLevel: 1, numUpgrades: 0 },
    { id: "12", image: IMAGES.CROWN, rarity: 3, currentLevel: 1, numUpgrades: 0 },
    { id: "13", image: IMAGES.CROWN, rarity: 3, currentLevel: 1, numUpgrades: 0 },
    { id: "14", image: IMAGES.CROWN, rarity: 3, currentLevel: 1, numUpgrades: 0 },
    { id: "15", image: IMAGES.CROWN, rarity: 3, currentLevel: 1, numUpgrades: 0 },
    { id: "16", image: IMAGES.CROWN, rarity: 3, currentLevel: 1, numUpgrades: 0 },
    { id: "17", image: IMAGES.CROWN, rarity: 3, currentLevel: 1, numUpgrades: 0 },
    { id: "18", image: IMAGES.CROWN, rarity: 3, currentLevel: 1, numUpgrades: 0 },
    { id: "19", image: IMAGES.CROWN, rarity: 3, currentLevel: 1, numUpgrades: 0 },
    { id: "20", image: IMAGES.CROWN, rarity: 3, currentLevel: 1, numUpgrades: 0 },
    { id: "21", image: IMAGES.CROWN, rarity: 3, currentLevel: 1, numUpgrades: 0 },
    { id: "22", image: IMAGES.CROWN, rarity: 3, currentLevel: 1, numUpgrades: 0 },
    { id: "23", image: IMAGES.CROWN, rarity: 3, currentLevel: 1, numUpgrades: 0 },
    { id: "24", image: IMAGES.CROWN, rarity: 3, currentLevel: 1, numUpgrades: 0 },
  ];
};

const getOwnedChests = (): Record<string, number> => {
  const storedChests = storage.getString(StorageKeys.OWNEDCHESTS);
  if (storedChests) {
    return JSON.parse(storedChests);
  }
  return {};
};

const getVisibleChests = (): Chest[] => {
  const MS_PER_SECOND = 1000;
  const MS_PER_MINUTE = MS_PER_SECOND * 60;
  const MS_PER_HOUR = MS_PER_MINUTE * 60;
  const MS_PER_DAY = MS_PER_HOUR * 24;
  const visibleChests = storage.getString(StorageKeys.VISIBLECHESTS);
  if (visibleChests) {
    return JSON.parse(visibleChests);
  }
  return [
    {
      id: "0",
      image: IMAGES.CHESTS,
      title: "Daily Chest",
      description: "Contains plenty of items",
      type: "time",
      nextAvailable: addHours(new Date(), 24),
      durationInMs: MS_PER_DAY,
    },
    {
      id: "1",
      image: IMAGES.CHESTS,
      title: "Silver Chest",
      description: "Contains a handful of items",
      type: "purchased",
      price: 100,
    },
    {
      id: "2",
      image: IMAGES.CHESTS,
      title: "Gold Chest",
      description: "Contains an abundance of items",
      type: "purchased",
      price: 500,
    },
  ];
};

const getAllChests = (): Chest[] => {
  const allChests = storage.getString(StorageKeys.ALLCHESTS);
  if (allChests) {
    return JSON.parse(allChests);
  }

  return [
    {
      id: "0",
      image: IMAGES.CHESTS,
      title: "Daily Chest",
      description: "Contains plenty of items",
      type: "time",
      nextAvailable: addHours(new Date(), 24),
      durationInMs: 3,
    },
    {
      id: "1",
      image: IMAGES.CHESTS,
      title: "Silver Chest",
      description: "Contains a handful of items",
      type: "purchased",
      price: 100,
    },
    {
      id: "2",
      image: IMAGES.CHESTS,
      title: "Gold Chest",
      description: "Contains an abundance of items",
      type: "purchased",
      price: 500,
    },
    // Add more chests as needed
  ];
};

export const usePlayerStore = create<PlayerState>()((set, get) => ({
  coins: getCoins(),
  gems: getGems(),
  teamSize: getTeamSize(),
  characters: getCharacters(),
  ownedChests: getOwnedChests(),
  visibleChests: getVisibleChests(),
  allChests: getAllChests(),
  dailyChestLastOpened: storage.getString(StorageKeys.DAILY_CHEST_LAST_OPENED) || null,

  checkDailyChestCooldown: () => {
    const lastOpened = get().dailyChestLastOpened;
    if (!lastOpened) {
      return true;
    }
    const nextAvailable = addHours(new Date(lastOpened), 24);
    return isAfter(new Date(), nextAvailable);
  },

  openChest: (chest: Chest) => {
    const ownedChests = get().ownedChests;
    const chestKey = chest.id; // Assuming Chest has an id property
    const currentQuantity = ownedChests[chestKey];

    if (currentQuantity > 0) {
      const updatedChests = {
        ...ownedChests,
        [chestKey]: currentQuantity - 1,
      };

      storage.set(StorageKeys.OWNEDCHESTS, JSON.stringify(updatedChests));
      set({ ownedChests: updatedChests });

      // Remove from visibleChests if quantity becomes zero
      if (currentQuantity - 1 === 0) {
        const visibleChests = get().visibleChests.filter((c) => c.id !== chestKey);
        set({ visibleChests });
        storage.set(StorageKeys.VISIBLECHESTS, JSON.stringify(visibleChests));
      }
    }
  },

  getDailyChestCooldownTime: () => {
    const lastOpened = get().dailyChestLastOpened;
    if (!lastOpened) {
      return 0; // If never opened, it's ready to open
    }
    const nextAvailable = addHours(new Date(lastOpened), 24);
    return differenceInSeconds(nextAvailable, new Date());
  },

  allCharacters: [
    { id: "1", image: IMAGES.AVATARS.ARCEUS, rarity: 6, currentLevel: 1, numUpgrades: 0 },
    { id: "2", image: IMAGES.AVATARS.KYOGRE, rarity: 5, currentLevel: 1, numUpgrades: 0 },
    { id: "3", image: IMAGES.AVATARS.INFERNAPE, rarity: 4, currentLevel: 1, numUpgrades: 0 },
    { id: "4", image: IMAGES.AVATARS.MOOKA, rarity: 3, currentLevel: 1, numUpgrades: 0 },
    { id: "5", image: IMAGES.AVATARS.MONFERNO, rarity: 2, currentLevel: 1, numUpgrades: 0 },
    { id: "6", image: IMAGES.AVATARS.CHIMCHAR, rarity: 1, currentLevel: 1, numUpgrades: 0 },
    { id: "7", image: IMAGES.CROWN, rarity: 3, currentLevel: 1, numUpgrades: 0 },
    { id: "8", image: IMAGES.CROWN, rarity: 3, currentLevel: 1, numUpgrades: 0 },
    { id: "9", image: IMAGES.CROWN, rarity: 3, currentLevel: 1, numUpgrades: 0 },
    { id: "10", image: IMAGES.CROWN, rarity: 3, currentLevel: 1, numUpgrades: 0 },
    { id: "11", image: IMAGES.CROWN, rarity: 3, currentLevel: 1, numUpgrades: 0 },
    { id: "12", image: IMAGES.CROWN, rarity: 3, currentLevel: 1, numUpgrades: 0 },
    { id: "13", image: IMAGES.CROWN, rarity: 3, currentLevel: 1, numUpgrades: 0 },
    { id: "14", image: IMAGES.CROWN, rarity: 3, currentLevel: 1, numUpgrades: 0 },
    { id: "15", image: IMAGES.CROWN, rarity: 3, currentLevel: 1, numUpgrades: 0 },
    { id: "16", image: IMAGES.CROWN, rarity: 3, currentLevel: 1, numUpgrades: 0 },
    { id: "17", image: IMAGES.CROWN, rarity: 3, currentLevel: 1, numUpgrades: 0 },
    { id: "18", image: IMAGES.CROWN, rarity: 3, currentLevel: 1, numUpgrades: 0 },
    { id: "19", image: IMAGES.CROWN, rarity: 3, currentLevel: 1, numUpgrades: 0 },
    { id: "20", image: IMAGES.CROWN, rarity: 3, currentLevel: 1, numUpgrades: 0 },
    { id: "21", image: IMAGES.CROWN, rarity: 3, currentLevel: 1, numUpgrades: 0 },
    { id: "22", image: IMAGES.CROWN, rarity: 3, currentLevel: 1, numUpgrades: 0 },
    { id: "23", image: IMAGES.CROWN, rarity: 3, currentLevel: 1, numUpgrades: 0 },
    { id: "24", image: IMAGES.CROWN, rarity: 3, currentLevel: 1, numUpgrades: 0 },
  ],

  addCoins: (coins) => {
    const next = get().coins + coins;
    storage.set(StorageKeys.COINS, next);
    set({ coins: next });
  },

  addGems: (gems) => {
    const next = get().gems + gems;
    storage.set(StorageKeys.GEMS, next);
    set({ gems: next });
  },

  adjustTeamSize: (newSize) => {
    storage.set(StorageKeys.TEAM_SIZE, newSize);
    set({ teamSize: newSize });
  },

  levelUp: (id) => {
    const characters = get().characters;
    const updatedCharacters = characters.map((character) => {
      if (character.id === id) {
        const maxLevel = getMaxLevel(character);
        if (character.currentLevel < maxLevel) {
          return { ...character, currentLevel: character.currentLevel + 1 };
        }
      }
      return character;
    });

    storage.set(StorageKeys.CHARACTERS, JSON.stringify(updatedCharacters));
    set({ characters: updatedCharacters });
  },

  upgrade: (id) => {
    const characters = get().characters;
    const updatedCharacters = characters.map((character) => {
      if (character.id === id && character.numUpgrades < character.rarity) {
        return { ...character, numUpgrades: character.numUpgrades + 1 };
      }
      return character;
    });

    storage.set(StorageKeys.CHARACTERS, JSON.stringify(updatedCharacters));
    set({ characters: updatedCharacters });
  },

  addChest: (chest, quantity) => {
    const ownedChests = get().ownedChests;
    const chestKey = chest.id; // Assuming Chest has an id property
    const newQuantity = (ownedChests[chestKey] || 0) + quantity;
    const updatedChests = { ...ownedChests, [chestKey]: newQuantity };

    storage.set(StorageKeys.OWNEDCHESTS, JSON.stringify(updatedChests));
    set({ ownedChests: updatedChests });

    // Update visibleChests if chest is not already present
    const visibleChests = get().visibleChests;
    if (!visibleChests.some((c) => c.id === chestKey)) {
      set({ visibleChests: [...visibleChests, chest] });
      storage.set(StorageKeys.VISIBLECHESTS, JSON.stringify([...visibleChests, chest]));
    }
  },
  // useChest: (chest) => {
  //   const ownedChests = get().ownedChests;
  //   const chestKey = chest.id; // Assuming Chest has an id property
  //   const currentQuantity = ownedChests[chestKey];

  //   if (currentQuantity > 0) {
  //     const updatedChests = {
  //       ...ownedChests,
  //       [chestKey]: currentQuantity - 1,
  //     };

  //     storage.set(StorageKeys.OWNEDCHESTS, JSON.stringify(updatedChests));
  //     set({ ownedChests: updatedChests });

  //     // Remove from visibleChests if quantity becomes zero
  //     if (currentQuantity - 1 === 0) {
  //       const visibleChests = get().visibleChests.filter((c) => c.id !== chestKey);
  //       set({ visibleChests });
  //       storage.set(StorageKeys.VISIBLECHESTS, JSON.stringify(visibleChests));
  //     }
  //   }
  // },
}));
