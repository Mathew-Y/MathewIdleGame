import { useTimer } from "@/hooks/useTimer";
import { Chest } from "@/objects/Chest";
import { usePlayerStore } from "@/store/player";
import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";

interface ChestBarProps {
  chest: Chest;
  quantity: number;
  openChest: (chest: Chest) => void;
  addChest: (chest: Chest, quantity: number) => void;
}

const ChestBar: React.FC<ChestBarProps> = ({ chest, quantity, openChest, addChest }) => {
  const isDailyChest = chest.type === "time";
  const isDailyChestReady = false;

  const isRedeemable =
    (chest.type === "time" && new Date() >= chest.nextAvailable) || chest.type === "purchased";

  if (chest.type === "time") {
    const { remainingTime, deltaTime } = useTimer({
      endDate: chest.nextAvailable,
      disabled: chest.type !== "time",
    });

    return (
      <View style={styles.chestContainer}>
        <View style={styles.imageContainer}>
          <Image source={chest.image} style={styles.image} />
          {isRedeemable && (
            <View style={styles.quantityContainer}>
              <Text style={styles.quantityText}>{quantity}</Text>
            </View>
          )}
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{chest.title}</Text>
          <Text style={styles.description}>{chest.description}</Text>
        </View>
        <Pressable
          disabled={!isDailyChestReady}
          style={[
            styles.dailyButton,
            { backgroundColor: isDailyChestReady ? "#2d3fba" : "#808080" },
          ]}
          onPress={isDailyChestReady ? () => openChest(chest) : null}
        >
          <Text style={styles.buyButtonText}>
            {isDailyChestReady ? "Open" : `Not Ready (${remainingTime})`}
          </Text>
        </Pressable>
      </View>
    );
  }

  // Purchaseable chests

  return (
    <View style={styles.chestContainer}>
      <View style={styles.imageContainer}>
        <Image source={chest.image} style={styles.image} />
        {isRedeemable && (
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityText}>{quantity}</Text>
          </View>
        )}
      </View>
      <View style={styles.details}>
        <Text style={styles.title}>{chest.title}</Text>
        <Text style={styles.description}>{chest.description}</Text>
      </View>
      <Pressable
        style={[styles.buyButton, quantity > 0 && styles.claimButton]}
        onPress={() => {
          if (quantity > 0) {
            openChest(chest);
          } else {
            addChest(chest, 1);
          }
        }}
      >
        <Text style={styles.buyButtonText}>{quantity > 0 ? "Open" : "Buy"}</Text>
      </Pressable>
    </View>
  );

  // useEffect(() => {
  //   console.log(deltaTime);
  // }, [deltaTime]);
};

const styles = StyleSheet.create({
  chestContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 2,
  },
  imageContainer: {
    position: "relative",
    marginRight: 10,
  },
  image: {
    width: 60,
    height: 60,
  },
  quantityContainer: {
    position: "absolute",
    top: -5,
    left: -5,
    backgroundColor: "red",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    color: "white",
    fontWeight: "bold",
  },
  details: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  buyButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
  },
  claimButton: {
    backgroundColor: "#2d3fba",
  },
  dailyButton: {
    padding: 10,
    borderRadius: 5,
  },
  buyButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ChestBar;
