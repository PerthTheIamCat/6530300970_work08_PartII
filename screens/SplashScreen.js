import { View, Text, ImageBackground } from "react-native";
import { styles } from "../styles/SplashStyles";

export default function SplashScreen() {
  const BG_IMG = { uri: "https://i.ibb.co/C1L3wSC/13186366-5125962.jpg" };
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
