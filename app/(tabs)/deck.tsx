import React, { useState } from "react";
import { View, Text, Image, Pressable, StyleSheet, ScrollView, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Surface } from "@/components/Surface";
import { usePlayerStore } from "@/store/player";
import { StatusBar } from "expo-status-bar";
import { AddButton } from "@/components/AddButton";
import { formatNumberWithSpaces } from "@/libs/number";
import { useBottomTabBarHeight } from "@/contexts/BottomTabBarHeightContext";
import { Character, getMaxLevel } from "@/objects/Character";
import CustomStarIcon from "@/assets/images/icons/CustomStarIcon";
import { useRouter } from "expo-router";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const HR_PADDING = 12;
const CARD_MARGIN = 5;
const SLOT_MARGIN = 10;

const CARD_COLUMNS = SCREEN_WIDTH < 568 ? 4 : SCREEN_WIDTH < 1000 ? 7 : 9;
const ADJUSTED_SCREEN_WIDTH = SCREEN_WIDTH - 2 * HR_PADDING - CARD_MARGIN * CARD_COLUMNS * 2;
const CARD_SIZE = Math.floor(ADJUSTED_SCREEN_WIDTH / CARD_COLUMNS);
const STAR_SIZE = Math.floor(CARD_SIZE * 0.2);
const STAR_OFFSET = Math.floor(STAR_SIZE * 0.4);

export const getStarColor = (index: number, numUpgrades: number) => {
  return index < numUpgrades ? "red" : "gold"; // Red if the index is less than the number of upgrades
};

const DeckScreen = () => {
  const { push } = useRouter();
  const insets = useSafeAreaInsets();
  const { height } = useBottomTabBarHeight();

  const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([]);
  const { characters, coins, gems, teamSize, adjustTeamSize, levelUp, upgrade } = usePlayerStore();

  const handleCharacterSelect = (character: Character) => {
    const selectedIndex = selectedCharacters.findIndex((c) => c && c.id === character.id);

    if (selectedIndex !== -1) {
      const newSelectedCharacters = selectedCharacters.filter((c) => c.id !== character.id);
      setSelectedCharacters(newSelectedCharacters);
    } else if (selectedCharacters.length < teamSize) {
      const newSelectedCharacters = [...selectedCharacters, character];
      setSelectedCharacters(newSelectedCharacters);
    }
  };

  const navigateToCharacter = (character: Character) => {
    push(`/characters/${character.id}`);
  };

  const availableWidth = SCREEN_WIDTH - HR_PADDING * 2 - SLOT_MARGIN * (teamSize - 1) * 2;
  const slotSize = availableWidth / teamSize;

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["#1529a3", "#23a158"]}
        style={[styles.container, { paddingTop: insets.top }]}
      >
        <View style={styles.header}>
          <Surface style={styles.dataSurface}>
            <AddButton
              onPress={() => {
                if (teamSize > 4) {
                  adjustTeamSize(3);
                } else {
                  adjustTeamSize(teamSize + 1);
                }
              }}
            />
            <Text numberOfLines={1} style={styles.moneyText}>
              {formatNumberWithSpaces(coins)}
            </Text>
          </Surface>
          <Surface style={styles.dataSurface}>
            <AddButton
              onPress={() => {
                if (characters[0].currentLevel < getMaxLevel(characters[0])) {
                  levelUp(characters[0].id);
                }
                upgrade(characters[0].id);
              }}
            />
            <Text numberOfLines={1} style={styles.moneyText}>
              {formatNumberWithSpaces(gems)}
            </Text>
          </Surface>
        </View>
        <Text style={styles.title}>Heroes</Text>

        <ScrollView
          style={styles.fullWidth}
          contentContainerStyle={[styles.characterList, { paddingBottom: height }]}
          automaticallyAdjustsScrollIndicatorInsets={false}
          scrollIndicatorInsets={{ bottom: height }}
        >
          <View style={styles.charactersContainer}>
            {characters.map((character) => {
              const isSelected = selectedCharacters.some(
                (selectedChar) => selectedChar && selectedChar.id === character.id
              );
              return (
                <Pressable
                  key={character.id}
                  onPress={() => navigateToCharacter(character)}
                  // onPress={() => handleCharacterSelect(character)}
                >
                  <View style={[styles.overlay, isSelected && styles.selectedOverlay]}>
                    <Text style={styles.levelText}>{character.currentLevel}</Text>
                    <Image
                      source={character.image}
                      style={{ height: 24, width: 24, borderRadius: 12 }}
                    />
                    <View style={styles.footer}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {new Array(character.rarity).fill(0).map((_, index) => (
                          <CustomStarIcon
                            key={index}
                            size={STAR_SIZE}
                            color={getStarColor(index, character.numUpgrades)}
                            borderColor="black"
                            borderWidth={2}
                            style={{
                              marginLeft: index === 0 ? 0 : -STAR_OFFSET,
                            }}
                          />
                        ))}
                      </View>
                    </View>
                  </View>
                  <Image
                    source={character.image}
                    style={[styles.characterImage, isSelected && styles.characterImageSelected]}
                  />
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "white",
    marginBottom: 20,
    marginTop: 20,
    fontWeight: "bold",
  },
  selectedContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  slot: {
    marginHorizontal: SLOT_MARGIN / 2,
    borderWidth: 2,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  slotText: {
    color: "white",
    fontSize: 18,
  },
  selectedCharacter: {
    width: "100%",
    height: "100%",
    borderWidth: 3,
    borderColor: "white",
  },
  characterList: {
    flexWrap: "wrap",
    flexGrow: 1,
  },
  characterImage: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    margin: CARD_MARGIN,
    borderWidth: 3,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderColor: "#FAD5BB",
    borderRadius: 5,
  },
  text: {
    color: "white",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    padding: 6,
    gap: 6,
    alignItems: "center",
    justifyContent: "space-between",
  },
  dataSurface: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    padding: 0,
  },
  money: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    padding: 0,
  },
  moneyText: {
    padding: 6,
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    flex: 1,
    textAlign: "right",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  characterImageSelected: {
    opacity: 0.5,
  },
  overlay: {
    position: "absolute",
    top: CARD_MARGIN,
    bottom: CARD_MARGIN,
    left: CARD_MARGIN,
    right: CARD_MARGIN,
    padding: 2,
    justifyContent: "space-between",
    zIndex: 1,
  },
  selectedOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  fullWidth: {
    width: "100%",
    flex: 1,
  },
  charactersContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: HR_PADDING,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  levelText: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: "bold",
    zIndex: 2,
  },
});

export default DeckScreen;
