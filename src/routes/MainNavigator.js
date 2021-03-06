import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginView from "../views/LoginView";
import ConnexionView from "../views/ConnexionView";

import TabNavigator from "./TabNavigator";

import NotificationCenterView from "../views/NotificationCenterView";
import DrawWithHeads from "../views/Events/DrawWithHeads";
import ChatView from "../views/ChatView";
import FirstConnexionPopUp from "../views/FirstConnexionPopUp";
import ListOfParticipantView from "../views/ListOfParticipantView";
import PublicProfilView from "../views/PublicProfilView";
import {
  useFonts,
  ChangaOne_400Regular,
  ChangaOne_400Regular_Italic,
} from "@expo-google-fonts/changa-one";

import LoginViewOld from "../views/LoginViewOld";
import { useAuthentification } from "../Context/AuthContext";
import PushNotification from "react-native-push-notification";
import { useTheme } from "../Context/theme/ThemeContext";
const Stack = createStackNavigator();

function MainNavigator(props) {
  function createChannels() {
    PushNotification.createChannel({
      channelId: "test-channel",
      channelName: "Test Channel",
    });
  }
  const { isAuthentificated } = useAuthentification();
  const [isAutoLoging, setAutoLoging] = useState(true);
  let [fontsLoaded] = useFonts({
    ChangaOne_400Regular,
    ChangaOne_400Regular_Italic,
    Neon: require("../assets/fonts/Neon.ttf"),
  });

  const { autoLogin, setdeviceFcmToken } = useAuthentification();
  useEffect(() => {
    createChannels();
    autoLogin(setAutoLoging(false));
    setdeviceFcmToken(props?.fcmToken);
  }, []);

  if (!fontsLoaded || isAutoLoging) {
    return <LoginViewOld />;
  }

  const { themeStyle } = useTheme();
  return (
    <>
      <StatusBar
        backgroundColor={themeStyle.background}
        hideTransitionAnimation="true"
        animated={false}
      />
      <NavigationContainer>
        {!isAuthentificated ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginView} />
            <Stack.Screen name="Connexion" component={ConnexionView} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen
              name="Notifications"
              options={{ presentation: "modal" }}
              component={NotificationCenterView}
            />
            <Stack.Screen
              name="Welcome"
              options={{ presentation: "modal" }}
              component={FirstConnexionPopUp}
            />
            <Stack.Screen
              name="ParticipantList"
              options={{ presentation: "modal" }}
              component={ListOfParticipantView}
            />
            <Stack.Screen
              name="PublicProfil"
              options={{ presentation: "modal" }}
              component={PublicProfilView}
            />

            <Stack.Screen name="Chat" component={ChatView} />
            <Stack.Screen name="DrawWithHeads" component={DrawWithHeads} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </>
  );
}
export default MainNavigator;
