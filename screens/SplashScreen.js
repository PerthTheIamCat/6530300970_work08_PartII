import { Text, ImageBackground } from "react-native";
import { styles } from "../styles/SplashStyles";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function SplashScreen({ navigation }) {
  const BG_IMG = { uri: "https://i.ibb.co/C1L3wSC/13186366-5125962.jpg" };
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user) navigation.replace("Main");
      else navigation.replace("Login");
    }, 2500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <ImageBackground
      source={BG_IMG}
      style={styles.splashContainer}
      resizeMode="cover"
    >
      <Text style={styles.text}>{"I Love\nReact-Native"}</Text>
    </ImageBackground>
  );
}
