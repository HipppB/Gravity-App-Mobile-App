import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  RefreshControl,
  TouchableOpacity,
} from "react-native";

import MapView, { Marker } from "react-native-maps";
import { useTranslation } from "../../Context/TranslationContext";
import useFetch from "../../data/useFetch";
import { useAuthentification } from "../../Context/AuthContext";
import RestaurantPreviewComponent from "../../components/RestaurantPreviewComponent";
import ColoredViewComponent from "../../components/ColoredViewComponent";
import { useTheme } from "../../Context/theme/ThemeContext";

const { width, height } = Dimensions.get("screen");

function RestaurantView(props) {
  const { themeStyle } = useTheme();

  let scrollViewRestaurant = useRef();
  const { toggleLangage, langage } = useTranslation();
  const [scrolledPage, setScrolledPage] = useState(0);

  const [isRefreshing, setRefreshing] = useState(false);
  const [request, newRequest] = useFetch();
  const { apiToken } = useAuthentification();
  const [markers, setMarkers] = useState([]);

  function updateData() {
    setRefreshing(true);
    newRequest("sponsor/food/all", "GET", {}, apiToken);
  }

  useEffect(() => {
    updateData();
  }, []);
  useEffect(() => {
    console.log("RESULT", request);
    if (request?.status === "Done") {
      setMarkers(request.content);
      setRefreshing(false);
    }
  }, [request]);

  let markerRefList = useRef(new Array());

  return (
    <View
      style={[styles.container, { backgroundColor: themeStyle.background }]}
    >
      <View style={styles.titleContainer}>
        <Text style={[styles.titleText, { color: themeStyle.textless }]}>
          {langage.regaleToi}
        </Text>
      </View>
      {!isRefreshing && (
        <>
          <MapView
            style={styles.mapContainer}
            // provider={PROVIDER_GOOGLE}
            showsUserLocation
            initialRegion={{
              latitude: 48.84554,
              longitude: 2.32779,
              latitudeDelta: 0.09,
              longitudeDelta: 0.05,
            }}
          >
            {markers.map((marker, index) => {
              // let markerRef = useRef();

              return (
                <Marker
                  ref={(m) => markerRefList.current.push(m)}
                  onPress={() =>
                    scrollViewRestaurant.current.scrollTo({
                      x: index * width,
                      animated: true,
                    })
                  }
                  key={marker.id}
                  coordinate={{
                    longitude: marker.location.coordinates[0],
                    latitude: marker.location.coordinates[1],
                  }}
                  title={marker.name}
                  description={marker?.translation[0]?.subtitle}
                />
              );
            })}
          </MapView>
        </>
      )}
      <ScrollView
        ref={scrollViewRestaurant}
        style={styles.scrollContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onMomentumScrollEnd={(e) => {
          let newpage = Math.round(e.nativeEvent.contentOffset.x / width);

          setScrolledPage(newpage);
          markerRefList.current[newpage].showCallout();
        }}
      >
        {markers.map((marker) => (
          <View style={styles.restaurantPreviewContainer} key={marker.id}>
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
    marginTop: 20,
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
