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
  ActivityIndicator,
} from "react-native";
import ColoredViewComponent from "../../components/ColoredViewComponent";
import HeaderComponenent from "../../components/HeaderComponenent";
import clockIcon from "../../assets/icons/clock.png";
import cameraIcon from "../../assets/images/camera.png";
import trashIcon from "../../assets/icons/trash.png";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import TextInputComponent from "../../components/TextInputComponent";
import { useTheme } from "../../Context/theme/ThemeContext";
import { useTranslation } from "../../Context/TranslationContext";
import CheckBoxComponent from "../../components/CheckBoxComponent";
import { useAuthentification } from "../../Context/AuthContext";

import useFetch from "../../data/useFetch";
const { width, height } = Dimensions.get("screen");

function SpecialEventView(props) {
  const event = props.route.params;
  const { themeStyle } = useTheme();
  const { langage } = useTranslation();
  const { apiToken } = useAuthentification();
  const [dataFuture, setFutureDate] = useState(new Date(event.expiredAt));
  const [requestEventContent, newRequestEventContent] = useFetch();
  const [eventContent, setEventContent] = useState();
  const [answer, setAnswer] = useState("");
  const [imageUri, setImageUri] = useState();
  const [imageHeight, setImageHeight] = useState(width * 0.8);
  const [imageWidth, setImageWidth] = useState(width * 0.8);
  const [deletionRequest, newDeletionRequest] = useFetch();
  const [submitedImages, setSubmitedImages] = useState({});
  const [submitedText, setSubmitedText] = useState();
  const [currentFont, setCurrentFont] = useState(20);
  const [acceptsToShare, setacceptsToShare] = useState(true);
  const [addedImages, setaddedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [submissionRequest, newSubmitionRequest] = useFetch();

  useEffect(() => {
    if (event?.imageUri) {
      setImageUri({
        uri: "https://api.liste-gravity.fr/static/image/" + event?.imageUri,
        headers: { Authorization: "Bearer " + apiToken },
      });
    }

    newRequestEventContent("challenge/" + event.id, "GET", {}, apiToken);
  }, []);

  useEffect(() => {
    if (requestEventContent?.status === "Done") {
      try {
        console.log(
          "EVENT CONTENT ",
          requestEventContent?.content[0]?.challenge_submission
        );

        setEventContent(
          requestEventContent?.content[0] &&
            requestEventContent?.content[0]?.challenge_submission
        );
        requestEventContent?.content[0]?.challenge_submission?.forEach(
          (sub) => {
            if (sub.isFile) {
              let subIm = submitedImages;
              subIm[sub.id] = {
                uri:
                  "https://api.liste-gravity.fr/static/image/" + sub?.content,
                headers: { Authorization: "Bearer " + apiToken },
              };
              console.log(sub);
            } else {
              setSubmitedText(sub);
            }
          }
        );
      } catch (e) {
        console.log(JSON.stringify(e));
      }
    }
  }, [requestEventContent]);

  const [timeRemaining, setTimeRemaining] = useState(
    ((dataFuture - Date.now()) / 1000).toFixed(0)
  );

  function removeImage(image) {
    let array = addedImages.filter((images) => image.id !== images.id);

    setaddedImages(array);
  }
  function addImageUri(image) {
    let array = addedImages;
    array.push({ id: array.length, object: { uri: image?.uri }, image: image });
    setaddedImages([...array]);
  }
  function addImage() {
    launchImageLibrary({
      mediaType: "mixed",
      selectionLimit: 1,
      videoQuality: "low",
    }).then((result) => {
      if (result?.assets?.length > 0) {
        addImageUri(result.assets[0]);
      }
    });
  }
  const [isLoadingImages, setIsLoadingImages] = useState(false);
  const [hasbeenLoading, sethasBeenLoading] = useState(false);
  function saveChallenge() {
    setIsLoading(true);
    setIsLoadingImages(true);
    sethasBeenLoading(true);
    //To save : addedImages

    if (
      (event.submissionType === "mixed" || event.submissionType === "image") &&
      addedImages.length > 0
    ) {
      addedImages.forEach((addedImage) => {
        //Upload Image
        let options = {
          method: "POST",
          headers: {
            Accept: "multipart/form-data",
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + apiToken,
          },
        };
        let formdata = new FormData();
        if (Platform.OS === "ios") {
          formdata.append("image", {
            type: addedImage?.image?.type,
            name: "image.png",
            uri: addedImage?.image?.uri.replace("file://", ""),
          });
        } else {
          formdata.append("image", {
            type: addedImage?.image?.type,
            name: "image.png",
            uri: addedImage?.image?.uri,
          });
        }
        options.body = formdata;
        fetch(
          "https://api.liste-gravity.fr/challenge/" + event.id + "/image",
          options
        ).then(() => {
          if (addedImages.indexOf(addedImage) === addedImages.length - 1) {
            setIsLoadingImages(false);
          }
        });
      });
    } else {
      setIsLoadingImages(false);
    }

    // Save answer
    if (event.submissionType === "mixed" || event.submissionType === "text") {
      if (submitedText || answer) {
        if (submitedText?.content && submitedText?.content !== answer) {
          newDeletionRequest(
            "challenge/" + submitedText.id + "/submission",
            "DELETE",
            {},
            apiToken
          );

          if (answer) {
            newSubmitionRequest(
              "challenge/submission",
              "POST",
              {
                challengeId: event.id.toString(),
                content: answer,
                acceptToShareImage: acceptsToShare,
                isFile: false,
              },
              apiToken
            );
          }
        }
      }
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  useEffect(
    () => submitedText && setAnswer(submitedText.content),
    [submitedText]
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(((dataFuture - Date.now()) / 1000).toFixed(0));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });

  useEffect(() => {
    if (!isLoadingImages && !isLoading && hasbeenLoading) {
      props.navigation.goBack();
    }
  }, [isLoadingImages, isLoading]);
  return (
    <View
      style={[styles.pageContainer, { backgroundColor: themeStyle.background }]}
    >
      <HeaderComponenent
        navigation={props.navigation}
        title={event?.translation[0]?.title}
      />

      <ScrollView
        style={styles.scrollStyle}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollStyleContent}
      >
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
              style={{
                width: 20,
                height: 20,
                marginRight: 5,
                tintColor: themeStyle.textless,
              }}
            />
            <Text
              style={{
                fontFamily: "ChangaOne_400Regular",
                fontSize: currentFont,
                color: themeStyle.textless,
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
                color: themeStyle.text,
              }}
            >
              {langage.descriptionChallenge} :
            </Text>
            <Text
              style={{
                fontFamily: "Neon",
                fontSize: 19,
                textAlign: "justify",
                color: themeStyle.textless,
              }}
            >
              {event?.translation[0]?.description}
            </Text>
            <Text
              style={{
                fontFamily: "ChangaOne_400Regular_Italic",
                fontSize: 19,
                color: themeStyle.text,
                marginTop: 10,
              }}
            >
              {langage.trophee} :
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontFamily: "Neon",
                fontSize: 19,
                textAlign: "justify",
                color: themeStyle.textless,
              }}
            >
              {event?.translation[0]?.rewards}
            </Text>
          </View>
          {event?.imageUri && (
            <Image
              source={imageUri}
              onLoad={({
                nativeEvent: {
                  source: { width, height },
                },
              }) => {
                setImageHeight(height);
                setImageWidth(width);
              }}
              style={{
                backgroundColor: "yellow",
                width: width * 0.8,
                maxHeight: width * 0.8,
                marginTop: 20,
                resizeMode: "contain",
                height: (width * 0.8 * imageHeight) / imageWidth,
              }}
            />
          )}

          {(event.submissionType === "mixed" ||
            event.submissionType === "text") && (
            <>
              <Text
                style={{
                  fontFamily: "ChangaOne_400Regular_Italic",
                  fontSize: 19,
                  marginBottom: 10,
                  marginTop: 20,
                  color: themeStyle.text,
                  alignSelf: "baseline",
                }}
              >
                {langage.myanswer} :
              </Text>
              <ColoredViewComponent
                containerStyle={styles.labelContainer}
                isBlue
              >
                <TextInputComponent
                  isAutoUp
                  placeholder={langage.answer}
                  value={answer}
                  onChange={setAnswer}
                />
              </ColoredViewComponent>
            </>
          )}
          {(event.submissionType === "mixed" ||
            event.submissionType === "image") && (
            <>
              <Text
                style={{
                  color: themeStyle.text,
                  fontFamily: "ChangaOne_400Regular_Italic",
                  fontSize: 19,
                  marginBottom: 10,
                  marginTop: 20,
                  // backgroundColor: "blue",
                  alignSelf: "baseline",
                }}
              >
                {langage.photosVideos} :
              </Text>
            </>
          )}
        </View>
        {(event.submissionType === "mixed" ||
          event.submissionType === "image") && (
          <View style={{ width: width, paddingVertical: 10 }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                justifyContent: "center",
                paddingHorizontal: 20,
              }}
            >
              <View
                style={{
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
                    borderColor: themeStyle.text,
                  }}
                  onPress={() => addImage()}
                >
                  <Image
                    source={cameraIcon}
                    style={{
                      width: 50,
                      height: 50,
                      tintColor: themeStyle.text,
                    }}
                  />
                </TouchableOpacity>

                <View style={{ flexDirection: "row-reverse" }}>
                  {Object.keys(submitedImages).map((key) => {
                    // DEV CODE DE MERDE
                    return (
                      <ImageTile
                        key={key}
                        image={{ object: submitedImages[key], subId: key }}
                        removeImage={(image) => {
                          newDeletionRequest(
                            "challenge/" + image.subId + "/submission",
                            "DELETE",
                            {},
                            apiToken
                          );
                          let newSubIm = submitedImages;
                          delete newSubIm[key];

                          setSubmitedImages(newSubIm);
                        }}
                      />
                    );
                  })}
                  {addedImages.map((image, index) => (
                    <ImageTile
                      key={image + index}
                      image={image}
                      removeImage={removeImage}
                    />
                  ))}
                </View>
              </View>
            </ScrollView>
          </View>
        )}

        <TouchableOpacity
          style={{ marginTop: 20, marginBottom: 20 }}
          onPress={() => saveChallenge()}
          disabled={isLoading || isLoadingImages}
        >
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
                {langage.sendChallenge}
              </Text>
            </View>
          </ColoredViewComponent>
          {isLoading || isLoadingImages ? (
            <ActivityIndicator
              color={"#2293D0"}
              size="large"
              style={{
                zIndex: 2,
                alignSelf: "center",
                justifyContent: "center",
                marginTop: 10,
              }}
            />
          ) : (
            <></>
          )}
        </TouchableOpacity>
        <View style={{ width: "80%" }}>
          <CheckBoxComponent
            setValue={setacceptsToShare}
            value={acceptsToShare}
          >
            <Text
              style={{
                fontFamily: "ChangaOne_400Regular_Italic",
                color: themeStyle.textless,
              }}
            >
              {langage.acceptSharing}
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
        source={image?.uri ? { uri: image.uri } : image.object}
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
        onPress={() => removeImage(image)}
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
