import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginView from "../views/LoginView";
import EventView from "../views/EventView";
import ConnexionView from "../views/ConnexionView";
import HomeView from "../views/HomeView";
import {
  useFonts,
  ChangaOne_400Regular,
  ChangaOne_400Regular_Italic,
} from "@expo-google-fonts/changa-one";

import { View, Text, SafeAreaView } from "react-native";
import LoginViewOld from "../views/LoginViewOld";
import { useAuthentification } from "../Context/AuthContext";

import { AuthProvider } from "../Context/AuthContext";
const Stack = createNativeStackNavigator();

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
          <Stack.Screen name="Home" component={HomeView} />
          <Stack.Screen name="Event" component={EventView} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
export default MainNavigator;
