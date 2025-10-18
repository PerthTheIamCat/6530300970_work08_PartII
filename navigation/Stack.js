import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import Registration from "../screens/Registration";
import ForgetPasswordScreen from "../screens/ForgetPasswordScreen";

import { DrawerNavigation } from "./Drawer";

export const StackNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={"Splash"}
      screenOptions={{
        headerStyle: { backgroundColor: "#EEFCDC" },
        headerTitleAlign: "center",
        headerTitleStyle: { fontSize: 20 },
      }}
    >
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen
        name="Main"
        component={DrawerNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Recover" component={ForgetPasswordScreen} />
    </Stack.Navigator>
  );
};
