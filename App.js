import React, { useEffect } from "react";

import LoginView from "./src/views/LoginView";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";

import GravityHeadCrush from "./src/views/GravityHeadCrush";
import GravityCrush from "./src/views/GravityCrush";
import MainNavigator from "./src/routes/MainNavigator";
import { AuthProvider } from "./src/Context/AuthContext";
import { TranslationProvider } from "./src/Context/TranslationContext";
import { SafeAreaView } from "react-native-safe-area-context";

import messaging from "@react-native-firebase/messaging";
import notifee from "@notifee/react-native";

async function requestUserPermission() {
  const settings = await notifee.requestPermission();

  if (settings.authorizationStatus >= settings.authorizationStatus.AUTHORIZED) {
    console.log("Permission settings:", settings);
  } else {
    console.log("User declined permissions");
  }
}
async function onAppBootstrap() {
  // Register the device with FCM
  await messaging().registerDeviceForRemoteMessages();

  // Get the token
  const token = await messaging().getToken();

  // Save the token
  console.warn("TOKEN : ", token);
}

function App() {
  useEffect(async () => {
    await notifee.createChannel({
      id: "default",
      name: "Informations générale de Gravity",
      lights: false,
      vibration: true,
    });
    requestUserPermission();
    onAppBootstrap();
  }, []);
  return (
    <TranslationProvider>
      <AuthProvider>
        <MainNavigator />
      </AuthProvider>
    </TranslationProvider>
  );
}

export default App;
