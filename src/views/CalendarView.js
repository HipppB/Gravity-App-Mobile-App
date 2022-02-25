import React from "react";
import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import BottomBarComponent from "../components/BottomBarComponent";
import HeaderComponenent from "../components/HeaderComponenent";
import EventComponent from "../components/EventComponent";
import getCalendar from "../data/getCalendar";
const { width, height } = Dimensions.get("screen");

function CalendarView(props) {
  let eventList = getCalendar();
  return (
    <View style={styles.container}>
      <HeaderComponenent navigation={props.navigation} />
      <ScrollView style={styles.bodyScrollContainer}>
        <View style={styles.bodyContainer}>
          {eventList.map((event) => (
            <EventComponent event={event} key={event.id} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: height * 0.05,
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
