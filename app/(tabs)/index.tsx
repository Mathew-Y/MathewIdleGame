import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Surface } from "@/components/Surface";
import { AddButton } from "@/components/AddButton";
import { usePlayerStore } from "@/store/player";
import { formatNumberWithSpaces } from "@/libs/number";
import { StatusBar } from "expo-status-bar";
import { IMAGES } from "@/assets/images";
import { useRouter } from "expo-router";
import { useBottomTabBarHeight } from "@/contexts/BottomTabBarHeightContext";

const { width } = Dimensions.get("window");
const PROFILE_ICON_SIZE = Math.round(width * 0.15);

export default function HomeScreen() {
  const { push } = useRouter();
  const { height } = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();
  const { coins, gems, addCoins, addGems } = usePlayerStore();

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        // Change the colors to what I want in my game
        colors={["red", "blue"]}
        style={[styles.container, { paddingTop: insets.top }]}
      >
        <View style={styles.header}>
          <Surface style={styles.dataSurface}>
            <AddButton onPress={() => addCoins(100000)} />
            <Text numberOfLines={1} style={styles.moneyText}>
              {formatNumberWithSpaces(coins)}
            </Text>
          </Surface>
          <Surface style={styles.dataSurface}>
            <AddButton onPress={() => addGems(100000)} />
            <Text numberOfLines={1} style={styles.moneyText}>
              {formatNumberWithSpaces(gems)}
            </Text>
          </Surface>
        </View>

        <Text style={{ fontSize: 100, paddingBottom: height + 12 }}>Pooh</Text>

        {/* <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
          {[
            1, 2, 4, 43, 423, 4, 543, 356, 3463, 436, 56, 4634, 634, 66, 6, 36, 463, 646, 46, 46,
            65543, 6456, 56, 2,
          ].map((x, i) => (
            <Text style={{ color: "white", fontSize: 32 }} key={`text-${i}`}>
              {x}
            </Text>
          ))}
        </ScrollView> */}
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
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
});
