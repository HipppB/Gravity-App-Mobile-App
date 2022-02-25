import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeView from "../views/HomeView";
import AccountView from "../views/AccountView";
const HomeStack = createStackNavigator();

function HomeNavigator(props) {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeHome" component={HomeView} />
      <HomeStack.Screen name="HomeAccount" component={AccountView} />
    </HomeStack.Navigator>
  );
}

export default HomeNavigator;
