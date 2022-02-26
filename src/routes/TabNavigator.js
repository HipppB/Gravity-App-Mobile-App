import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import EventView from "../views/EventView";
import BottomBarComponent from "../components/BottomBarComponent";
const Tab = createBottomTabNavigator();

import SponsorNavigator from "./SponsorNavigator";
import HomeNavigator from "./HomeNavigator";
import CalendarNavigator from "./CalendarNavigator";
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <BottomBarComponent {...props} />}
    >
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Calendar" component={CalendarNavigator} />
      <Tab.Screen name="Sponsor" component={SponsorNavigator} />
      <Tab.Screen name="Event" component={EventView} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
