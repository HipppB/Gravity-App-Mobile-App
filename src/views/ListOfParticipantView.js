import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { useTranslation } from "../Context/TranslationContext";
const heads = [
  require("../GravityHeadCrush/images/1.png"),
  require("../GravityHeadCrush/images/2.png"),
  require("../GravityHeadCrush/images/3.png"),
  require("../GravityHeadCrush/images/4.png"),
  require("../GravityHeadCrush/images/5.png"),
  require("../GravityHeadCrush/images/6.png"),
  require("../GravityHeadCrush/images/7.png"),
];

const { width, height } = Dimensions.get("window");
function ListOfParticipantView(props) {
  const { toggleLangage, langage } = useTranslation();
  const num = ((Math.random() * 60) % 6).toFixed(0);

  return (
    <View style={{ padding: 20, paddingTop: 70 }}>
      <Text style={styles.pageTitle}>{langage.participant}</Text>
      <Text>Aucun participant. Rip.</Text>
      <Image
        source={heads[num]}
        style={{
          width: 0.4 * width,
          height: 0.4 * width,
          backgroundColor: "black",
          borderRadius: width,
          resizeMode: "cover",
          alignSelf: "center",
        }}
      />
      <ScrollView
        style={{
          width: "100%",
          height: "auto",
          paddingBottom: 0,
        }}
        contentContainerStyle={{ alignItems: "center" }}
        showsVerticalScrollIndicator={false}
      >
        <Text>
          Cette page n'est pas encore prête, mais vous pouvez prendre quelque
          secondes pour admirer cette magnifique tête choisie au hasard parmis
          les têtes du bureau
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    justifyContent: "center",
    textAlign: "center",
    fontFamily: "ChangaOne_400Regular",
    fontSize: 30,
  },
});

export default ListOfParticipantView;
