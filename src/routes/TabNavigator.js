import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeView from "../views/HomeView";
import CalendarView from "../views/CalendarView";
import SponsorView from "../views/SponsorView";
import EventView from "../views/EventView";
import BottomBarComponent from "../components/BottomBarComponent";
const Tab = createBottomTabNavigator();

import SponsorNavigator from "./SponsorNavigator";
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <BottomBarComponent {...props} />}
    >
      <Tab.Screen name="Home" component={HomeView} />
      <Tab.Screen name="Calendar" component={CalendarView} />
      <Tab.Screen name="Sponsor" component={SponsorNavigator} />
      <Tab.Screen name="Event" component={EventView} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
