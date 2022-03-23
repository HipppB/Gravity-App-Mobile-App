import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DrawingBoard from "../../components/DrawingBoard";
const { width, height } = Dimensions.get("screen");
console.log(width, height);
function DrawWithHeads(props) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        source={require("../../assets/images/logos/Couleur/Logo.png")}
        style={{
          maxWidth: width * 0.8,
          maxHeight: width * 0.8,
          resizeMode: "contain",
          position: "absolute",
          left: width / 2 - (width * 0.8) / 2,
          top: height / 2 - (width * 0.8) / 2,
        }}
      />
      <DrawingBoard />
      <Text>
        Profitez de cette page c'est la derniere fois que vous la voyez
        surement, plus personne ne pourra ensuite jouer avec les têtes du bureau
        ni faire de beau dessins (On te vois Théo)
      </Text>
      <Button
        title="Après vous serez redirigé là avec le bouton d'avant"
        onPress={() => props.navigation.navigate("LongEvent")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default DrawWithHeads;
