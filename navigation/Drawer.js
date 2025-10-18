import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProfileScreen from "../screens/ProfileScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import FriendsScreen from "../screens/FriendsScreen";

const LOGO = { uri: "https://i.ibb.co/yyzQ43h/KU-Logo-PNG.png" };

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ alignItems: "center", paddingVertical: 24 }}>
        <Image
          source={LOGO}
          style={{ width: 120, height: 120 }}
          resizeMode="contain"
        />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export const DrawerNavigation = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName="Profile"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: "darkgreen" },
        headerTintColor: "white",
        drawerActiveBackgroundColor: "#E8F2DA",
        drawerActiveTintColor: "darkgreen",
        drawerInactiveTintColor: "#6b6b6b",
        drawerItemStyle: { borderRadius: 10, marginHorizontal: 12 },
        drawerLabelStyle: { fontSize: 16, fontWeight: "600" },
      }}
    >
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ focused, color }) => (
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: focused ? "darkgreen" : "transparent",
              }}
            >
              <Ionicons
                name="menu"
                size={18}
                color={focused ? "#fff" : color}
              />
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Change Password"
        component={ChangePasswordScreen}
        options={{
          drawerIcon: ({ focused, color }) => (
            <Ionicons
              name="create-outline"
              size={22}
              color={focused ? "darkgreen" : color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Friends"
        component={FriendsScreen}
        options={{
          drawerLabel: "My friends",
          drawerIcon: ({ focused, color }) => (
            <Ionicons
              name="heart-outline"
              size={22}
              color={focused ? "darkgreen" : color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
