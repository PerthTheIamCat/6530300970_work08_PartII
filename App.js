import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StackNavigation } from "./navigation/Stack";
import { NavigationContainer } from "@react-navigation/native";
import { styles } from "./styles/AppStyles";

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider style={styles.container}>
        <StackNavigation />
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
