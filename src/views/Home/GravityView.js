import React from "react";
import { StyleSheet, View, Text } from "react-native";
import OutlinedText from "../../components/OutlinedText";
import letterH from "../../assets/Letters/Italique/H.png";
import letteri from "../../assets/Letters/Italique/i.png";
import letters from "../../assets/Letters/Italique/s.png";
import lettert from "../../assets/Letters/Italique/t.png";
import lettero from "../../assets/Letters/Italique/o.png";
import letterr from "../../assets/Letters/Italique/r.png";
import lettere from "../../assets/Letters/Italique/e.png";
import letterd from "../../assets/Letters/Italique/d.png";
function GravityView(props) {
  return (
    <View>
      <View style={styles.labelContainer}>
        <View style={styles.labelTextletterContainer}>
          <OutlinedText
            letterImage={letterH}
            fontHeight={26}
            style={{ marginRight: 1 }}
          />
          <OutlinedText
            letterImage={letteri}
            fontHeight={26}
            style={{ marginRight: 1 }}
          />
          <OutlinedText
            letterImage={letters}
            fontHeight={26}
            style={{ marginRight: 1 }}
          />

          <OutlinedText
            letterImage={lettert}
            fontHeight={26}
            style={{ marginRight: 0 }}
          />
          <OutlinedText
            letterImage={lettero}
            fontHeight={26}
            style={{ marginRight: 0 }}
          />
          <OutlinedText
            letterImage={letteri}
            fontHeight={26}
            style={{ marginRight: 0 }}
          />
          <OutlinedText
            letterImage={letterr}
            fontHeight={26}
            style={{ marginRight: 0 }}
          />
          <OutlinedText
            letterImage={lettere}
            fontHeight={26}
            style={{ marginRight: 7 }}
          />
          <OutlinedText
            letterImage={letterd}
            fontHeight={26}
            style={{ marginRight: 0 }}
          />
          <OutlinedText
            letterImage={lettere}
            fontHeight={26}
            style={{ marginRight: 7 }}
          />
        </View>
        <Text style={styles.labelText}>GRAVITY</Text>
      </View>
      <View style={styles.historyContainer}>
        <Text style={styles.historyText}>
          La gravitation, l'une des quatre interactions fondamentales qui
          régissent l'Univers, est l'interaction physique responsable de
          l'attraction des corps massifs. Elle se manifeste notamment par
          l'attraction terrestre qui nous retient au sol, la gravité, qui est
          responsable de plusieurs manifestations naturelles ; les marées,
          l'orbite des planètes autour du Soleil, la sphéricité de la plupart
          des corps célestes en sont quelques exemples. D'une manière plus
          générale, la structure à grande échelle de l'Univers est déterminée
          par la gravitation. Plusieurs théories ont tenté de rendre compte de
          la gravitation. Actuellement encore, la théorie de la relativité
          générale d'Albert Einstein (1915) reste la plus satisfaisante. Elle
          considère la gravitation comme une manifestation de la courbure de
          l'espace-temps sous l'effet de l'énergie de la matière qui s'y trouve.
          La loi de la gravitation de Newton, élaborée à la fin du xviie siècle,
          demeure cependant une excellente approximation dans les cas non
          relativistes (vitesses faibles par rapport à celle de la lumière et
          masses de l'ordre de la masse solaire ou inférieures).
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  labelContainer: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  labelText: {
    color: "black",
    fontSize: 28,
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
  historyContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  historyText: {
    fontFamily: "Modern-Deco",
    fontSize: 20,
    lineHeight: 23,
    textAlign: "justify",
  },
});

export default GravityView;
