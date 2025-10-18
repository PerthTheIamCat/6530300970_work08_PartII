import { View } from "react-native";
import { styles } from "../styles/ProfileStyles";
import { StatusBar } from "expo-status-bar";

import CustomInput from "../components/input/CustomInput";
import CustomButton from "../components/Button/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../redux/slices/authSlice";

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const { user, profile } = useSelector((state) => state.auth);
  return (
    <View style={styles.profileContainer}>
      <View style={styles.flex1}></View>
      <View style={styles.profileData}>
        <CustomInput placeholder="firstname" value={profile?.firstname || ""} />
        <CustomInput placeholder="lastname" value={profile?.lastname || ""} />
        <CustomInput placeholder="studentID" value={profile?.studentID || ""} />
        <CustomInput placeholder="username" value={user?.email || ""} />
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
