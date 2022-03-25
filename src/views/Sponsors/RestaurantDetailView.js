import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  ActionSheetIOS,
  Platform,
  TouchableOpacity,
  Linking,
} from "react-native";
import HeaderComponenent from "../../components/HeaderComponenent";
const { width, height } = Dimensions.get("screen");
import MapView, { Marker } from "react-native-maps";
import { ScrollView } from "react-native-gesture-handler";
import ColoredViewComponent from "../../components/ColoredViewComponent";

function RestaurantDetailView({ restaurant, route, navigation }) {
  function openInApp() {
    let lat = 48.84554;
    let lon = 2.32779;
    Linking.openURL(
      "https://www.google.com/maps/search/?api=1&query=" + lat + "%2C" + lon
    );
  }
  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <HeaderComponenent navigation={navigation} title={"Nom Restaurant"} />
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <Image
            source={{
              uri: 'https://via.placeholder.com/1000x500?text="Super image placeholder du resto"',
            }}
            style={styles.backgroundImage}
          />
          <View
            style={{
              width: "80%",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "ChangaOne_400Regular",
                fontSize: 25,
                alignSelf: "flex-start",
                marginTop: 20,
                marginBottom: 10,
              }}
            >
              L'offre GRAVITY
            </Text>
            <Text style={{ fontFamily: "Neon", lineHeight: 20, fontSize: 18 }}>
              COOKIES OFFERTS (J'espere sincerement que le respo food offre des
              cookies et qu'il m'en gardera, car c'est bon les cookies)
            </Text>
            <Text
              style={{
                fontFamily: "ChangaOne_400Regular",
                fontSize: 25,
                alignSelf: "flex-start",
                marginTop: 20,
                marginBottom: 10,

                width: "100%",
              }}
            >
              Accès au restaurant
            </Text>
            <Text
              style={{
                fontFamily: "Neon",
                lineHeight: 20,
                fontSize: 18,
                marginBottom: 10,

                width: "100%",
              }}
            >
              Bon ben là c'est un petit texte pour emmener les gens à bon port
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
            <TouchableOpacity onPress={() => openInApp()}>
              <ColoredViewComponent
                coloredViewStyle={styles.realtitleContainer}
              >
                <Text style={styles.titleText}>Y aller</Text>
              </ColoredViewComponent>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: 0.8 * width,
    height: 0.4 * width,
    borderRadius: 30,
  },
  mapContainer: {
    height: width * 0.6,
    width: "100%",
    borderRadius: 30,
  },
  realtitleContainer: {
    marginBottom: 30,
    marginTop: 20,
    width: width * 0.5,
    alignItems: "center",
    height: 50,
    justifyContent: "center",
  },
  titleText: {
    color: "white",
    fontFamily: "ChangaOne_400Regular",
    fontSize: 18,
  },
});

export default RestaurantDetailView;
