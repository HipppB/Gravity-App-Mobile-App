import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeView from "../views/HomeView";
import AccountView from "../views/AccountView";
import EditProfileView from "../views/EditProfileView";
const HomeStack = createStackNavigator();

function HomeNavigator(props) {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeHome" component={HomeView} />
      <HomeStack.Screen name="HomeAccount" component={AccountView} />
      <HomeStack.Screen name="EditAccount" component={EditProfileView} />
    </HomeStack.Navigator>
  );
}

export default HomeNavigator;
