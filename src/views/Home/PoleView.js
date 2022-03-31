import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Carousel from "react-native-snap-carousel";
import { useAuthentification } from "../../Context/AuthContext";
import { useTheme } from "../../Context/theme/ThemeContext";
import useFetch from "../../data/useFetch";
const { width, height } = Dimensions.get("window");
function PoleView(props) {
  return (
    <View>
      <Pole name={"Bureau"} type={"bureau"} navigation={props.navigation} />
      <Pole name={"Pôle Com"} type={"com"} navigation={props.navigation} />
      <Pole name={"Pôle Créa"} type={"crea"} navigation={props.navigation} />
      <Pole name={"Pôle Tech"} type={"tech"} navigation={props.navigation} />
      <Pole
        name={"Pôle Sponsor"}
        type={"sponsor"}
        navigation={props.navigation}
      />
      <Pole name={"Pôle Food"} type={"food"} navigation={props.navigation} />
      <Pole name={"Pôle Event"} type={"event"} navigation={props.navigation} />
      <Pole name={"Pôle Déco"} type={"deco"} navigation={props.navigation} />
      <Pole name={"Pôle Ecolo"} type={"ecolo"} navigation={props.navigation} />
      <Pole name={"Pôle Mamie"} type={"mamie"} navigation={props.navigation} />
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
        width: width * 0.99,
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
      {Platform.OS === "ios" ? (
        <Carousel
          nestedScrollEnabled={true}
          layout={"default"}
          paddingBottom={10}
          paddingTop={10}
          sliderWidth={width * 0.99}
          itemWidth={width * 0.5}
          data={data}
          renderItem={(data) => (
            <Profile member={data.item} navigation={props.navigation} />
          )}
        />
      ) : (
        <ScrollView
          horizontal={true}
          // pagingEnabled
          style={{ marginTop: 20 }}
          // disableIntervalMomentum
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ justifyContent: "center" }}
        >
          {data.map((item, index) => (
            <View
              key={index}
              style={{
                width: width * 0.5,
                marginLeft: width * 0.025,
                marginRight: width * 0.025,
              }}
            >
              <Profile member={item} navigation={props.navigation} />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

function Profile({ member, navigation }) {
  const { themeStyle } = useTheme();
  const { apiToken } = useAuthentification();
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: themeStyle.backless }]}
      onPress={() => {
        navigation.navigate("PublicProfil", { id: member.userId });
      }}
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
        source={{
          uri: "https://api.liste-gravity.fr/static/image/" + member?.image,
          headers: { Authorization: "Bearer " + apiToken },
        }}
        style={{
          width: (width * 0.5 - 50) * 0.8,
          height: (width * 0.5 - 50) * 0.8,

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
