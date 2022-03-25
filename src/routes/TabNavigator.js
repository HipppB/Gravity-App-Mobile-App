import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import BottomBarComponent from "../components/BottomBarComponent";
const Tab = createBottomTabNavigator();

import SponsorNavigator from "./SponsorNavigator";
import HomeNavigator from "./HomeNavigator";
import CalendarNavigator from "./CalendarNavigator";
import EventNavigator from "./EventNavigator";
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
      <Tab.Screen name="Event" component={EventNavigator} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
