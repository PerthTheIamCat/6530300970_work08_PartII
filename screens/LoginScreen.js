import { View, Image, Pressable, Text, Alert } from "react-native";
import { styles } from "../styles/LoginStyles";
import CustomInput from "../components/input/CustomInput";
import CustomButton from "../components/Button/CustomButton";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInUser, fetchUserProfile } from "../redux/slices/authSlice";

export default function LoginScreen({ navigation }) {
  const LOGO = { uri: "https://i.ibb.co/yyzQ43h/KU-Logo-PNG.png" };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);
  return (
    <View style={styles.loginContainer}>
      <View style={styles.flex1}></View>
      <View style={styles.loginForm}>
        <Image source={LOGO} style={styles.logo} resizeMode="contain" />
        <CustomInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <CustomInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
        <CustomButton
          label="Sign In"
          onPress={() => {
            dispatch(signInUser({ email, password }))
              .unwrap()
              .then((u) => {
                if (u?.email) dispatch(fetchUserProfile({ email: u.email }));
                navigation.replace("Main");
              })
              .catch((e) =>
                Alert.alert(
                  "Login failed",
                  e.message || "Please check your credentials"
                )
              );
          }}
        />
        <CustomButton
          label="Sign Up"
          onPress={() => {
            navigation.navigate("Registration");
          }}
        />
        <Pressable
          style={styles.forgotContainer}
          onPress={() => {
            navigation.navigate("Recover");
          }}
        >
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </Pressable>
      </View>
      <View style={styles.flex1}></View>
    </View>
  );
}
