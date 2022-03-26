import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  RefreshControl,
} from "react-native";
import BottomBarComponent from "../components/BottomBarComponent";
import HeaderComponenent from "../components/HeaderComponenent";
import CalendarComponent from "../components/CalendarComponent";
import getCalendar from "../data/getCalendar";
import { useTheme } from "../Context/theme/ThemeContext";
import { useAuthentification } from "../Context/AuthContext";
import useFetch from "../data/useFetch";
const { width, height } = Dimensions.get("screen");

function CalendarView(props) {
  const { apiToken } = useAuthentification();
  const [eventList, setEventList] = useState([]);
  const [request, newRequest] = useFetch();
  const [isRefreshing, setRefreshing] = useState(false);
  function updateData() {
    setRefreshing(true);
    newRequest("event/all", "GET", {}, apiToken);
  }
  const { themeStyle } = useTheme();

  useEffect(() => {
    updateData();
  }, []);
  useEffect(() => {
    console.log("RESULT", request);
    if (request?.status === "Done") {
      setEventList(request.content);
      setRefreshing(false);
    }
  }, [request]);

  return (
    <View
      style={[styles.container, { backgroundColor: themeStyle.background }]}
    >
      <HeaderComponenent navigation={props.navigation} />
      <ScrollView
        style={styles.bodyScrollContainer}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={updateData} />
        }
      >
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
