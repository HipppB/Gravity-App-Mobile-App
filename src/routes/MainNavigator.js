import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginView from "../views/LoginView";
import ConnexionView from "../views/ConnexionView";

import TabNavigator from "./TabNavigator";

import NotificationCenterView from "../views/NotificationCenterView";

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
const Stack = createStackNavigator();

function MainNavigator(props) {
  const { isAuthentificated } = useAuthentification();
  const [isAutoLoging, setAutoLoging] = useState(true);
  let [fontsLoaded] = useFonts({
    ChangaOne_400Regular,
    ChangaOne_400Regular_Italic,
    Neon: require("../assets/fonts/Neon.ttf"),
  });

  const { autoLogin } = useAuthentification();
  useEffect(() => {
    autoLogin(setAutoLoging(false));
  }, []);

  if (!fontsLoaded && isAutoLoging) {
    return <LoginViewOld />;
  }

  return (
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
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
export default MainNavigator;
