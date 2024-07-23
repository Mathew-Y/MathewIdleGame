import { ImageProps } from "react-native";

// Works for daily and purchaseable chests

interface BaseChest {
  id: string;
  image: ImageProps["source"];
  title: string;
  description: string;
}

export interface TimeBasedChest extends BaseChest {
  type: "time";
  nextAvailable: Date;
  durationInMs: number;
}

export interface PurchaseableChest extends BaseChest {
  type: "purchased";
  price: number;
}

export type Chest = TimeBasedChest | PurchaseableChest;
