import { StyleSheet, View, ViewProps } from "react-native";

interface SurfaceProps extends ViewProps {}

export const Surface: React.FC<SurfaceProps> = ({ style, ...props }) => {
  return <View {...props} style={[styles.surface, style]} />;
}

const styles = StyleSheet.create({
  surface: {
    padding: 6,
    borderRadius: 4,
    backgroundColor: "rgba(0, 0, 0, 0.4)"
  }
});
