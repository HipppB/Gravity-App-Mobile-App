import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { useTranslation } from "../Context/TranslationContext";

import RestaurantPreviewComponent from "../components/RestaurantPreviewComponent";
const { width, height } = Dimensions.get("screen");

function RestaurantView(props) {
  let scrollViewRestaurant = useRef();
  const { toggleLangage, langage } = useTranslation();

  const markers = [
    {
      index: 1,
      latlng: { latitude: 48.84554, longitude: 2.32779 },
      title: "ISEP NDC",
      description: "Campus NDC de l'isep",
    },
    {
      index: 2,
      latlng: { latitude: 48.84406, longitude: 2.33093 },
      title: "Subway",
      description: "Subway à côté de NDC",
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

          markerRefList[newpage].current.showCallout();
        }}
      >
        {markers.map((marker) => (
          <View style={styles.restaurantPreviewContainer} key={marker.index}>
            <RestaurantPreviewComponent restaurant={marker} />
          </View>
        ))}
      </ScrollView>
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
