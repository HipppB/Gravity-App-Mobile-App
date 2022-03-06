import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "../Context/TranslationContext";

function BottomBarComponent({ navigation, ...props }) {
  let active = props.state?.routeNames[props.state?.index];
  const { toggleLangage, langage } = useTranslation();

  console.log(active);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home", { screen: "HomeHome" })}
      >
        <View style={styles.homeButton}>
          <Image
            source={require("../assets/images/home.png")}
            style={[styles.icons, styles.homeIcon]}
          />
          <Text style={styles.homeText}>{langage.homeButton}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Calendar", { screen: "calendarHome" })
        }
        style={active === "Calendar" ? styles.active : {}}
      >
        <LinearGradient
          colors={
            active === "Calendar"
              ? ["#E65F02", "#F4C182", "#FFF0C1"]
              : ["white", "white", "white"]
          }
          locations={[0.3, 0.7, 0.98]}
          start={{ x: -0.3, y: 0 }}
          end={{ x: 1.2, y: 0 }}
          style={[styles.activeButtonGradient]}
        >
          <Image
            source={require("../assets/images/calendar.png")}
            style={[
              styles.icons,
              active === "Calendar" ? styles.activeIcon : styles.inactiveIcon,
            ]}
          />
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Sponsor", { screen: "sponsorHome" })
        }
        style={active === "Sponsor" ? styles.active : {}}
      >
        <LinearGradient
          colors={
            active === "Sponsor"
              ? ["#E65F02", "#F4C182", "#FFF0C1"]
              : ["white", "white", "white"]
          }
          locations={[0.3, 0.7, 0.98]}
          start={{ x: -0.3, y: 0 }}
          end={{ x: 1.2, y: 0 }}
          style={[styles.activeButtonGradient]}
        >
          <Image
            source={require("../assets/images/hands.png")}
            style={[
              styles.icons,
              active === "Sponsor" ? styles.activeIcon : styles.inactiveIcon,
            ]}
          />
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Event")}
        style={active === "Event" ? styles.active : {}}
      >
        <LinearGradient
          colors={
            active === "Event"
              ? ["#E65F02", "#F4C182", "#FFF0C1"]
              : ["white", "white", "white"]
          }
          locations={[0.3, 0.7, 0.98]}
          start={{ x: -0.3, y: 0 }}
          end={{ x: 1.2, y: 0 }}
          style={[styles.activeButtonGradient]}
        >
          <Image
            source={require("../assets/images/games.png")}
            style={[
              styles.icons,
              active === "Event" ? styles.activeIcon : styles.inactiveIcon,
            ]}
          />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: 100,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  homeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
  },
  homeIcon: {
    tintColor: "white",
    marginRight: 15,
    width: 30,
    height: 30,
  },
  homeText: {
    color: "white",
    fontFamily: "ChangaOne_400Regular",
    fontSize: 17,
  },
  icons: {
    width: 40,
    height: 40,
  },

  activeIcon: {
    tintColor: "white",
  },
  inactiveIcon: { tintColor: "black" },

  activeButtonGradient: {
    padding: 5,
    backgroundColor: "#E8E8E8",
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 12,
  },
});

export default BottomBarComponent;
