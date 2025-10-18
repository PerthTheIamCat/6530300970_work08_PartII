import { View, Image, Alert } from "react-native";
import { styles } from "../styles/ProfileStyles";
import { StatusBar } from "expo-status-bar";

import CustomInput from "../components/input/CustomInput";
import CustomButton from "../components/Button/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser, fetchUserProfile } from "../redux/slices/authSlice";
import { useEffect, useState } from "react";
import { updateUserProfile } from "../firebase/AuthModel";

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const { user, profile } = useSelector((state) => state.auth);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [studentID, setStudentID] = useState("");
  const [saving, setSaving] = useState(false);
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    setFirstname(profile?.firstname || "");
    setLastname(profile?.lastname || "");
    setStudentID(profile?.studentID || "");
    setPhotoURL(profile?.photoURL || "");
  }, [profile]);

  const onSave = async () => {
    try {
      setSaving(true);
      await updateUserProfile({ firstname, lastname, studentID, photoURL });
      if (user?.email) dispatch(fetchUserProfile({ email: user.email }));
      Alert.alert("Saved", "Profile updated successfully.");
    } catch (e) {
      Alert.alert("Failed", e.message || "Could not update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.profileContainer}>
      <View style={styles.flex1}></View>
      <View style={styles.profileData}>
        <Image
          source={{
            uri: photoURL || "https://i.ibb.co/yyzQ43h/KU-Logo-PNG.png",
          }}
          style={styles.avatar}
        />
        <CustomInput
          placeholder="photo URL"
          value={photoURL}
          onChangeText={setPhotoURL}
        />
        <CustomInput
          placeholder="firstname"
          value={firstname}
          onChangeText={setFirstname}
        />
        <CustomInput
          placeholder="lastname"
          value={lastname}
          onChangeText={setLastname}
        />
        <CustomInput
          placeholder="studentID"
          value={studentID}
          onChangeText={setStudentID}
        />
        <CustomInput
          placeholder="username"
          value={user?.email || ""}
          editable={false}
        />
        <CustomButton
          label={saving ? "Saving..." : "Save Profile"}
          onPress={onSave}
        />
        <CustomButton
          label="Sign out"
          onPress={() => {
            dispatch(signOutUser()).finally(() => {
              const parent = navigation.getParent?.();
              if (parent) parent.navigate("Login");
              else navigation.navigate("Login");
            });
          }}
        />
        <CustomButton
          label="Go to Splash"
          onPress={() => {
            navigation.replace("Splash");
          }}
        />
      </View>
      <View style={styles.flex1}></View>
      <StatusBar style="light" />
    </View>
  );
}
