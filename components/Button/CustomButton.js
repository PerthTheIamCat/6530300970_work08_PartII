import { Pressable, Text } from "react-native";
import { styles } from "./Styles";

export default function CustomButton({ label = "label", onPress = () => {} }) {
  return (
    <Pressable style={styles.buttonContainer} onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}
