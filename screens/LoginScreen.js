import { View, Image, Pressable, Text } from "react-native";
import { styles } from "../styles/LoginStyles";
import CustomInput from "../components/input/CustomInput";
import CustomButton from "../components/Button/CustomButton";

export default function LoginScreen({ navigation }) {
  const LOGO = { uri: "https://i.ibb.co/yyzQ43h/KU-Logo-PNG.png" };
  return (
    <View style={styles.loginContainer}>
      <View style={styles.flex1}></View>
      <View style={styles.loginForm}>
        <Image source={LOGO} style={styles.logo} resizeMode="contain" />
        <CustomInput placeholder="Username" />
        <CustomInput placeholder="Password" />
        <CustomButton
          label="Sign In"
          onPress={() => {
            navigation.replace("Main");
          }}
        />
        <CustomButton
          label="Sign Up"
          onPress={() => {
            navigation.navigate("Registration");
          }}
        />
        <Pressable style={styles.forgotContainer}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </Pressable>
      </View>
      <View style={styles.flex1}></View>
    </View>
  );
}
