import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SponsorView from "../views/SponsorView";
import RestaurantView from "../views/RestaurantView";
const SponsorStack = createStackNavigator();

function SponsorNavigator(props) {
  return (
    <SponsorStack.Navigator screenOptions={{ headerShown: false }}>
      <SponsorStack.Screen name="sponsorHome" component={SponsorView} />
      <SponsorStack.Screen
        name="sponsorRestaurant"
        component={RestaurantView}
      />
    </SponsorStack.Navigator>
  );
}

export default SponsorNavigator;
