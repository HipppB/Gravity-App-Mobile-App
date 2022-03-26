import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  Dimensions,
  Pressable,
  TouchableOpacity,
  ActionSheetIOS,
  Platform,
  Alert,
  FlatList,
} from "react-native";
import ColoredViewComponent from "../../components/ColoredViewComponent";
import HeaderComponenent from "../../components/HeaderComponenent";
import clockIcon from "../../assets/icons/clock.png";
import cameraIcon from "../../assets/images/camera.png";
import trashIcon from "../../assets/icons/trash.png";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import BackButtonComponent from "../../components/BackButtonComponent";
import TextInputComponent from "../../components/TextInputComponent";

import CheckBoxComponent from "../../components/CheckBoxComponent";
const { width, height } = Dimensions.get("screen");

function SpecialEventView(props) {
  const [dataFuture, setFutureDate] = useState(Date.now() + 10000000);
  const [answer, setAnswer] = useState("");

  const [timeRemaining, setTimeRemaining] = useState(
    (dataFuture - Date.now()) / 1000
  );
  const [currentFont, setCurrentFont] = useState(20);
  const [acceptsToShare, setacceptsToShare] = useState(true);
  let scrollViewRestaurant = useRef();
  const [scrolledImagePresentation, setScrolledImagePresentation] = useState(0);
  const [addedImages, setaddedImages] = useState([
    {
      id: 1,
      uri: "https://i.dailymail.co.uk/1s/2022/02/07/17/53887271-0-image-a-2_1644256002098.jpg",
    },
    {
      id: 2,
      uri: "https://curiokids.net/wp-content/uploads/2021/07/une_gravite-sur-Mars_astronaute_curiokids_eurospace_center-678x381.jpg",
    },
    {
      id: 3,
      uri: "https://i.ytimg.com/vi/4P--9cRAefE/maxresdefault.jpg",
    },
  ]);
  function removeImage(imageId) {
    let array = addedImages.filter((image) => imageId !== image.id);
    console.log(array);
    setaddedImages(array);
  }
  function addImageUri(imageUri) {
    let array = addedImages;
    array.push({ id: array.length, uri: imageUri });
    setaddedImages([...array]);
  }
  function addImage() {
    let array = addedImages;
    launchImageLibrary({
      mediaType: "mixed",
      selectionLimit: 1,
      videoQuality: "low",
    }).then((result) => {
      console.log(result);
      if (result?.assets?.length > 0) {
        addImageUri(result.assets[0].uri);
      }
    });
  }
  useEffect(() => {
    const interval = setInterval(() => {
      console.log(timeRemaining);
      setTimeRemaining(((dataFuture - Date.now()) / 1000).toFixed(0));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <View style={styles.pageContainer}>
      <HeaderComponenent
        navigation={props.navigation}
        title={"Titre du défis"}
      />
      {/* <BackButtonComponent navigation={props.navigation} top={40} /> */}
      <ScrollView
        style={styles.scrollStyle}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollStyleContent}
      >
        {/* <ColoredViewComponent
          coloredViewStyle={{ height: 40, minWidth: "60%" }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <Text
              style={{
                color: "white",
                fontFamily: "ChangaOne_400Regular",
                fontSize: 20,
                paddingHorizontal: 20,
              }}
            >
              Titre du défis
            </Text>
          </View>
        </ColoredViewComponent> */}
        <View
          style={{
            alignSelf: "center",
            width: width * 0.8,
            alignItems: "center",
          }}
        >
          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              alignSelf: "center",

              justifyContent: "center",
            }}
          >
            <Image
              source={clockIcon}
              style={{ width: 20, height: 20, marginRight: 5 }}
            />
            <Text
              style={{
                fontFamily: "ChangaOne_400Regular",
                fontSize: currentFont,
              }}
              onTextLayout={(e) => {
                if (e.nativeEvent.lines.length > 1) {
                  setCurrentFont(currentFont - 1);
                }
              }}
            >
              {Math.floor(timeRemaining / 3600)} heures{" "}
              {Math.floor(timeRemaining / 60) -
                60 * Math.floor(timeRemaining / 3600)}{" "}
              minutes et {timeRemaining - 60 * Math.floor(timeRemaining / 60)}{" "}
              secondes
            </Text>
          </View>
          <View style={{ width: "100%", alignSelf: "center" }}>
            <Text
              style={{
                fontFamily: "ChangaOne_400Regular_Italic",
                fontSize: 19,
                marginBottom: 10,
                marginTop: 20,
              }}
            >
              Description du défis :
            </Text>
            <Text
              style={{ fontFamily: "Neon", fontSize: 19, textAlign: "justify" }}
            >
              Ceci est une superbe description de défis, ça peut être n'importe
              quoi tant qu'on ne perd pas trop d'isépiens, exemple de défis à
              éviter : Sauter d'un pont, frapper quelqu'un, tuer quelqu'un,
              écouter un cours en entier, bref, tout ce qui peut être dangereux
              pour la santée.
            </Text>
            <Text
              style={{
                fontFamily: "ChangaOne_400Regular_Italic",
                fontSize: 19,

                marginTop: 20,
              }}
            >
              Récompenses :
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontFamily: "Neon",
                fontSize: 19,
                textAlign: "justify",
              }}
            >
              Ne pas mourir c'est bien, mais un tshirt gravity c'est encore
              encore mieux
            </Text>
          </View>
          <View
            style={{
              marginTop: 20,
              height: 200,
              width: width * 0.8,
            }}
          >
            <Image
              source={{ uri: addedImages[0].uri }}
              style={{ height: 200, width: width * 0.8, resizeMode: "contain" }}
            />
          </View>
          <Text
            style={{
              fontFamily: "ChangaOne_400Regular_Italic",
              fontSize: 19,
              marginBottom: 10,
              marginTop: 20,

              alignSelf: "baseline",
            }}
          >
            Ma réponse :
          </Text>
          <ColoredViewComponent containerStyle={styles.labelContainer} isBlue>
            <TextInputComponent
              // autoFocus
              placeholder={"Réponse"}
              value={answer}
              onChange={setAnswer}
            />
          </ColoredViewComponent>
          <Text
            style={{
              fontFamily: "ChangaOne_400Regular_Italic",
              fontSize: 19,
              marginBottom: 10,
              marginTop: 20,

              alignSelf: "baseline",
            }}
          >
            Mes photos et vidéos :
          </Text>
        </View>
        <ScrollView
          horizontal
          style={{ width: width, paddingVertical: 10 }}
          showsHorizontalScrollIndicator={false}
        >
          <View
            style={{
              minWidth: "100%",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={{
                borderColor: "gray",
                borderWidth: 1,
                width: 90,
                height: 90,
                borderRadius: 20,
                marginHorizontal: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => addImage()}
            >
              <Image source={cameraIcon} style={{ width: 50, height: 50 }} />
            </TouchableOpacity>

            <View style={{ flexDirection: "row-reverse" }}>
              {addedImages.map((image, index) => (
                <ImageTile
                  key={index}
                  image={image}
                  removeImage={removeImage}
                />
              ))}
              {/* <FlatList
                data={addedImages}
                horizontal
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <ImageTile image={item} removeImage={removeImage} />
                )}
                keyExtractor={(item) => item.id}
              /> */}
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity style={{ marginTop: 20, marginBottom: 20 }}>
          <ColoredViewComponent
            coloredViewStyle={{
              height: 40,
              minWidth: "60%",
              paddingHorizontal: 20,
            }}
            isBlue
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: "ChangaOne_400Regular",
                  fontSize: 20,
                }}
              >
                Envoyer le défis
              </Text>
            </View>
          </ColoredViewComponent>
        </TouchableOpacity>
        <View style={{ width: "80%" }}>
          <CheckBoxComponent
            setValue={setacceptsToShare}
            value={acceptsToShare}
          >
            <Text
              style={{
                fontFamily: "ChangaOne_400Regular_Italic",
              }}
            >
              Je veux bien que gravity partage ces fichiers avec les Isepiens
            </Text>
          </CheckBoxComponent>
        </View>
      </ScrollView>
    </View>
  );
}
function ImageTile({ image, removeImage }) {
  return (
    <View
      style={{
        height: 100,

        justifyContent: "center",
      }}
    >
      <Image
        source={{
          uri: image.uri,
        }}
        style={{
          backgroundColor: "gray",
          width: 90,
          height: 90,
          borderRadius: 20,
          marginHorizontal: 10,
        }}
      />
      <TouchableOpacity
        style={{
          zIndex: 2,
          backgroundColor: "#E65F02",
          bottom: 0,
          right: 0,
          position: "absolute",
          padding: 6,
          borderRadius: 20,
        }}
        onPress={() => removeImage(image.id)}
      >
        <Image
          source={trashIcon}
          style={{
            tintColor: "white",
            width: 25,
            height: 25,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: { flex: 1, backgroundColor: "white" },
  scrollStyle: {
    alignSelf: "center",
  },
  scrollStyleContent: {
    alignItems: "center",
  },
  labelContainer: {
    minWidth: "70%",
    maxWidth: "110%",
    marginTop: 10,
  },
});

export default SpecialEventView;
