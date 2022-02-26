import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function FirstConnexionPopUp(props) {
  return (
    <SafeAreaView>
      <Text>
        Pop Up de bienvenue, n'apparait que lors de la premiere connexion
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default FirstConnexionPopUp;
