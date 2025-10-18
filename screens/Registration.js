import { View, Image, Pressable, Text, Alert } from "react-native";
import { styles } from "../styles/RegistrationStyles";
import CustomInput from "../components/input/CustomInput";
import CustomButton from "../components/Button/CustomButton";
import { useState } from "react";
import { signUpPromise } from "../firebase/AuthModel";

export default function LoginScreen({ navigation }) {
  const LOGO = { uri: "https://i.ibb.co/yyzQ43h/KU-Logo-PNG.png" };
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [studentID, setStudentID] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onRegister = async () => {
    const trimmedEmail = email.trim();
    if (!firstname || !lastname || !studentID || !trimmedEmail || !password) {
      Alert.alert("Missing fields", "Please fill in all fields.");
      return;
    }
    if (!trimmedEmail.includes("@")) {
      Alert.alert("Invalid email", "Please enter a valid email.");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Weak password", "Password must be at least 6 characters.");
      return;
    }
    try {
      setSubmitting(true);
      await signUpPromise(firstname, lastname, studentID, trimmedEmail, password);
      Alert.alert("Success", "Registration complete.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (e) {
      Alert.alert("Registration failed", e.message || "Unable to register.");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <View style={styles.registrationContainer}>
      <View style={styles.flex1}></View>
      <View style={styles.registrationForm}>
        <Image source={LOGO} style={styles.logo} resizeMode="contain" />
        <CustomInput placeholder="Firstname" value={firstname} onChangeText={setFirstname} />
        <CustomInput placeholder="Lastname" value={lastname} onChangeText={setLastname} />
        <CustomInput placeholder="StudentID" value={studentID} onChangeText={setStudentID} />
        <CustomInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <CustomInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
        <CustomButton label={submitting ? "Please wait..." : "Register"} onPress={onRegister} />
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
