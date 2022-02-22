import React, { ReactPropTypes } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";

import ColoredViewComponent from "../components/ColoredViewComponent";
import OutlinedText from "../components/OutlinedText";
import lettere from "../assets/Letters/Normal/e.png";
import letterF from "../assets/Letters/Normal/F.png";
import letterh from "../assets/Letters/Normal/h.png";
import letterl from "../assets/Letters/Normal/l.png";
import lettert from "../assets/Letters/Normal/t.png";
function loginView(props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Text>Animation logo</Text>
        <Text>version noir</Text>
        <Text>GRAVITY</Text>
      </View>

      <ColoredViewComponent
        coloredViewStyle={styles.nameContainer}
        containerStyle={styles.nameContainerContainer}
        isBlue
      >
        <Text style={styles.nameText}>Gravity App</Text>
      </ColoredViewComponent>

      <View style={styles.labelContainer}>
        <View style={styles.labelTextletterContainer}>
          <OutlinedText
            letterImage={letterF}
            fontHeight={32}
            style={{ marginRight: 1 }}
          />
          <OutlinedText
            letterImage={lettere}
            fontHeight={24}
            style={{ marginRight: 1 }}
          />
          <OutlinedText
            letterImage={lettere}
            fontHeight={24}
            style={{ marginRight: 1 }}
          />
          <OutlinedText
            letterImage={letterl}
            fontHeight={32}
            style={{ marginRight: 10 }}
          />

          <OutlinedText
            letterImage={lettert}
            fontHeight={32}
            style={{ marginRight: 1 }}
          />
          <OutlinedText
            letterImage={letterh}
            fontHeight={32}
            style={{ marginRight: 1 }}
          />
          <OutlinedText
            letterImage={lettere}
            fontHeight={24}
            style={{ marginRight: 0 }}
          />
        </View>
        <Text style={styles.labelText}>GRAVITY</Text>
      </View>

      <TouchableOpacity style={styles.buttonTouchableContainer}>
        <ColoredViewComponent
          coloredViewStyle={styles.buttonContainer}
          containerStyle={styles.buttonContainerContainer}
        >
          <Text style={styles.buttonText}>Se connecter</Text>
        </ColoredViewComponent>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  logoContainer: {},
  nameContainerContainer: {
    width: "70%",
    alignItems: "center",
  },
  nameContainer: {
    width: "100%",
    height: 100,
    justifyContent: "center",
  },
  nameText: {
    textAlign: "center",
    color: "white",
    fontWeight: "800",
    fontSize: 20,
  },
  labelContainer: {
    width: "70%",
  },
  labelText: {
    color: "black",
    fontSize: 50,
    fontFamily: "ChangaOne_400Regular_Italic",
  },
  labelTextletterContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  labelTextLetter: {
    width: 20,
    height: 30,
    resizeMode: "contain",

    tintColor: "black",
    backgroundColor: "red",
  },
  buttonTouchableContainer: {
    width: "70%",
    justifyContent: "center",
  },
  buttonContainerContainer: {},
  buttonContainer: {
    width: "100%",
    height: 50,
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "800",
    fontSize: 20,
  },
});

export default loginView;
