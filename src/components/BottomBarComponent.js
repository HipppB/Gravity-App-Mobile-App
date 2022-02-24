import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

function BottomBarComponent(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={styles.homeButton}>
          <Image
            source={require("../assets/images/home.png")}
            style={[styles.icons, styles.homeIcon]}
          />
          <Text style={styles.homeText}>Accueil</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={require("../assets/images/calendar.png")}
          style={styles.icons}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={require("../assets/images/hands.png")}
          style={styles.icons}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={require("../assets/images/games.png")}
          style={styles.icons}
        />
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
});

export default BottomBarComponent;
