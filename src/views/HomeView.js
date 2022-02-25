import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import HeaderComponenent from "../components/HeaderComponenent";
import GravityView from "./Home/GravityView";
import { LinearGradient } from "expo-linear-gradient";
import BottomBarComponent from "../components/BottomBarComponent";
const { width, height } = Dimensions.get("screen");
function HomeView(props) {
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
              Pôles
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
              Projet Pédagogique
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
              Son
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
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
        <ScrollView style={styles.pageInPageContainer}>
          <Text>
            Projet Pédagogique - Voir sous quel forme le mettre (Pdf ?)
          </Text>
        </ScrollView>
        <ScrollView style={styles.pageInPageContainer}>
          <Text>Son - Vidéo youtube ?</Text>
        </ScrollView>
      </ScrollView>

      <BottomBarComponent navigation={props.navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: height * 0.05,
    backgroundColor: "white",
    justifyContent: "space-between",
    maxHeight: height,

    display: "flex",
  },
  buttonSelectorContainer: {
    marginTop: 20,
    height: 100,
  },
  pageContainer: {
    marginTop: 20,
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
