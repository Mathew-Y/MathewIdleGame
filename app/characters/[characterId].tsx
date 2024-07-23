import CustomStarIcon from "@/assets/images/icons/CustomStarIcon";
import EnhanceUpgradeButton from "@/components/EnhanceUpgradeButton";
import { usePlayerStore } from "@/store/player";
import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { Dimensions, Image, Text, View } from "react-native";
import { getStarColor } from "../(tabs)/deck";

export default function CharacterPage() {
  const { characterId } = useLocalSearchParams<{ characterId: string }>();
  const { characters } = usePlayerStore();

  const { width: SCREEN_WIDTH } = Dimensions.get("window");

  const STAR_SIZE = Math.floor(SCREEN_WIDTH * 0.1);
  const STAR_OFFSET = Math.floor(STAR_SIZE * 0.01);

  const currentCharacter = useMemo(() => {
    if (!characterId) return null;
    return characters.find((char) => char.id === characterId) ?? null;
  }, [characterId, characters]);

  if (!characterId || !currentCharacter) {
    console.log("Missing character identifier.");
    return null;
  }

  return (
    <View>
      <Text>Character id: {characterId}</Text>
      <Text>Rarity: {currentCharacter.rarity}</Text>
      <Text>NumUpgrades: {currentCharacter.numUpgrades}</Text>
      <Text>Level: {currentCharacter.currentLevel}</Text>
      <View style={{ width: SCREEN_WIDTH, alignItems: "center" }}>
        <Image
          source={currentCharacter.image}
          style={{
            height: 128,
            width: 128,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {new Array(currentCharacter.rarity).fill(0).map((_, index) => (
          <CustomStarIcon
            key={index}
            size={STAR_SIZE}
            color={getStarColor(index, currentCharacter.numUpgrades)}
            borderColor="black"
            borderWidth={2}
            style={{
              marginLeft: index === 0 ? 0 : -STAR_OFFSET,
            }}
          />
        ))}
      </View>
      <EnhanceUpgradeButton character={currentCharacter} />
    </View>
  );
}
