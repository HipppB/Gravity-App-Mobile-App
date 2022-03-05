import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderComponenent from "../components/HeaderComponenent";
import ColoredViewComponent from "../components/ColoredViewComponent";
import letterAA from "../assets/Letters/Italique/aa.png";
import letterp from "../assets/Letters/Italique/p.png";
import letterr from "../assets/Letters/Italique/r.png";
import lettero from "../assets/Letters/Italique/o.png";
import letters from "../assets/Letters/Italique/s.png";
import letterd from "../assets/Letters/Italique/d.png";
import lettere from "../assets/Letters/Italique/e.png";
import OutlinedText from "../components/OutlinedText";
const { width, height } = Dimensions.get("screen");

function DetailCalendarView(props) {
  const event = props.route.params.event;
  return (
    <View style={styles.container}>
      <HeaderComponenent navigation={props.navigation} />
      <ScrollView style={styles.bodyScrollContainer}>
        <View style={styles.bodyContainer}>
          <View style={{ minWidth: "60%", marginBottom: 30 }}>
            <ColoredViewComponent coloredViewStyle={{ height: 40 }}>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                  paddingHorizontal: 10,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontFamily: "ChangaOne_400Regular_Italic",
                    fontSize: 18,
                  }}
                >
                  {event.name}
                </Text>
              </View>
            </ColoredViewComponent>
          </View>
          <View>
            <Image
              source={{
                uri: event.imageUrl,
              }}
              style={styles.backgroundImage}
            />
          </View>
          <View>
            <View style={styles.labelContainer}>
              <View style={styles.labelTextletterContainer}>
                <OutlinedText
                  letterImage={letterAA}
                  fontHeight={15}
                  style={{ marginRight: 7 }}
                />
                <OutlinedText
                  letterImage={letterp}
                  top={3}
                  fontHeight={12}
                  style={{ marginRight: 1 }}
                />
                <OutlinedText
                  letterImage={letterr}
                  fontHeight={9}
                  style={{ marginRight: 1 }}
                />
                <OutlinedText
                  letterImage={lettero}
                  fontHeight={9}
                  style={{ marginRight: 1 }}
                />
                <OutlinedText
                  letterImage={letterp}
                  top={3}
                  fontHeight={12}
                  style={{ marginRight: 1 }}
                />
                <OutlinedText
                  letterImage={lettero}
                  fontHeight={9}
                  style={{ marginRight: 1 }}
                />
                <OutlinedText
                  letterImage={letters}
                  fontHeight={9}
                  style={{ marginRight: 7 }}
                />
                <OutlinedText
                  letterImage={letterd}
                  fontHeight={13}
                  style={{ marginRight: 1 }}
                />
                <OutlinedText
                  letterImage={lettere}
                  fontHeight={9}
                  style={{ marginRight: 7 }}
                />
              </View>
              <Text style={styles.labelText}>{event.name}</Text>
            </View>
          </View>
          <View style={{ width: "80%" }}>
            <Text>Description</Text>

            <View>
              <Text>Ils y participent :</Text>
            </View>
          </View>
          {/* <Text>
            Page à design -{"\n"}
            Vue détaillée de l'event : {"\n"}
            Image de présentation - Où ? Quand ? Quoi ? {"\n"}
            Bouton s'inscrire - Liste des inscrits {"\n"}
            Bouton Ajout au calendrier {"\n"}
            MiniMap avec aperçu de la localisation ? {"\n"}
            Texte decriptif {"\n"}
            Bouton Retour à la liste du calendrier {"\n"}
            Bouton Voiture (Pourras être activé par la com sur certains
            evenements) pour accès vue covoiturage
          </Text> */}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: height * 0.05,
    backgroundColor: "white",
    justifyContent: "space-between",
    height: "100%",
    display: "flex",
  },
  bodyContainer: {
    alignItems: "center",
    paddingTop: 30,
  },
  backgroundImage: {
    width: 0.8 * width,
    height: 0.8 * width,
    borderRadius: 30,
  },
  labelContainer: {
    width: 0.8 * width,
    marginTop: 20,
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "baseline",
  },
  labelTextletterContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  labelText: {
    color: "black",
    fontSize: 18,
    fontFamily: "ChangaOne_400Regular_Italic",
  },

  labelTextLetter: {
    width: 20,
    height: 30,
    resizeMode: "contain",

    tintColor: "black",
    backgroundColor: "red",
  },
});

export default DetailCalendarView;
