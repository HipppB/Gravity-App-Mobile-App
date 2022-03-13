import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
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
import MapView, { Marker } from "react-native-maps";
import { useTranslation } from "../Context/TranslationContext";

const { width, height } = Dimensions.get("screen");

function DetailCalendarView(props) {
  const { toggleLangage, langage } = useTranslation();

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
                  style={{ marginRight: 0 }}
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
                  style={{ marginRight: 0 }}
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

          <View style={{ width: "80%", marginTop: 10 }}>
            <Text style={{ fontFamily: "Neon", lineHeight: 20, fontSize: 18 }}>
              Ceci est une superbe description d'event, venez nous rejoindre
              pour toujours plus de suprises, le pôle com pourra évidemment
              modifier ce message car bon, ce n'est pas mon job
            </Text>
            <MapView
              style={styles.mapContainer}
              showsUserLocation
              initialRegion={{
                latitude: 48.84554,
                longitude: 2.32779,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{ latitude: 48.84554, longitude: 2.32779 }}
                title={"ISEP NDC"}
                description={"Des crêpes à tomber"}
              />
            </MapView>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
                height: 50,
                position: "relative",
              }}
            >
              <Text
                style={{
                  fontFamily: "ChangaOne_400Regular",
                  fontSize: 18,
                  marginRight: 10,
                }}
              >
                {langage.theyAreIn} :
              </Text>

              <PersonsHeads
                listOfHeads={[
                  require("../GravityHeadCrush/images/1.png"),
                  require("../GravityHeadCrush/images/2.png"),
                  require("../GravityHeadCrush/images/3.png"),
                  require("../GravityHeadCrush/images/4.png"),
                  require("../GravityHeadCrush/images/5.png"),
                ]}
                number={50}
                navigation={props.navigation}
              />
            </View>
            <TouchableOpacity
              style={styles.buttonTouchableContainer}
              onPress={() => console.log("IL PARTICIPE")}
            >
              <ColoredViewComponent
                coloredViewStyle={styles.buttonContainer}
                containerStyle={styles.buttonContainerContainer}
              >
                <Text style={styles.buttonText}>{langage.imInButton}</Text>
              </ColoredViewComponent>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
function PersonsHeads({ listOfHeads, number, navigation }) {
  return (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      {listOfHeads.map((head, index) => (
        <PersonHead
          image={head}
          position={index}
          key={index}
          onPress={() => navigation.navigate("PublicProfil")}
        />
      ))}
      <TouchableOpacity
        style={{
          position: "absolute",
          left: listOfHeads.length * 20,
          alignSelf: "center",
          width: 40,
          height: 40,
          backgroundColor: "#ED8A33",
          borderRadius: 50,
          justifyContent: "center",
          alignItems: "flex-end",
        }}
        onPress={() => navigation.navigate("ParticipantList")}
      >
        <Text
          style={{
            left: 10,
            fontFamily: "ChangaOne_400Regular",
            color: "white",
            fontSize: 13,
            marginRight: 10,
            width: "100%",
            textAlign: "center",
          }}
        >
          +{number}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
function PersonHead({ image, position, onPress }) {
  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        left: position * 20,
        alignSelf: "center",
      }}
      onPress={onPress}
    >
      <Image
        source={image}
        style={{
          width: 40,
          height: 40,
          resizeMode: "cover",
          backgroundColor: "black",
          borderRadius: 50,
        }}
      />
    </TouchableOpacity>
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
  buttonTouchableContainer: {
    marginTop: 10,
    marginBottom: 20,
    width: "70%",
    justifyContent: "center",
    alignSelf: "center",
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
    fontFamily: "ChangaOne_400Regular",
    fontSize: 20,
  },
  mapContainer: {
    marginTop: 20,
    height: 150,
    width: "100%",
    borderRadius: 30,
  },
});

export default DetailCalendarView;
