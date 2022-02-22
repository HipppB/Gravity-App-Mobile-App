import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginView from "../views/LoginView";
import EventView from "../views/EventView";

import {
  useFonts,
  ChangaOne_400Regular,
  ChangaOne_400Regular_Italic,
} from "@expo-google-fonts/changa-one";

import { View, Text, SafeAreaView } from "react-native";
import LoginViewOld from "../views/LoginViewOld";
const Stack = createNativeStackNavigator();

function MainNavigator(props) {
  let [fontsLoaded] = useFonts({
    ChangaOne_400Regular,
    ChangaOne_400Regular_Italic,
  });
  useEffect(() => {
    console.log(fontsLoaded);
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <LoginViewOld />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginView} />
        <Stack.Screen name="Event" component={EventView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigator;
