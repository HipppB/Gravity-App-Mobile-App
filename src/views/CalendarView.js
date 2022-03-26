import React from "react";
import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import BottomBarComponent from "../components/BottomBarComponent";
import HeaderComponenent from "../components/HeaderComponenent";
import CalendarComponent from "../components/CalendarComponent";
import getCalendar from "../data/getCalendar";
import { useTheme } from "../Context/theme/ThemeContext";

const { width, height } = Dimensions.get("screen");

function CalendarView(props) {
  let eventList = getCalendar();
  const { themeStyle } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: themeStyle.background }]}
    >
      <HeaderComponenent navigation={props.navigation} />
      <ScrollView style={styles.bodyScrollContainer}>
        <View style={styles.bodyContainer}>
          {eventList.map((event) => (
            <CalendarComponent
              event={event}
              key={event.id}
              navigation={props.navigation}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: height * 0.05,
    backgroundColor: "white",
    justifyContent: "space-between",
    height: "100%",

    display: "flex",
  },
  bodyScrollContainer: {
    flexGrow: 1,
  },
  bodyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});

export default CalendarView;
