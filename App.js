import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StackNavigation } from "./navigation/Stack";
import { NavigationContainer } from "@react-navigation/native";
import { styles } from "./styles/AppStyles";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/connect";
import { setUser } from "./redux/slices/authSlice";
import { fetchUserProfile } from "./redux/slices/authSlice";

function AuthWatcher() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) {
        dispatch(
          setUser({ uid: u.uid, email: u.email, displayName: u.displayName || "" })
        );
        if (u.email) {
          dispatch(fetchUserProfile({ email: u.email }));
        }
      } else {
        dispatch(setUser(null));
      }
    });
    return unsub;
  }, [dispatch]);
  return null;
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider style={styles.container}>
          <AuthWatcher />
          <StackNavigation />
          <StatusBar style="auto" />
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}
