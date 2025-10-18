import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDRb1RwGQZeOe3JhORoxR99PTWgIFtW-k4",
  authDomain: "basiclogin-eadcf.firebaseapp.com",
  projectId: "basiclogin-eadcf",
  storageBucket: "basiclogin-eadcf.firebasestorage.app",
  messagingSenderId: "145868001705",
  appId: "1:145868001705:web:e4a01e7243e62c2af974b8",
  measurementId: "G-NESRN3JSET",
};

const app = initializeApp(firebaseConfig);

// Initialize React Native Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { auth };
export default app;
