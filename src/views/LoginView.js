import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import ColoredViewComponent from "../components/ColoredViewComponent";
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
        <Text style={styles.labelText}>Feel the</Text>
        <Text style={styles.labelText}>GRAVITY</Text>
      </View>

      <ColoredViewComponent
        coloredViewStyle={styles.buttonContainer}
        containerStyle={styles.buttonContainerContainer}
      >
        <Text style={styles.buttonText}>Se connecter</Text>
      </ColoredViewComponent>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  labelText: {},
  buttonContainerContainer: {
    width: "70%",
  },
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
