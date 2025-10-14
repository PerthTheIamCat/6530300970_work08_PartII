import { TextInput } from "react-native";
import { styles } from "./Styles";

export default function CustomInput({ placeholder }) {
  return <TextInput placeholder={placeholder} style={styles.inputContainer} />;
}
