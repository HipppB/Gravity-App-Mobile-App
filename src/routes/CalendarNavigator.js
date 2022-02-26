import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DetailCalendarView from "../views/DetailCalendarView";
import CalendarView from "../views/CalendarView";
const CalendarStack = createStackNavigator();

function CalendarNavigator(props) {
  return (
    <CalendarStack.Navigator screenOptions={{ headerShown: false }}>
      <CalendarStack.Screen name="calendarHome" component={CalendarView} />
      <CalendarStack.Screen
        name="calendarDetails"
        component={DetailCalendarView}
      />
    </CalendarStack.Navigator>
  );
}

export default CalendarNavigator;
