import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import ChestBar from "@/components/ChestBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@/contexts/BottomTabBarHeightContext";
import { LinearGradient } from "expo-linear-gradient";
import { usePlayerStore } from "@/store/player";
import { StatusBar } from "expo-status-bar";
import { Surface } from "@/components/Surface";
import { AddButton } from "@/components/AddButton";
import { formatNumberWithSpaces } from "@/libs/number";
import { addHours, differenceInSeconds } from "date-fns";

const ChestsScreen = () => {
  const { width: SCREEN_WIDTH } = Dimensions.get("window");

  const insets = useSafeAreaInsets();
  const { height } = useBottomTabBarHeight();

  const {
    coins,
    gems,
    allChests,
    ownedChests,
    teamSize,
    checkDailyChestCooldown,
    openChest,
    addChest,
    dailyChestLastOpened,
  } = usePlayerStore();

  const dailyChest = allChests.find((chest) => chest.id === "0");
  const isDailyChestReady = checkDailyChestCooldown();

  const secondsUntilNextDailyChest = dailyChestLastOpened
    ? differenceInSeconds(addHours(new Date(dailyChestLastOpened), 24), new Date())
    : 0;

  function adjustTeamSize(arg0: number) {
    throw new Error("Function not implemented.");
  }

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
            <AddButton onPress={() => {}} />
            <Text numberOfLines={1} style={styles.moneyText}>
              {formatNumberWithSpaces(gems)}
            </Text>
          </Surface>
        </View>
        <Text style={[styles.title, { marginTop: insets.top / 2 }]}>Chests</Text>

        <ScrollView
          style={
            (styles.chestList,
            { paddingTop: insets.top / 2, width: SCREEN_WIDTH, paddingHorizontal: 10 })
          }
        >
          {allChests.map((chest) => (
            <ChestBar
              key={chest.id}
              chest={chest}
              quantity={ownedChests[chest.id] || 0}
              openChest={openChest}
              addChest={addChest}
            />
          ))}
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
  moneyText: {
    padding: 6,
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    flex: 1,
    textAlign: "right",
  },
  title: {
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
  },
  chestList: {
    flexWrap: "wrap",
    flexGrow: 1,
  },
});

export default ChestsScreen;
