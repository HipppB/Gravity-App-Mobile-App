import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import HeaderComponenent from "../components/HeaderComponenent";
import GravityView from "./Home/GravityView";
import { LinearGradient } from "expo-linear-gradient";
import BottomBarComponent from "../components/BottomBarComponent";
import { useTranslation } from "../Context/TranslationContext";
import ProjetPedaView from "./Home/ProjetPedaView";
import SonView from "./Home/SonView";

const { width, height } = Dimensions.get("screen");
function HomeView(props) {
  const { toggleLangage, langage } = useTranslation();

  const [activePage, setActivePage] = useState(0);
  let scrollViewSelector = useRef();
  let scrollViewPages = useRef();
  function changeActivePage(pageNumber) {
    setActivePage(pageNumber);

    scrollViewPages.current.scrollTo({
      x: pageNumber * width,
      animated: true,
    });
  }
  return (
    <View style={styles.container}>
      <HeaderComponenent navigation={props.navigation} />
      <View style={{ alignItems: "center" }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.buttonSelectorContainer}
          ref={scrollViewSelector}
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
                GRAVITY
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
                {langage.poles}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeActivePage(2)}>
            <LinearGradient
              colors={
                activePage == 2
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
                  activePage == 2 ? styles.buttonSelectorViewTextActive : {},
                ]}
              >
                {langage.projetPeda}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeActivePage(3)}>
            <LinearGradient
              colors={
                activePage == 3
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
                  activePage == 3 ? styles.buttonSelectorViewTextActive : {},
                ]}
              >
                {langage.son}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={{ flex: 1 }}>
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
          <ScrollView style={styles.pageInPageContainer}>
            <GravityView />
          </ScrollView>
          <ScrollView style={styles.pageInPageContainer}>
            <Text>Liste des poles, personnes et description - A design</Text>
          </ScrollView>
          <View
            style={[
              styles.pageInPageContainer,
              {
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <Text>
              <ProjetPedaView />
            </Text>
          </View>
          <View
            style={[
              styles.pageInPageContainer,
              {
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <Text>
              <SonView />
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: height * 0.05,
    backgroundColor: "white",
    // justifyContent: "space-between",
    height: height - 100,

    display: "flex",
  },
  buttonSelectorContainer: {
    marginTop: 10,
  },
  pageContainer: {
    marginTop: 10,
    flexGrow: 1,
    marginBottom: Platform.OS === "ios" ? 0 : 80,
    width: width,
  },
  pageInPageContainer: {
    width: width,
    paddingHorizontal: 20,
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

export default HomeView;
