// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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
const analytics = getAnalytics(app);
