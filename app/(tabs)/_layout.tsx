import { Tabs } from "expo-router";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewProps,
} from "react-native";
import { type BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { IMAGES } from "@/assets/images";
import {
  BottomTabBarHeightProvider,
  useBottomTabBarHeight,
} from "@/contexts/BottomTabBarHeightContext";
import { PropsWithChildren } from "react";

type TabBarNavigationState = BottomTabBarProps["state"]["routes"][0];

interface TabBarItemProps {
  index: number;
  route: TabBarNavigationState;
  descriptors: BottomTabBarProps["descriptors"];
  state: BottomTabBarProps["state"];
  navigation: BottomTabBarProps["navigation"];
}

const TabBarItem: React.FC<TabBarItemProps> = ({
  descriptors,
  state,
  route,
  navigation,
  index,
}) => {
  const { bottom } = useSafeAreaInsets();
  const { options } = descriptors[route.key];
  // const label =
  //   options.tabBarIcon !== undefined
  //     ? options.tabBarIcon
  //     : options.tabBarLabel !== undefined
  //     ? options.tabBarLabel
  //     : options.title !== undefined
  //     ? options.title
  //     : route.name;

  const isFocused = state.index === index;

  const onPress = () => {
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name, route.params);
    }
  };

  const onLongPress = () => {
    navigation.emit({
      type: "tabLongPress",
      target: route.key,
    });
  };

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.bottomBarItem, { paddingBottom: bottom }]}
    >
      <Text style={styles.bottomBarItemText}>
        {/* @ts-ignore */}
        {options.tabBarIcon()}
      </Text>
    </TouchableOpacity>
  );
};

const BottomBarMeasurer: React.FC<ViewProps> = (props) => {
  const { setHeight } = useBottomTabBarHeight();
  return <View {...props} onLayout={(e) => setHeight(e.nativeEvent.layout.height)} />;
};

const TabBar: React.FC<BottomTabBarProps> = ({ state, navigation, descriptors }) => {
  return (
    <BottomBarMeasurer style={styles.bottomBar}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={["#41949c", "#1b3d40"]}
        style={StyleSheet.absoluteFill}
      />

      {state.routes.map((route, index) => {
        return (
          <TabBarItem
            key={`tab-${index}`}
            state={state}
            navigation={navigation}
            descriptors={descriptors}
            route={route}
            index={index}
          />
        );
      })}
    </BottomBarMeasurer>
  );
};

const TAB_BAR_ICON_MARGIN = 12;

export default function Layout() {
  const { width } = useWindowDimensions();
  const size = width * 0.2 - TAB_BAR_ICON_MARGIN * 2;
  // 0.2

  return (
    <BottomTabBarHeightProvider>
      <Tabs
        tabBar={TabBar}
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            // borderTopColor: "transparent",
            // position: "absolute",
            // bottom: 0,
            // left: 0,
            // right: 0,
            // backgroundColor: "rgba(0,0,0,0)",
          },
        }}
      >
        <Tabs.Screen
          name="chests"
          options={{
            title: "Chests",
            tabBarIcon: () => (
              <Image source={IMAGES.CHESTS} style={{ width: size, height: size }} />
            ),
          }}
        />
        <Tabs.Screen
          name="deck"
          options={{
            title: "Deck",
            tabBarIcon: () => <Image source={IMAGES.CROWN} style={{ width: size, height: size }} />,
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: "Battle",
            tabBarIcon: () => (
              <Image source={IMAGES.BATTLE} style={{ width: size, height: size }} />
            ),
          }}
        />
      </Tabs>
    </BottomTabBarHeightProvider>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  bottomBarItem: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomBarItemText: {
    color: "black",
    fontWeight: "700",
  },
});
