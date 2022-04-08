import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useTheme } from "../Context/theme/ThemeContext";

import HeaderComponenent from "../components/HeaderComponenent";
import GravityView from "./Home/GravityView";
import { LinearGradient } from "expo-linear-gradient";
import BottomBarComponent from "../components/BottomBarComponent";
import { useTranslation } from "../Context/TranslationContext";
import ProjetPedaView from "./Home/ProjetPedaView";
import SonView from "./Home/SonView";
import { useAuthentification } from "../Context/AuthContext";
import FirstConnexionPopUp from "./FirstConnexionPopUp";
import useFetch from "../data/useFetch";
import PoleView from "./Home/PoleView";
import FilmView from "./Home/FilmView";
import FoodView from "./Home/FoodView";
import notifee from "@notifee/react-native";
const { width, height } = Dimensions.get("screen");
function HomeView(props) {
  useEffect(() => {
    notifee.setBadgeCount(0);
  }, []);
  const { themeStyle } = useTheme();

  const [statusProject, requestProject] = useFetch();
  const [statusMusic, requestMusic] = useFetch();
  const [statusFilm, requestFilm] = useFetch();
  const [statusReceipt, requestReceipt] = useFetch();

  const { toggleLangage, langage, selectedLangage } = useTranslation();
  const { isFirstLogin, setIsFirstLogin, apiToken } = useAuthentification();
  const [activePage, setActivePage] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);

  //Page active :
  const [project, setProject] = useState(false);
  const [music, setMusic] = useState(false);
  const [film, setFilm] = useState(false);
  const [receipt, setReceipt] = useState(false);

  let scrollViewSelector = useRef();
  let scrollViewPages = useRef();
  function changeActivePage(pageNumber) {
    setActivePage(pageNumber);

    scrollViewPages.current.scrollTo({
      x: pageNumber * width,
      animated: true,
    });
  }

  useEffect(async () => {
    if (isFirstLogin) {
      setIsFirstLogin(false);
      setTimeout(() => setModalVisible(true), 100);
    }
    requestProject("presentation/status/5", "GET", {}, apiToken);
    requestMusic("presentation/status/7", "GET", {}, apiToken);
    requestFilm("presentation/status/8", "GET", {}, apiToken);
    requestReceipt("presentation/status/9", "GET", {}, apiToken);
  }, []);
  useEffect(() => {
    if (statusProject?.status === "Done") {
      setProject(statusProject.content);
    }
  }, [statusProject]);
  useEffect(() => {
    if (statusMusic?.status === "Done") {
      setMusic(statusMusic.content);
    }
  }, [statusMusic]);
  useEffect(() => {
    if (statusFilm?.status === "Done") {
      setFilm(statusFilm.content);
    }
  }, [statusFilm]);
  useEffect(() => {
    if (statusReceipt?.status === "Done") {
      setReceipt(statusReceipt.content);
    }
  }, [statusReceipt]);

  return (
    <View
      style={[styles.container, { backgroundColor: themeStyle.background }]}
    >
      <FirstConnexionPopUp
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        navigation={props.navigation}
      />
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
                  : [
                      themeStyle.backDifferent,
                      themeStyle.backDifferent,
                      themeStyle.backDifferent,
                    ]
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
                  : [
                      themeStyle.backDifferent,
                      themeStyle.backDifferent,
                      themeStyle.backDifferent,
                    ]
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
          {project && (
            <TouchableOpacity onPress={() => changeActivePage(2)}>
              <LinearGradient
                colors={
                  activePage == 2
                    ? ["#0C1316", "#203C42", "#2293D0"]
                    : [
                        themeStyle.backDifferent,
                        themeStyle.backDifferent,
                        themeStyle.backDifferent,
                      ]
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
          )}
          {music && (
            <TouchableOpacity onPress={() => changeActivePage(3)}>
              <LinearGradient
                colors={
                  activePage == 3
                    ? ["#0C1316", "#203C42", "#2293D0"]
                    : [
                        themeStyle.backDifferent,
                        themeStyle.backDifferent,
                        themeStyle.backDifferent,
                      ]
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
          )}
          {film && (
            <TouchableOpacity onPress={() => changeActivePage(4)}>
              <LinearGradient
                colors={
                  activePage == 4
                    ? ["#0C1316", "#203C42", "#2293D0"]
                    : [
                        themeStyle.backDifferent,
                        themeStyle.backDifferent,
                        themeStyle.backDifferent,
                      ]
                }
                end={{ x: 1, y: 0 }}
                locations={[0.0, 0.25, 0.75]}
                start={{ x: -0.3, y: 0 }}
                style={styles.buttonSelectorView}
              >
                <Text
                  style={[
                    styles.buttonSelectorViewText,
                    activePage == 4 ? styles.buttonSelectorViewTextActive : {},
                  ]}
                >
                  Film
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
          {receipt && (
            <TouchableOpacity onPress={() => changeActivePage(5)}>
              <LinearGradient
                colors={
                  activePage == 5
                    ? ["#0C1316", "#203C42", "#2293D0"]
                    : [
                        themeStyle.backDifferent,
                        themeStyle.backDifferent,
                        themeStyle.backDifferent,
                      ]
                }
                end={{ x: 1, y: 0 }}
                locations={[0.0, 0.25, 0.75]}
                start={{ x: -0.3, y: 0 }}
                style={styles.buttonSelectorView}
              >
                <Text
                  style={[
                    styles.buttonSelectorViewText,
                    activePage == 5 ? styles.buttonSelectorViewTextActive : {},
                  ]}
                >
                  Recettes pétillantes
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
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
              x: (e.nativeEvent.contentOffset.x / width) * 90,
              animated: false,
            });
          }}
        >
          <ScrollView style={styles.pageInPageContainer}>
            <GravityView />
          </ScrollView>
          <ScrollView
            style={[styles.pageInPageContainer, { paddingHorizontal: 0 }]}
          >
            <PoleView navigation={props.navigation} />
          </ScrollView>
          {project && (
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
          )}
          {music && (
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
          )}
          {film && (
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
                <FilmView />
              </Text>
            </View>
          )}
          {receipt && (
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
                <FoodView />
              </Text>
            </View>
          )}
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
