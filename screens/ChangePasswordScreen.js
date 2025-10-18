import { View, Alert } from "react-native";
import { styles } from "../styles/ChangePasswordStyles";
import { StatusBar } from "expo-status-bar";

import CustomInput from "../components/input/CustomInput";
import CustomButton from "../components/Button/CustomButton";
import { useState } from "react";
import { changePassword } from "../firebase/AuthModel";

export default function ChangePasswordScreen({ navigation }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async () => {
    if (!oldPassword || !newPassword) {
      Alert.alert("Missing fields", "Please enter old and new password.");
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert("Weak password", "New password must be at least 6 characters.");
      return;
    }
    if (confirmPassword && confirmPassword !== newPassword) {
      Alert.alert("Mismatch", "Confirm password does not match.");
      return;
    }
    try {
      setSubmitting(true);
      await changePassword(oldPassword, newPassword);
      Alert.alert("Success", "Password changed successfully.", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (e) {
      Alert.alert("Change failed", e.message || "Unable to change password.");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <View style={styles.changePasswordContainer}>
      <View style={styles.flex1}></View>
      <View style={styles.changePasswordForm}>
        <CustomInput placeholder="old password" value={oldPassword} onChangeText={setOldPassword} secureTextEntry />
        <CustomInput placeholder="new password" value={newPassword} onChangeText={setNewPassword} secureTextEntry />
        <CustomInput placeholder="confirm password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
        <CustomButton label={submitting ? "Please wait..." : "Change Password"} onPress={onSubmit} />
      </View>
      <View style={styles.flex1}></View>
      <StatusBar style="light" />
    </View>
  );
}
