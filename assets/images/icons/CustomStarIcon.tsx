// src/assets/images/icons/CustomStarIcon.tsx
import React from "react";
import Svg, { Path } from "react-native-svg";
import { ViewStyle, StyleProp } from "react-native";

type CustomStarIconProps = {
  size: number;
  color: string;
  borderColor?: string;
  borderWidth?: number;
  style?: StyleProp<ViewStyle>; // Add this line to accept style prop
};

const CustomStarIcon = ({
  size,
  color,
  borderColor = "transparent",
  borderWidth = 0,
  style,
}: CustomStarIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
    <Path
      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"
      fill={color}
      stroke={borderColor}
      strokeWidth={borderWidth}
    />
  </Svg>
);

export default CustomStarIcon;
