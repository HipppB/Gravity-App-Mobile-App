import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EventView from "../views/Events/EventView";
import SpecialEventView from "../views/Events/SpecialEventView";
import LongEventView from "../views/Events/LongEventView";
const EventStack = createStackNavigator();

function EventNavigator(props) {
  return (
    <EventStack.Navigator screenOptions={{ headerShown: false }}>
      <EventStack.Screen name="EventHome" component={EventView} />
      <EventStack.Screen name="SpecialEvent" component={SpecialEventView} />
      <EventStack.Screen name="LongEvent" component={LongEventView} />
    </EventStack.Navigator>
  );
}

export default EventNavigator;
