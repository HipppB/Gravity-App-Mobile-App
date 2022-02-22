import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import bg1 from "../assets/images/bg1.jpg";
import globe from "../assets/images/globe.gif";
function LoginViewOld(props) {
  const [isLogging, setIsLogging] = useState(true);
  function toggleLogging() {
    setIsLogging(!isLogging);
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={bg1} resizeMode="cover" style={styles.image}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/images/globe.gif")}
            style={styles.logo}
          />
        </View>
        {/* <View style={styles.subContainer}>
          <View style={styles.titleContainer}>
            <Text style={[styles.text, styles.textFirstLine]}>Feel the</Text>
            <Text style={[styles.text, styles.textSecondLine]}>gravity</Text>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Se connecter</Text>
          </TouchableOpacity>
        </View> */}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  logoContainer: {
    justifyContent: "space-evenly",
    alignItems: "center",
    width: 175,
    height: 175,
    borderRadius: 30,
    borderColor: "white",
    borderWidth: 3,
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
