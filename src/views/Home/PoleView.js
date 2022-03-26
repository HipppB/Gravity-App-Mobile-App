import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { useTheme } from "../../Context/theme/ThemeContext";
const { width, height } = Dimensions.get("window");
function PoleView(props) {
  const { themeStyle } = useTheme();

  return (
    <View>
      <Pole name={"Bureau"} />
      <Pole name={"Pôle Com"} />
      <Pole name={"Pôle Créa"} />
      <Pole name={"Pôle Sponsor"} />
      <Pole name={"Pôle Tech"} />
      <Pole name={"Pôle Event"} />
      <Pole name={"Pôle Déco"} />
    </View>
  );
}

function Pole(props) {
  const { themeStyle } = useTheme();

  const data = props?.members || [
    {
      name: "Nom",
      poste: "Poste",
      image: require("../../GravityHeadCrush/images/1.png"),
    },
    {
      name: "Nom",
      poste: "Poste",
      image: require("../../GravityHeadCrush/images/2.png"),
    },
    {
      name: "Nom",
      poste: "Poste",
      image: require("../../GravityHeadCrush/images/3.png"),
    },
    {
      name: "Nom",
      poste: "Poste",
      image: require("../../GravityHeadCrush/images/4.png"),
    },
  ];
  return (
    <View
      style={{
        width: width,
        marginTop: 20,
        // backgroundColor: "blue",
      }}
    >
      <Text
        style={{
          fontFamily: "ChangaOne_400Regular_Italic",
          fontSize: 25,
          //   backgroundColor: "red",
          width: "80%",
          alignSelf: "center",
          color: themeStyle.text,
        }}
      >
        {props.name}
      </Text>

      <Carousel
        layout={"default"}
        paddingBottom={10}
        paddingTop={10}
        sliderWidth={width}
        itemWidth={width * 0.5}
        data={data}
        renderItem={(data) => <Profile member={data.item} />}
      />
    </View>
  );
}

function Profile({ member }) {
  const { themeStyle } = useTheme();
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: themeStyle.backless }]}
    >
      <Text
        style={{
          marginBottom: 10,
          fontFamily: "ChangaOne_400Regular_Italic",
          fontSize: 18,
          color: themeStyle.textless,
        }}
      >
        {member?.name}
      </Text>
      <Image
        source={member?.image}
        style={{
          width: (width * 0.5 - 50) * 0.8,
          height: (width * 0.5 - 50) * 0.8,
          backgroundColor: "black",
          borderRadius: 10,
          resizeMode: "cover",
        }}
      />
      <Text
        style={{
          marginTop: 10,
          fontFamily: "ChangaOne_400Regular_Italic",
          fontSize: 18,
          color: themeStyle.textless,
        }}
      >
        {member?.poste}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    backgroundColor: "white",
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: Platform.OS === "ios" ? 3.84 : 0,

    elevation: Platform.OS === "ios" ? 5 : 0,
  },
});

export default PoleView;
