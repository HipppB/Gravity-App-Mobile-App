import React, { useEffect, useState } from "react";

import MainNavigator from "./src/routes/MainNavigator";
import { AuthProvider } from "./src/Context/AuthContext";
import { TranslationProvider } from "./src/Context/TranslationContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeProvider } from "./src/Context/theme/ThemeContext";
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
async function onAppBootstrap(callback) {
  // Register the device with FCM
  await messaging().registerDeviceForRemoteMessages();

  // Get the token
  const token = await messaging().getToken();

  // Save the token
  callback(token);
}

function App() {
  const [fcmToken, setFcmToken] = useState("");
  useEffect(async () => {
    await notifee.createChannel({
      id: "default",
      name: "Informations générale de Gravity",
      lights: false,
      vibration: true,
    });
    requestUserPermission();
    onAppBootstrap(setFcmToken);
  }, []);

  return (
    <TranslationProvider>
      <AuthProvider>
        <ThemeProvider>
          <MainNavigator fcmToken={fcmToken} />
        </ThemeProvider>
      </AuthProvider>
    </TranslationProvider>
  );
}

export default App;
