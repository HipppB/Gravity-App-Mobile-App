import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import BottomBarComponent from "../../components/BottomBarComponent";
import HeaderComponenent from "../../components/HeaderComponenent";
import getSponsors from "../../data/getSponsors";
import SponsorComponent from "../../components/SponsorComponent";
import ColoredViewComponent from "../../components/ColoredViewComponent";
import { useTranslation } from "../../Context/TranslationContext";
import leftArrow from "../../assets/images/left-arrow.png";
const { width, height } = Dimensions.get("screen");

function SponsorView(props) {
  const [sponsorList, setSponsorList] = useState(getSponsors());
  const { toggleLangage, langage } = useTranslation();

  console.log(sponsorList?.length);
  return (
    <View style={styles.container}>
      <HeaderComponenent navigation={props.navigation} />
      <ScrollView style={styles.bodyContainer}>
        <View style={{ paddingBottom: 20, paddingTop: 20 }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("sponsorRestaurant")}
          >
            <ColoredViewComponent coloredViewStyle={styles.realtitleContainer}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // backgroundColor: "red",
                  width: "90%",
                }}
              >
                <Text style={styles.titleText}>
                  {langage.affiliatedRestaurant}
                </Text>
                <Image
                  source={leftArrow}
                  style={{
                    width: 20,
                    height: 20,
                    opacity: 0.9,
                    transform: [{ rotateZ: "180deg" }],
                    tintColor: "#E65F02",
                  }}
                />
              </View>
            </ColoredViewComponent>
          </TouchableOpacity>

          {sponsorList?.length > 0 ? (
            sponsorList.map((sponsor) => (
              <SponsorComponent sponsor={sponsor} key={sponsor.id} />
            ))
          ) : (
            <View style={styles.noSponsorContainer}>
              <Text style={styles.noSponsorText}>{langage.noSponsor}</Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("sponsorRestaurant")}
              >
                <Text style={styles.noSponsorText}>
                  {langage.foodForWaiting}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: height * 0.05,
    backgroundColor: "white",
    justifyContent: "space-between",
    height: "100%",
    display: "flex",
  },
  bodyContainer: {
    backgroundColor: "white",
    flexGrow: 1,
    paddingBottom: 50,
  },
  noSponsorContainer: {
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  noSponsorText: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Neon",
  },
  itemcontainer: {
    backgroundColor: "white",
    width: "80%",
    alignSelf: "center",
    marginTop: 20,

    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 15,
    flexDirection: "row",
    alignItems: "center",

    alignSelf: "center",
    padding: 10,
  },

  image: {
    width: 50,
    height: 50,
    marginRight: 8,
    borderRadius: 10,
    backgroundColor: "black",
  },
  realtitleContainer: {
    width: width * 0.8,
    alignItems: "center",
    height: 50,
    justifyContent: "center",
    alignSelf: "center",
  },
  titleContainer: {
    // marginBottom: Platform.OS === "ios" ? 40 : 0,

    width: width * 0.5,
    alignItems: "center",
    height: 50,
    justifyContent: "center",
  },
  titleText: {
    color: "white",
    fontFamily: "ChangaOne_400Regular",
    fontSize: 20,
  },
});

export default SponsorView;
