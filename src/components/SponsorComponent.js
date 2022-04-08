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
  Linking,
  Platform,
  LayoutAnimation,
  UIManager,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ColoredViewComponent from "./ColoredViewComponent";
import { useTranslation } from "../Context/TranslationContext";
import { useTheme } from "../Context/theme/ThemeContext";
import { useAuthentification } from "../Context/AuthContext";
function SponsorComponent({ sponsor }) {
  const [isOpen, setisOpen] = useState(false);
  const [image, setImage] = useState();
  const containerHeight = useRef(new Animated.Value(0)).current;
  const { apiToken } = useAuthentification();
  const { toggleLangage, langage } = useTranslation();
  const { themeStyle } = useTheme();
  if (Platform.OS === "android") {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  const [contentHeight, setContentHeight] = useState(0);
  useEffect(() => {
    setImage({
      uri: "https://api.liste-gravity.fr/static/image/" + sponsor.picture,
      headers: { Authorization: "Bearer " + apiToken },
    });
  }, [sponsor]);
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

  const [layoutOpen, setLayoutOpen] = useState(false);

  return (
    <Pressable
      onPress={() => {
        toggleOpen();
        LayoutAnimation.configureNext({
          duration: 100,
          create: { type: "linear", property: "opacity" },
          update: { type: "spring", springDamping: 0.1 },
          delete: { type: "linear", property: "opacity" },
        });
        setLayoutOpen(!layoutOpen);
      }}
    >
      <Animated.View
        style={[
          styles.container,
          {
            display: "flex",
            backgroundColor: themeStyle.backless,
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
          <Image source={image} style={styles.image} />
          <View style={styles.textContainer}>
            <Text
              style={{
                fontFamily: "ChangaOne_400Regular",
                fontSize: 19,
                color: themeStyle.text,
                lineHeight: 20,
              }}
            >
              {sponsor.name}
            </Text>
            <Text
              style={{
                fontFamily: "ChangaOne_400Regular_Italic",
                fontSize: 17,
                maxWidth: "90%",
                color: themeStyle.textless,
                lineHeight: 20,
              }}
              numberOfLines={1}
            >
              {sponsor.translation[0].context_text}
            </Text>
          </View>
        </View>
        {layoutOpen && (
          <View
            onLayout={(event) => {
              var { x, y, width, height } = event.nativeEvent.layout;

              setContentHeight(height);
            }}
            style={[
              {
                position: "absolute",

                top: 75,
                flexShrink: 1,
                left: 0,
                right: 0,
              },
            ]}
          >
            <Text
              style={{
                paddingHorizontal: 10,
                color: themeStyle.textless,
                fontFamily: "ChangaOne_400Regular_Italic",
                fontSize: 15,
                opacity: 0.7,
                lineHeight: 20,
              }}
            >
              {sponsor.translation[0].description}
            </Text>
            <TouchableOpacity
              style={[styles.buttonTouchableContainer]}
              onPress={() => Linking.openURL(sponsor.link)}
            >
              <ColoredViewComponent
                coloredViewStyle={styles.buttonContainer}
                containerStyle={styles.buttonContainerContainer}
                isBlue
              >
                <Text style={styles.buttonText}>{langage.moreDetails}</Text>
              </ColoredViewComponent>
            </TouchableOpacity>
          </View>
        )}
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

export default SponsorComponent;
