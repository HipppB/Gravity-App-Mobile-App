import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Animated,
  TouchableOpacity,
  Pressable,
  Platform,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useAuthentification } from "../Context/AuthContext";

import ColoredViewComponent from "./ColoredViewComponent";

function SpecialEventComponent({ event, navigation }) {
  const [eventImage, setEventImage] = useState();
  const { apiToken } = useAuthentification();

  const [dataFuture, setFutureDate] = useState(new Date(event.expiredAt));
  const [timeRemaining, setTimeRemaining] = useState(
    ((dataFuture - Date.now()) / 1000).toFixed(0)
  );

  useFocusEffect(
    useCallback(() => {
      const interval = setInterval(() => {
        setTimeRemaining(((dataFuture - Date.now()) / 1000).toFixed(0));
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }, [timeRemaining])
  );
  function toggleOpen() {
    navigation.navigate("SpecialEvent", event);
  }
  return (
    <Pressable onPress={() => toggleOpen()}>
      <ColoredViewComponent
        containerStyle={[
          styles.container,
          {
            display: "flex",
            flex: 1,
            height: 70,
            marginBottom: 10,
          },
        ]}
      >
        <View style={[styles.containerHeader]}>
          <Image
            source={
              event?.imageUri
                ? {
                    uri:
                      "https://api.liste-gravity.fr/static/image/" +
                      event?.imageUri,
                    headers: { Authorization: "Bearer " + apiToken },
                  }
                : require("../assets/images/logos/Couleur/LogoNoNomNoFond.png")
            }
            style={[styles.image, !event?.imageUri && { resizeMode: "center" }]}
          />
          <View style={styles.textContainer}>
            <Text
              style={{
                fontFamily: "ChangaOne_400Regular",
                fontSize: 19,
                color: "white",
                lineHeight: 20,
              }}
            >
              {event?.translation[0]?.title}
            </Text>
            <Text
              style={{
                fontFamily: "ChangaOne_400Regular_Italic",
                fontSize: 17,
                color: "white",
                lineHeight: 20,
              }}
            >
              {Math.floor(timeRemaining / 3600)}h{" "}
              {Math.floor(timeRemaining / 60) -
                60 * Math.floor(timeRemaining / 3600)}
              m {timeRemaining - 60 * Math.floor(timeRemaining / 60)}s
            </Text>
          </View>
        </View>
      </ColoredViewComponent>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    alignSelf: "center",
    marginTop: 20,

    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: Platform.OS === "ios" ? 15 : 0,
  },
  containerHeader: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
    padding: 8,
  },
  image: {
    marginRight: 8,
    borderRadius: 10,
    resizeMode: "cover",
    width: 50,
    height: 50,
  },
  textContainer: {},
  buttonTouchableContainer: {
    width: "70%",
    alignSelf: "center",
    marginTop: 15,
  },
  buttonContainerContainer: {},
  buttonContainer: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    marginBottom: 0,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontFamily: "ChangaOne_400Regular",
    fontSize: 20,
  },
});

export default SpecialEventComponent;
