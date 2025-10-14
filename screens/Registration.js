import { View, Image, Pressable, Text } from "react-native";
import { styles } from "../styles/RegistrationStyles";
import CustomInput from "../components/input/CustomInput";
import CustomButton from "../components/Button/CustomButton";

export default function LoginScreen({ navigation }) {
  const LOGO = { uri: "https://i.ibb.co/yyzQ43h/KU-Logo-PNG.png" };
  return (
    <View style={styles.registrationContainer}>
      <View style={styles.flex1}></View>
      <View style={styles.registrationForm}>
        <Image source={LOGO} style={styles.logo} resizeMode="contain" />
        <CustomInput placeholder="Firstname" />
        <CustomInput placeholder="Lastname" />
        <CustomInput placeholder="StudentID" />
        <CustomInput placeholder="Username" />
        <CustomInput placeholder="Password" />
        <CustomButton label="Register" />
        <CustomButton
          label="Cancel"
          onPress={() => {
            navigation.pop();
          }}
        />
      </View>
      <View style={styles.flex1}></View>
    </View>
  );
}
