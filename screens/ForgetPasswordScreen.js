import { View, Alert } from "react-native";
import { styles } from "../styles/ForgetPasswordStyles";
import { StatusBar } from "expo-status-bar";

import CustomInput from "../components/input/CustomInput";
import CustomButton from "../components/Button/CustomButton";
import { useState } from "react";
import { recoverPassword } from "../firebase/AuthModel";

export default function ForgetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onRecover = async () => {
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) {
      Alert.alert("Invalid email", "Please enter a valid email.");
      return;
    }
    try {
      setSubmitting(true);
      await recoverPassword(trimmed);
      Alert.alert("Email sent", "Check your inbox for the reset link.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (e) {
      Alert.alert("Failed", e.message || "Unable to send recovery email.");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <View style={styles.forgetPasswordContainer}>
      <View style={styles.flex1}></View>
      <View style={styles.forgetPasswordForm}>
        <CustomInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <CustomButton
          label={submitting ? "Please wait..." : "Recover"}
          onPress={onRecover}
        />
      </View>
      <View style={styles.flex1}></View>
      <StatusBar style="light" />
    </View>
  );
}
