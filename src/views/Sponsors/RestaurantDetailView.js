import React, { useState, useEffect } from "react";
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
import { useTheme } from "../../Context/theme/ThemeContext";
import { useTranslation } from "../../Context/TranslationContext";
import getImage from "../../components/data/getImage";
import { useAuthentification } from "../../Context/AuthContext";

function RestaurantDetailView({ route, navigation }) {
  const { themeStyle } = useTheme();
  const { langage } = useTranslation();
  const restaurant = route.params;

  const { apiToken } = useAuthentification();

  function openInApp() {
    let lat = 48.84554;
    let lon = 2.32779;
    Linking.openURL(restaurant.link);
  }
  const [image, setImage] = useState();
  useEffect(() => getImage(restaurant.picture, apiToken, setImage), []);
  return (
    <View
      style={{
        backgroundColor: themeStyle.background,
        flex: 1,
      }}
    >
      <HeaderComponenent navigation={navigation} title={restaurant.name} />
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <Image
            source={{
              uri: image,
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
                color: themeStyle.textless,
              }}
            >
              {langage.gravityOffer}
            </Text>
            <Text
              style={{
                fontFamily: "Neon",
                lineHeight: 20,
                fontSize: 18,
                color: themeStyle.textless,
              }}
            >
              {restaurant.translation[0].description}
            </Text>
            <Text
              style={{
                fontFamily: "ChangaOne_400Regular",
                fontSize: 25,
                alignSelf: "flex-start",
                marginTop: 20,
                marginBottom: 10,
                color: themeStyle.textless,
                width: "100%",
              }}
            >
              {langage.restaurantAccess}
            </Text>
            <Text
              style={{
                fontFamily: "Neon",
                lineHeight: 20,
                fontSize: 18,
                marginBottom: 10,
                color: themeStyle.textless,
                width: "100%",
              }}
            >
              {restaurant.translation[0].context_text}
            </Text>
            <MapView
              style={styles.mapContainer}
              showsUserLocation
              initialRegion={{
                latitude: restaurant.location.coordinates[1],
                longitude: restaurant.location.coordinates[0],
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  latitude: restaurant.location.coordinates[1],
                  longitude: restaurant.location.coordinates[0],
                }}
                title={restaurant.name}
                description={"DEV DESCRIPTION"}
              />
            </MapView>
            <TouchableOpacity onPress={() => openInApp()}>
              <ColoredViewComponent
                coloredViewStyle={styles.realtitleContainer}
              >
                <Text style={styles.titleText}>{langage.go}</Text>
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
