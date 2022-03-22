import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Animated,
  TouchableOpacity,
  Pressable,
  Button,
  Dimensions,
} from "react-native";

import ColoredViewComponent from "./ColoredViewComponent";

function EventComponent(props) {
  const [isOpen, setisOpen] = useState(false);
  const containerHeight = useRef(new Animated.Value(0)).current;
  const opacityContent = useRef(new Animated.Value(0)).current;

  const [contentHeight, setContentHeight] = useState(0);
  useEffect(() => console.log(opacityContent), [opacityContent]);
  function open() {
    Animated.parallel([
      Animated.timing(containerHeight, {
        toValue: 1, // return to start
        useNativeDriver: false,
        duration: 200,
      }),
    ]).start();
  }
  function close() {
    Animated.parallel([
      Animated.timing(containerHeight, {
        toValue: 0, // return to start
        useNativeDriver: false,
        duration: 200,
      }),
    ]).start();
  }
  function toggleOpen() {
    if (!isOpen) {
      setisOpen(true);
      open();
    } else {
      setisOpen(false);
      close();
    }
  }

  return (
    <Pressable onPress={() => toggleOpen()}>
      <Animated.View
        style={[
          styles.container,
          {
            display: "flex",

            flex: 1,
            flexGrow: 1,
            height: containerHeight.interpolate({
              inputRange: [0, 1],
              outputRange: [70, contentHeight + 100],
            }),

            minHeight: 70,
          },
        ]}
      >
        <View style={[styles.containerHeader]}>
          <Image
            source={require("../GravityHeadCrush/images/6.png")}
            style={styles.image}
          />
          <View style={styles.textContainer}>
            <Text
              style={{
                fontFamily: "ChangaOne_400Regular",
                fontSize: 19,

                lineHeight: 20,
              }}
            >
              Nom du défis
            </Text>
            <Text
              style={{
                fontFamily: "ChangaOne_400Regular_Italic",
                fontSize: 17,

                lineHeight: 20,
              }}
            >
              Phrase "Agguicheuse"
            </Text>
          </View>
        </View>
        <View
          onLayout={(event) => {
            var { x, y, width, height } = event.nativeEvent.layout;
            console.log(height);

            setContentHeight(height);
          }}
          style={[
            {
              position: "absolute",
              top: 75,
              flexShrink: 1,
              opacity: isOpen ? 1 : 0,

              left: 0,
              right: 0,
            },
          ]}
        >
          <Text
            style={{
              paddingHorizontal: 10,

              fontFamily: "ChangaOne_400Regular_Italic",
              fontSize: 15,
              opacity: 0.7,
              lineHeight: 20,
            }}
          >
            Bizzarement sur cette page ça m'a pris 10 minutes (mais c'est pas
            fini j'attend les instructions, en attendant vous pouvez jouer avec
            les têtes du bureau avec ce gros bouton bleu juste en dessus)
          </Text>
          <TouchableOpacity
            style={[styles.buttonTouchableContainer]}
            onPress={() => props.navigation.navigate("DrawWithHeads")}
          >
            <ColoredViewComponent
              coloredViewStyle={styles.buttonContainer}
              containerStyle={styles.buttonContainerContainer}
              isBlue
            >
              <Text style={styles.buttonText}>Je joue avec le bureau</Text>
            </ColoredViewComponent>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
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

    elevation: 15,
  },
  containerHeader: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 8,
    borderRadius: 10,
    backgroundColor: "black",
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

export default EventComponent;
