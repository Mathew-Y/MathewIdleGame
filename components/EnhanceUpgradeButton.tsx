import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { usePlayerStore } from "@/store/player";
import { Character, getMaxLevel } from "@/objects/Character";

interface EnhanceUpgradeButtonProps {
  character: Character;
}

const EnhanceUpgradeButton: React.FC<EnhanceUpgradeButtonProps> = ({ character }) => {
  const { levelUp, upgrade } = usePlayerStore();

  const handlePress = () => {
    console.log("Upgrading character: ", character.currentLevel);
    if (character.currentLevel < getMaxLevel(character)) {
      console.log("Leveling up");
      levelUp(character.id);
    } else {
      console.log("Upgrading");
      upgrade(character.id);
    }
  };

  const isMaxLevel = character.currentLevel >= getMaxLevel(character);

  return (
    <Pressable onPress={handlePress} style={styles.button}>
      <Text style={styles.buttonText}>{isMaxLevel ? "Upgrade" : "Enhance"}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "green",
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },
});

export default EnhanceUpgradeButton;
