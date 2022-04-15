import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  Image,
  Text,
  VirtualizedList,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "../../Context/TranslationContext";
import { useTheme } from "../../Context/theme/ThemeContext";
import useFetch from "../../data/useFetch";
import { useAuthentification } from "../../Context/AuthContext";

const { width, height } = Dimensions.get("screen");
function Ranking({ navigation, isFocused }) {
  const { apiToken } = useAuthentification();
  const [userRank, setUserRank] = useState([]);
  const { langage } = useTranslation();
  const { activeTheme, themeStyle } = useTheme();
  const [rankRequest, newRankRequest] = useFetch();
  console.log(themeStyle);

  function updateData() {
    newRankRequest("challenge/ranking", "GET", {}, apiToken);
  }

  useEffect(() => {
    if (isFocused) {
      updateData();
    }
  }, [isFocused]);
  useEffect(() => {
    if (rankRequest?.status === "Done") {
      setUserRank(rankRequest.content);
      console.log("HEY", rankRequest.content);
    }
  }, [rankRequest]);

  if (userRank.length > 3) {
    return (
      // <ScrollView>
      //   <Podium userRank={userRank} />
      //   <View></View>

      <VirtualizedList
        data={userRank}
        initialNumToRender={2}
        ListHeaderComponent={() => (
          <Podium userRank={userRank} navigation={navigation} />
        )}
        renderItem={({ item }) => (
          <NotPodium user={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.user_id}
        getItemCount={() => userRank.length - 3}
        getItem={(data, index) => data[index + 3]}
      />
      // </ScrollView>
    );
  } else {
    return (
      <Text
        style={[
          {
            fontFamily: "Neon",
            alignSelf: "center",
            marginTop: 20,
            color: themeStyle.textless,
            fontSize: 20,
          },
        ]}
      >
        {langage.loading}
      </Text>
    );
  }
}

function Podium({ userRank, navigation }) {
  const { apiToken } = useAuthentification();

  const { langage } = useTranslation();
  const { activeTheme, themeStyle } = useTheme();
  const styles = StyleSheet.create({
    podiumContainer: {
      width: width,
      alignItems: "center",
      marginTop: 100,
    },
    bottomBlockContainer: {
      flexDirection: "row",
      //   backgroundColor: "red",
      alignItems: "flex-end",
      zIndex: 1,
    },
    block: {
      width: width * 0.2,
      height: width * 0.2,
      backgroundColor: activeTheme === "dark" ? "#203C42" : "#2293D0",
      alignItems: "center",
      justifyContent: "center",
    },
    blockText: {
      fontSize: 20,
      fontFamily: "ChangaOne_400Regular",
      color: "white",
    },
  });
  return (
    <>
      <View style={styles.podiumContainer}>
        <View style={styles.bottomBlockContainer}>
          <View
            style={[
              styles.block,
              styles.bottom,
              {
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                height: width * 0.18,
              },
            ]}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.push("PublicProfil", { id: userRank?.[1]?.user_id })
              }
              style={{
                width: 60,
                height: 60,
                position: "absolute",
                bottom: width * 0.18 + 10,
                borderRadius: 30,
              }}
            >
              <Image
                source={{
                  uri:
                    "https://api.liste-gravity.fr/static/image/" +
                    userRank?.[1]?.user_profile_picture,
                  headers: { Authorization: "Bearer " + apiToken },
                }}
                style={{
                  width: 60,
                  height: 60,
                  //   position: "absolute",
                  //   bottom: width * 0.18 + 10,
                  borderRadius: 30,
                }}
              />
            </TouchableOpacity>
            <Text style={styles.blockText}>{langage.second}</Text>
          </View>
          <View
            style={[
              styles.block,
              styles.bottom,
              {
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                height: width * 0.28,
                justifyContent: "space-evenly",
              },
            ]}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.push("PublicProfil", { id: userRank?.[0]?.user_id })
              }
              style={{
                width: 60,
                height: 60,
                position: "absolute",
                bottom: width * 0.28 + 10,
                borderRadius: 30,
              }}
            >
              <Image
                source={{
                  uri:
                    "https://api.liste-gravity.fr/static/image/" +
                    userRank?.[0]?.user_profile_picture,
                  headers: { Authorization: "Bearer " + apiToken },
                }}
                style={{
                  width: 60,
                  height: 60,

                  borderRadius: 30,
                }}
              />
            </TouchableOpacity>
            <Text style={styles.blockText}>{langage.first}</Text>

            <Image
              source={require("../../assets/images/logos/Couleur/LogoNoNomNoFond.png")}
              style={{
                width: width * 0.2 - 20,
                height: width * 0.2 - 20,

                resizeMode: "contain",
              }}
            />
          </View>

          <View
            style={[
              styles.block,
              styles.bottom,

              {
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                height: width * 0.11,
              },
            ]}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.push("PublicProfil", { id: userRank?.[2]?.user_id })
              }
              style={{
                width: 60,
                height: 60,
                position: "absolute",
                bottom: width * 0.11 + 10,
                borderRadius: 30,
              }}
            >
              <Image
                source={{
                  uri:
                    "https://api.liste-gravity.fr/static/image/" +
                    userRank?.[2]?.user_profile_picture,
                  headers: { Authorization: "Bearer " + apiToken },
                }}
                style={{
                  width: 60,
                  height: 60,

                  borderRadius: 30,
                }}
              />
            </TouchableOpacity>
            <Text style={styles.blockText}>{langage.third}</Text>
          </View>
        </View>
      </View>
      <Text
        style={{
          marginTop: 10,
          width: width * 0.8,
          fontSize: 18,
          fontFamily: "Neon",
          alignSelf: "center",
          textAlign: "center",
          color: themeStyle.textless,
        }}
      >
        {langage.needAtLeast} {userRank?.[2]?.user_points} {langage.toGopodium}
      </Text>
    </>
  );
}

function NotPodium({ user, navigation }) {
  console.log(user);
  const { apiToken } = useAuthentification();

  const { langage } = useTranslation();
  const { activeTheme, themeStyle } = useTheme();
  const styles = StyleSheet.create({
    container: {
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
      display: "flex",
      backgroundColor: themeStyle.backless,
      flex: 1,
      flexGrow: 1,
      height: 70,

      height: 70,
      padding: 10,
      flexDirection: "row",
      alignItems: "center",
    },
  });
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.push("PublicProfil", { id: user?.user_id })}
    >
      <Image
        source={{
          uri:
            "https://api.liste-gravity.fr/static/image/" +
            user?.user_profile_picture,
          headers: { Authorization: "Bearer " + apiToken },
        }}
        style={{
          width: 50,
          height: 50,
          borderRadius: 30,
          marginRight: 15,
        }}
      />
      <Text
        style={{
          width: width * 0.8 - 135,
          fontSize: 20,
          marginRight: 20,
          fontFamily: "ChangaOne_400Regular_Italic",
          color: themeStyle.textless,
        }}
      >
        {user?.user_first_name}
        {"\n"}
        {user?.user_last_name}
      </Text>
      <Text
        style={{
          width: 40,
          fontSize: 20,
          fontFamily: "ChangaOne_400Regular_Italic",
          color: themeStyle.textless,
        }}
      >
        {user?.user_points}
      </Text>
    </TouchableOpacity>
  );
}

export default Ranking;
