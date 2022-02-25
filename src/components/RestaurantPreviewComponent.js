import React from "react";
import { StyleSheet, View, Text } from "react-native";

function RestaurantPreviewComponent({ restaurant, ...props }) {
  return (
    <View style={styles.container}>
      <Text>{restaurant.title}</Text>
      <Text>{restaurant.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightgray",
    padding: 10,
    width: "80%",
    alignSelf: "center",
    height: "80%",
    borderRadius: 10,
  },
});

export default RestaurantPreviewComponent;
