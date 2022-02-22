import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginView from "../views/LoginView";
import EventView from "../views/EventView";
const Stack = createNativeStackNavigator();

function MainNavigator(props) {
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
