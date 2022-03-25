import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import MapView, { Marker } from "react-native-maps";
import { useTranslation } from "../../Context/TranslationContext";

import RestaurantPreviewComponent from "../../components/RestaurantPreviewComponent";
import ColoredViewComponent from "../../components/ColoredViewComponent";
const { width, height } = Dimensions.get("screen");

function RestaurantView(props) {
  let scrollViewRestaurant = useRef();
  const { toggleLangage, langage } = useTranslation();
  const [scrolledPage, setScrolledPage] = useState(0);

  const markers = [
    {
      index: 1,
      latlng: { latitude: 48.84554, longitude: 2.32779 },
      title: "ISEP NDC",
      description: "Campus NDC de l'isep",
      adress: "75000 Paris (Précis hein)",
      longDescription:
        "Super Description qui peut être plus ou moins longue et plus ou moins utile, en tout cas les gens ne manqueront aucune offre food ",
    },
    {
      index: 2,
      latlng: { latitude: 48.84406, longitude: 2.33093 },
      title: "Subway",
      description: "Subway à côté de NDC",
      adress: "France",
      longDescription:
        "Super Description qui peut être plus ou moins longue et plus ou moins utile, en tout cas les gens ne manqueront aucune offre food ",
    },
  ];
  let markerRefList = [];
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{langage.regaleToi}</Text>
      </View>
      <MapView
        style={styles.mapContainer}
        // provider={PROVIDER_GOOGLE}
        showsUserLocation
        initialRegion={{
          latitude: 48.84554,
          longitude: 2.32779,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {markers.map((marker) => {
          let markerRef = useRef();
          let markerIndex = markerRefList.length;
          console.log(markerRefList.length);
          markerRefList.push(markerRef);
          return (
            <Marker
              ref={markerRef}
              onPress={() =>
                scrollViewRestaurant.current.scrollTo({
                  x: markerIndex * width,
                  animated: true,
                })
              }
              key={marker.index}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
            />
          );
        })}
      </MapView>
      <ScrollView
        ref={scrollViewRestaurant}
        style={styles.scrollContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onMomentumScrollEnd={(e) => {
          let newpage = Math.round(e.nativeEvent.contentOffset.x / width);
          // setActivePage(newpage);
          setScrolledPage(newpage);
          markerRefList[newpage].current.showCallout();
        }}
      >
        {markers.map((marker) => (
          <View style={styles.restaurantPreviewContainer} key={marker.index}>
            <RestaurantPreviewComponent
              restaurant={marker}
              navigation={props.navigation}
            />
          </View>
        ))}
      </ScrollView>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "80%",
          justifyContent: "center",
        }}
      >
        {markers.map((marker, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setScrolledPage(index);
                scrollViewRestaurant.current.scrollTo({
                  x: width * index,
                });
              }}
              style={{
                borderRadius: 20,
                backgroundColor: index !== scrolledPage ? "#203042" : "#2293D0",
                marginHorizontal: 10,

                width: 20,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  width: 20,
                  color: "white",
                }}
              >
                {index + 1}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "white",
  },
  titleContainer: {
    padding: 20,
  },
  titleText: {
    fontSize: 20,
    fontFamily: "ChangaOne_400Regular_Italic",
  },
  mapContainer: {
    height: "65%",
    width: "80%",
    borderRadius: 30,
  },
  scrollContainer: {
    marginTop: 20,

    maxHeight: 100,
  },
  restaurantPreviewContainer: {
    width: width,
    justifyContent: "center",
  },
});

export default RestaurantView;
