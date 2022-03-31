import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ColoredViewComponent from "./ColoredViewComponent";

import { useAuthentification } from "../Context/AuthContext";
function RestaurantPreviewComponent({ restaurant, navigation, ...props }) {
  console.log(restaurant);
  const { apiToken } = useAuthentification();

  return (
    // <View style={styles.container}>
    <TouchableOpacity
      style={{ width: "100%", height: "100%" }}
      onPress={() => navigation.push("DetailResto", restaurant)}
    >
      <ColoredViewComponent
        containerStyle={styles.mainContainer}
        isBlue
        coloredViewStyle={styles.container}
        style={styles.container}
      >
        <Image
          source={{
            uri:
              "https://api.liste-gravity.fr/static/image/" + restaurant.picture,
            headers: { Authorization: "Bearer " + apiToken },
          }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 20,
            alignSelf: "center",
          }}
          key={(Math.random * 1000).toFixed}
        />
        <View
          style={{
            width: "80%",
            height: "100%",
            marginLeft: 10,
            justifyContent: "space-between",
            // backgroundColor: "red",
          }}
        >
          <Text style={{ flexDirection: "column" }} numberOfLines={4}>
            <Text style={styles.title}>
              {restaurant.name}
              {"\n"}
            </Text>
            <Text style={styles.adress} selectable>
              {restaurant.translation[0].subtitle}
              {restaurant.translation[0].subtitle && "\n"}
            </Text>
            <Text style={styles.description}>
              {restaurant.translation[0].description}
            </Text>
          </Text>
        </View>
      </ColoredViewComponent>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "80%",
    alignSelf: "center",
    height: "90%",
  },
  container: {
    // backgroundColor: "lightgray",
    paddingHorizontal: 10,
    width: "100%",
    alignSelf: "center",
    height: "100%",
    borderRadius: 10,
    flexDirection: "row",
  },
  title: {
    fontSize: 18,
    fontFamily: "ChangaOne_400Regular",
    color: "white",
  },
  adress: {
    fontSize: 16,
    fontFamily: "ChangaOne_400Regular_Italic",
    color: "white",
  },
  description: {
    fontSize: 15,
    fontFamily: "Neon",
    color: "white",
    marginBottom: 10,
  },
});

export default RestaurantPreviewComponent;
