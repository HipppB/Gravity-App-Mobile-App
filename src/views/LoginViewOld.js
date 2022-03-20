import { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  StatusBar,
  Dimensions,
  SafeAreaView,
} from "react-native";

const { width, height } = Dimensions.get("screen");

function LoginViewOld(props) {
  const [isLogging, setIsLogging] = useState(true);
  function toggleLogging() {
    setIsLogging(!isLogging);
  }
  console.log("Status", StatusBar.currentHeight);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" hideTransitionAnimation="false" />

      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/logos/Couleur/Logo.png")}
          style={{
            width: width * 0.8,
            height: width * 0.8,
            resizeMode: "contain",
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",

    alignItems: "center",
  },

  logoContainer: {},
  image: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  logo: {
    height: 150,
    width: 150,
  },
  subContainer: {
    width: "100%",
    alignItems: "center",
  },
  titleContainer: {
    width: "80%",
  },
  text: {
    color: "white",
    fontSize: 52,
    lineHeight: 64,

    textAlign: "left",
  },
  textFirstLine: {},
  textSecondLine: {
    fontWeight: "bold",
    fontStyle: "italic",
  },
  button: {
    marginTop: 50,
    backgroundColor: "white",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    height: 52,
    borderRadius: 10,
    width: "65%",
  },
  buttonText: {
    fontSize: 25,
  },
});
export default LoginViewOld;
