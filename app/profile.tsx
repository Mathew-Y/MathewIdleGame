import { Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Surface } from "@/components/Surface";
import { AddButton } from "@/components/AddButton";
import { usePlayerStore } from "@/store/player";
import { formatNumberWithSpaces } from "@/libs/number";
import { IMAGES } from "@/assets/images";

const { width, height } = Dimensions.get("window");
const PROFILE_ICON_SIZE = Math.round(width * 0.15);

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { coins, gems, addCoins, addGems } = usePlayerStore();

  return (
    <>
      <LinearGradient
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        // Change the colors to what I want in my game
        colors={["red", "blue"]}
        style={styles.container}
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

          <Pressable onPress={() => console.log("Profile")}>
            <Image
              source={IMAGES.CROWN}
              style={{ objectFit: "fill", height: PROFILE_ICON_SIZE, width: PROFILE_ICON_SIZE }}
            />
          </Pressable>
        </View>

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
