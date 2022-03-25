import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ColoredViewComponent from "./ColoredViewComponent";
function RestaurantPreviewComponent({ restaurant, navigation, ...props }) {
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
            uri: "https://upload.wikimedia.org/wikipedia/commons/0/0b/RedDot_Burger.jpg",
          }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 20,
            alignSelf: "center",
          }}
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
          <Text style={styles.title}>{restaurant.title}</Text>
          <Text style={styles.adress} selectable>
            {restaurant.adress}
          </Text>
          <Text style={styles.description} numberOfLines={3}>
            {restaurant.longDescription}
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
