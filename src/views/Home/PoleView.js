import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { useAuthentification } from "../../Context/AuthContext";
import { useTheme } from "../../Context/theme/ThemeContext";
import useFetch from "../../data/useFetch";
const { width, height } = Dimensions.get("window");
function PoleView(props) {
  const { themeStyle } = useTheme();
  return (
    <View>
      <Pole name={"Bureau"} type={"bureau"} />
      <Pole name={"Pôle Com"} type={"com"} />
      <Pole name={"Pôle Créa"} type={"crea"} />
      <Pole name={"Pôle Tech"} type={"tech"} />
      <Pole name={"Pôle Sponsor"} type={"sponsor"} />
      <Pole name={"Pôle Food"} type={"food"} />
      <Pole name={"Pôle Event"} type={"event"} />
      <Pole name={"Pôle Déco"} type={"deco"} />
      <Pole name={"Pôle Ecolo"} type={"ecolo"} />
      <Pole name={"Pôle Mamie"} type={"mamie"} />
    </View>
  );
}

function Pole(props) {
  const { themeStyle } = useTheme();
  const { apiToken } = useAuthentification();
  const [data, setData] = useState([]);
  const [fetchedData, fetchData] = useFetch();
  useEffect(() => {
    fetchData("division/label", "POST", { label: props?.type }, apiToken);
  }, [props.type]);
  useEffect(() => {
    if (fetchedData?.status === "Done" && fetchedData?.content?.members) {
      setData(fetchedData.content.members);
    }
  }, [fetchedData]);
  // const data = props?.members || [
  //   {
  //     name: "Nom",
  //     poste: "Poste",
  //     image: require("../../GravityHeadCrush/images/1.png"),
  //   },
  //   {
  //     name: "Nom",
  //     poste: "Poste",
  //     image: require("../../GravityHeadCrush/images/2.png"),
  //   },
  //   {
  //     name: "Nom",
  //     poste: "Poste",
  //     image: require("../../GravityHeadCrush/images/3.png"),
  //   },
  //   {
  //     name: "Nom",
  //     poste: "Poste",
  //     image: require("../../GravityHeadCrush/images/4.png"),
  //   },
  // ];
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
  console.log(member);
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
        {member?.first_name}
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
        {member?.role}
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
