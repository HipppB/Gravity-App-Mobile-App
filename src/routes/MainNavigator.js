import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginView from "../views/LoginView";
import ConnexionView from "../views/ConnexionView";

import TabNavigator from "./TabNavigator";

import NotificationCenterView from "../views/NotificationCenterView";
import RestaurantView from "../views/RestaurantView";

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

  let [fontsLoaded] = useFonts({
    ChangaOne_400Regular,
    ChangaOne_400Regular_Italic,
  });
  useEffect(() => {
    console.log("AUTH", isAuthentificated);
  });

  if (!fontsLoaded) {
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
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen
            name="Notifications"
            options={{ presentation: "modal" }}
            component={NotificationCenterView}
          />
          <Stack.Screen name="Restaurants" component={RestaurantView} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
export default MainNavigator;
