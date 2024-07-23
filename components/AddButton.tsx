import { Pressable, PressableProps, StyleSheet } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from "expo-linear-gradient";

interface AddButtonProps extends PressableProps {}

export const AddButton: React.FC<AddButtonProps> = ({ style, ...props }) => {
  return (
    <Pressable {...props} style={style}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        // Change the colors to what I want in my game
        colors={['#32f055', '#26ab3e']}
        style={[StyleSheet.absoluteFill, styles.background]}
      
      />
      <Ionicons name="add-outline" size={32} color="white" />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  background: {
    borderRadius: 6,
  }
})