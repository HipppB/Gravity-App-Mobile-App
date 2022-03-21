import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import BottomBarComponent from "../../components/BottomBarComponent";
import HeaderComponenent from "../../components/HeaderComponenent";
import getSponsors from "../../data/getSponsors";
import SponsorComponent from "../../components/SponsorComponent";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTranslation } from "../../Context/TranslationContext";

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
});

export default SponsorView;
