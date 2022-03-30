import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import HeaderComponenent from "../../components/HeaderComponenent";
import { useTranslation } from "../../Context/TranslationContext";
import DrawingBoard from "../../components/DrawingBoard";
const { width, height } = Dimensions.get("screen");
import EventComponent from "../../components/EventComponent";
import SpecialEventComponent from "../../components/SpecialEventComponent";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../Context/theme/ThemeContext";
import NewEventList from "./NewEventList";
import SentEventList from "./SentEventList";
function EventView(props) {
  const { themeStyle } = useTheme();
  const { langage } = useTranslation();
  let scrollViewSelector = useRef();
  let scrollViewPages = useRef();
  const [activePage, setActivePage] = useState(0);

  function changeActivePage(pageNumber) {
    setActivePage(pageNumber);

    scrollViewPages.current.scrollTo({
      x: pageNumber * width,
      animated: true,
    });
  }
  return (
    <View
      style={[styles.container, { backgroundColor: themeStyle.background }]}
    >
      <HeaderComponenent navigation={props.navigation} />
      <View style={{ alignItems: "center" }}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.buttonSelectorContainer}
          ref={scrollViewSelector}
          contentContainerStyle={{ width: width, justifyContent: "center" }}
        >
          <TouchableOpacity onPress={() => changeActivePage(0)}>
            <LinearGradient
              colors={
                activePage == 0
                  ? ["#0C1316", "#203C42", "#2293D0"]
                  : ["#E8E8E8", "#E8E8E8", "#E8E8E8"]
              }
              end={{ x: 1, y: 0 }}
              locations={[0.0, 0.25, 0.75]}
              start={{ x: -0.3, y: 0 }}
              style={styles.buttonSelectorView}
            >
              <Text
                style={[
                  styles.buttonSelectorViewText,
                  activePage == 0 ? styles.buttonSelectorViewTextActive : {},
                ]}
              >
                {langage.defis}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeActivePage(1)}>
            <LinearGradient
              colors={
                activePage == 1
                  ? ["#0C1316", "#203C42", "#2293D0"]
                  : ["#E8E8E8", "#E8E8E8", "#E8E8E8"]
              }
              end={{ x: 1, y: 0 }}
              locations={[0.0, 0.25, 0.75]}
              start={{ x: -0.3, y: 0 }}
              style={styles.buttonSelectorView}
            >
              <Text
                style={[
                  styles.buttonSelectorViewText,
                  activePage == 1 ? styles.buttonSelectorViewTextActive : {},
                ]}
              >
                {langage.sent}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={styles.bodyContainer}>
        <ScrollView
          horizontal
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          style={styles.pageContainer}
          ref={scrollViewPages}
          onMomentumScrollEnd={(e) => {
            let newpage = Math.round(
              (e.nativeEvent.contentOffset.x + 0.1) / width
            );
            setActivePage(newpage);
          }}
          scrollEventThrottle={0.1}
          onScroll={(e) => {
            scrollViewSelector.current.scrollTo({
              x: (e.nativeEvent.contentOffset.x / width) * 60,
              animated: false,
            });
          }}
        >
          <View style={styles.bodyContainer}>
            <NewEventList navigation={props.navigation} />
          </View>
          <View style={[styles.bodyContainer]}>
            {/* <SentEventList navigation={props.navigation} /> */}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: height * 0.05,

    justifyContent: "space-between",
    height: "100%",

    display: "flex",
  },
  bodyContainer: {
    flexGrow: 1,
    flex: 1,
    width: width,
  },
  noSponsorContainer: {},
  noSponsorText: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Neon",
  },
  buttonSelectorContainer: {
    marginTop: 10,
  },

  buttonSelectorView: {
    paddingHorizontal: 20,
    backgroundColor: "#E8E8E8",
    justifyContent: "center",
    margin: 5,
    marginLeft: 10,
    height: 50,
    borderRadius: 12,
  },
  buttonSelectorViewActive: {
    backgroundColor: "#2293D0",
  },
  buttonSelectorViewText: {
    fontFamily: "ChangaOne_400Regular_Italic",
    fontSize: 18,
    color: "#8C8C8C",
  },
  buttonSelectorViewTextActive: {
    color: "white",
  },
});

export default EventView;
