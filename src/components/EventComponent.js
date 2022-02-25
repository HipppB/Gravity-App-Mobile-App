import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";

const { width, height } = Dimensions.get("screen");

function EventComponent({ event, ...props }) {
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        source={{
          uri: event.imageUrl,
        }}
        style={styles.backgroundImage}
      />
      <Text style={styles.textInfos}>{event.where}</Text>
      <Text style={styles.textName}>{event.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "gray",
    width: 0.8 * width,
    height: 0.8 * width,
    borderRadius: 30,
    padding: 30,
    marginBottom: 20,
  },
  backgroundImage: {
    width: 0.8 * width,
    height: 0.8 * width,
    borderRadius: 30,
    position: "absolute",
  },
  textName: {
    position: "absolute",
    left: 20,
    bottom: 20,
    color: "white",
    fontFamily: "ChangaOne_400Regular_Italic",
    fontSize: 28,
  },
  textInfos: {
    position: "absolute",
    left: 20,
    top: 20,
    color: "white",
    fontFamily: "ChangaOne_400Regular",
    fontSize: 18,
  },
});

export default EventComponent;
