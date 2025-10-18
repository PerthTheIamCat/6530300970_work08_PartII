import { TextInput } from "react-native";
import { styles } from "./Styles";

export default function CustomInput({ placeholder, value, onChangeText, secureTextEntry = false, keyboardType = "default" }) {
  return (
    <TextInput
      placeholder={placeholder}
      style={styles.inputContainer}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize="none"
    />
  );
}
