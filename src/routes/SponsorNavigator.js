import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SponsorView from "../views/Sponsors/SponsorView";
import RestaurantView from "../views/Sponsors/RestaurantView";
import RestaurantDetailView from "../views/Sponsors/RestaurantDetailView";

const SponsorStack = createStackNavigator();

function SponsorNavigator(props) {
  return (
    <SponsorStack.Navigator screenOptions={{ headerShown: false }}>
      <SponsorStack.Screen name="sponsorHome" component={SponsorView} />
      <SponsorStack.Screen
        name="sponsorRestaurant"
        component={RestaurantView}
      />
      <SponsorStack.Screen
        name="DetailResto"
        component={RestaurantDetailView}
      />
    </SponsorStack.Navigator>
  );
}

export default SponsorNavigator;
