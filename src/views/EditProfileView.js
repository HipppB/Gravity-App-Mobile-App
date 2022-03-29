import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  Animated,
} from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../Context/theme/ThemeContext";
import { useTranslation } from "../Context/TranslationContext";
import { useAuthentification } from "../Context/AuthContext";
import useFetchPhoto from "../data/useFetchPhoto";
import ColoredViewComponent from "../components/ColoredViewComponent.js";
import TextInputComponent from "../components/TextInputComponent.js";
import { ScrollView } from "react-native-gesture-handler";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import BackButtonComponent from "../components/BackButtonComponent.js";
import getImage from "../components/data/getImage";
import useFetch from "../data/useFetch";
const { width, height } = Dimensions.get("screen");
function EditProfileView(props) {
  const { langage } = useTranslation();
  const {
    apiToken,
    userInfos,
    updateUserInfos,
    userLocalPicture,
    updateLocalPicture,
  } = useAuthentification();
  const { themeStyle } = useTheme();
  const [updateRequest, newUpdateRequest] = useFetch();
  const [photoRequest, newPhotoRequest] = useFetchPhoto();

  const [name, setName] = useState(userInfos?.first_name);
  const [lastName, setLastName] = useState(userInfos?.last_name);
  const [phone, setPhone] = useState(userInfos?.phone_number);
  const [approximativeLocation, setApproximativeLocation] = useState(
    userInfos?.address
  );
  const [description, setDescription] = useState(userInfos?.description);
  const [insta, setInsta] = useState(userInfos?.socials?.at(0)?.url || "");
  const [facebook, setFacebook] = useState(
    userInfos?.socials?.at(1)?.url || ""
  );
  const [snap, setSnap] = useState(userInfos?.socials?.at(2)?.url || "");
  const [tikTok, setTikTok] = useState(userInfos?.socials?.at(3)?.url || "");
  const [twitter, setTwitter] = useState(userInfos?.socials?.at(4)?.url || "");

  const [profileUrl, setProfileUrl] = useState();

  const loadingopacity = useRef(new Animated.Value(0)).current;
  const [newFileType, setNewFileType] = useState(null);
  async function changePhoto() {
    const result = await launchImageLibrary({ mediaType: "photo" });
    if (result?.assets?.at(0)) {
      setNewFileType(result.assets[0].type);
      setProfileUrl(result.assets[0].uri);
    }
  }

  useEffect(() => {
    if (!profileUrl) {
      if (userInfos?.profile_picture) {
        getImage(userInfos?.profile_picture, apiToken, updateLocalPicture);
      } else {
        setProfileUrl(
          "https://ui-avatars.com/api/?name=" + name + "+" + lastName
        );
      }
    }
  }, []);

  useEffect(() => {
    if (userLocalPicture) {
      setProfileUrl(userLocalPicture);
    }
  }, [userLocalPicture]);

  useEffect(() => {
    if (userInfos?.socials?.length > 0) {
      for (let index = 0; index < userInfos.socials.length; index++) {
        const element = userInfos.socials[index];
        switch (element?.name) {
          case "Instagram":
            setInsta(element?.url);
            break;
          case "Facebook":
            setFacebook(element?.url);
            break;
          case "Snap":
            setSnap(element?.url);
            break;
          case "TikTok":
            setTikTok(element?.url);
            break;
          case "Twitter":
            setTwitter(element?.url);
            break;
          default:
            break;
        }
      }
    }
  }, [userInfos]);
  async function saveInfos() {
    Animated.timing(loadingopacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
    let changedInfos = {};
    if (name != userInfos?.first_name) {
      changedInfos["first_name"] = name;
    }
    if (lastName != userInfos?.last_name) {
      changedInfos["last_name"] = lastName;
    }
    if (phone != userInfos?.phone_number) {
      changedInfos["phone_number"] = phone;
    }
    if (approximativeLocation != userInfos?.address) {
      changedInfos["address"] = approximativeLocation;
    }
    if (approximativeLocation != userInfos?.address) {
      changedInfos["address"] = approximativeLocation;
    }
    if (description != userInfos?.description) {
      changedInfos["description"] = description;
    }
    let ids = {};
    userInfos.socials.forEach((social) => {
      ids[social.name] = social.id;
    });
    changedInfos["socials"] = [
      {
        id: ids?.Instagram,
        name: "Instagram",
        url: insta,
        public: true,
      },
      {
        id: ids?.Facebook,
        name: "Facebook",
        url: facebook,
        public: true,
      },
      {
        id: ids?.Twitter,
        name: "Twitter",
        url: twitter,
        public: true,
      },
      {
        id: ids?.TikTok,
        name: "TikTok",
        url: tikTok,
        public: true,
      },
      {
        id: ids?.Snap,
        name: "Snap",
        url: snap,
        public: true,
      },
    ];

    if (newFileType) {
      newPhotoRequest(profileUrl, apiToken);
    }

    console.log(Object.keys(changedInfos));
    if (Object.keys(changedInfos).length > 0) {
      newUpdateRequest("user", "PUT", changedInfos, apiToken);
    } else {
      if (!newFileType) {
        console.log("NOTHING TO EDIT");
        setTimeout(() => {
          Animated.timing(loadingopacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }).start();
        }, 500);
      }
    }
  }

  useEffect(() => {
    if (updateRequest?.status === "Unauthorized") {
      logout();
    }
    if (updateRequest?.status === "Done") {
      if (!newFileType) {
        updateUserInfos();
        Animated.timing(loadingopacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
    }
  }, [updateRequest]);
  useEffect(() => {
    if (photoRequest?.status === "Unauthorized") {
      logout();
    }
    if (photoRequest?.status === "Done") {
      updateUserInfos();
      if (photoRequest?.content?.filename) {
        newUpdateRequest(
          "user",
          "PUT",
          { profile_picture: photoRequest.content.filename },
          apiToken
        );
      }
      setNewFileType(null);

      Animated.timing(loadingopacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [photoRequest]);
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: themeStyle.background }]}
    >
      <KeyboardAvoidingView
        style={{
          width: "100%",
          flex: 1,
          paddingBottom: 0,
          justifyContent: "space-between",
          alignItems: "center",
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <BackButtonComponent navigation={props.navigation} />

        <ScrollView
          style={{
            width: "100%",
            height: "auto",
            paddingBottom: 0,
          }}
          contentContainerStyle={{ alignItems: "center" }}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            onPress={() => changePhoto()}
            style={{
              width: 0.4 * width,
              height: 0.4 * width,
              borderRadius: width,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <Image
              source={{ uri: profileUrl }}
              style={{
                width: 0.4 * width,
                height: 0.4 * width,
                borderColor: "#E65F02",
                borderWidth: 2,
                borderRadius: width,
                resizeMode: "cover",
              }}
              key={(Math.random() * 100).toFixed(0)}
            />
            <Image
              source={require("../assets/images/camera.png")}
              style={{
                position: "absolute",
                width: 0.2 * width,
                height: 0.2 * width,
                tintColor: "#E65F02",
              }}
            />
          </TouchableOpacity>
          <ColoredViewComponent containerStyle={styles.labelContainer} isBlue>
            <TextInputComponent
              // autoFocus
              placeholder={langage.namePlaceHolder}
              value={name}
              onChange={setName}
            />
          </ColoredViewComponent>
          <ColoredViewComponent containerStyle={styles.labelContainer} isBlue>
            <TextInputComponent
              // autoFocus
              placeholder={langage.lastnamePlaceHolder}
              value={lastName}
              onChange={setLastName}
            />
          </ColoredViewComponent>
          <ColoredViewComponent containerStyle={styles.labelContainer} isBlue>
            <TextInputComponent
              // autoFocus
              placeholder={langage.publicDesription}
              value={description}
              onChange={setDescription}
            />
          </ColoredViewComponent>
          <ColoredViewComponent containerStyle={styles.labelContainer} isBlue>
            <TextInputComponent
              // autoFocus
              placeholder={langage.phonePlaceHolder}
              value={phone}
              onChange={setPhone}
            />
          </ColoredViewComponent>
          <ColoredViewComponent containerStyle={styles.labelContainer} isBlue>
            <TextInputComponent
              // autoFocus
              placeholder={langage.locationPlaceHolder}
              value={approximativeLocation}
              onChange={setApproximativeLocation}
            />
          </ColoredViewComponent>

          <ColoredViewComponent containerStyle={styles.labelContainer} isBlue>
            <TextInputComponent
              // autoFocus
              placeholder={langage.instaPlaceHolder}
              value={insta}
              onChange={setInsta}
            />
          </ColoredViewComponent>
          <ColoredViewComponent containerStyle={styles.labelContainer} isBlue>
            <TextInputComponent
              // autoFocus
              placeholder={langage.facebookPlaceHolder}
              value={facebook}
              onChange={setFacebook}
            />
          </ColoredViewComponent>
          <ColoredViewComponent containerStyle={styles.labelContainer} isBlue>
            <TextInputComponent
              // autoFocus
              placeholder={"Twitter"}
              value={twitter}
              onChange={setTwitter}
            />
          </ColoredViewComponent>
          <ColoredViewComponent containerStyle={styles.labelContainer} isBlue>
            <TextInputComponent
              // autoFocus
              placeholder={langage.snapPlaceHolder}
              value={snap}
              onChange={setSnap}
            />
          </ColoredViewComponent>
          <ColoredViewComponent containerStyle={styles.labelContainer} isBlue>
            <TextInputComponent
              // autoFocus
              placeholder={langage.tiktokPlaceHolder}
              value={tikTok}
              onChange={setTikTok}
            />
          </ColoredViewComponent>
          <View style={styles.buttonTouchableContainer}>
            <Animated.Text
              style={{
                alignSelf: "center",
                opacity: loadingopacity,
                fontFamily: "ChangaOne_400Regular_Italic",
                color: themeStyle.textless,
              }}
            >
              {langage.isSaving}
            </Animated.Text>
            <TouchableOpacity onPress={() => saveInfos()}>
              <ColoredViewComponent
                coloredViewStyle={styles.buttonContainer}
                containerStyle={styles.buttonContainerContainer}
              >
                <Text style={styles.buttonText}>{langage?.saveLabel}</Text>
              </ColoredViewComponent>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  titleContainer: {
    width: width * 0.5,
    alignItems: "center",
    height: 50,
    justifyContent: "center",
  },
  titleText: {
    color: "white",
    fontFamily: "ChangaOne_400Regular",
    fontSize: 18,
  },
  bodyContainer: {
    flex: 1,
    marginTop: 30,
    alignItems: "center",
  },
  text: {
    fontFamily: "Neon",
    textAlign: "center",
    fontSize: 30,
  },
  textSmall: {
    fontFamily: "Neon",
    textAlign: "center",
    lineHeight: 33,
    fontSize: 20,
  },
  labelContainer: {
    width: "70%",

    marginTop: 20,
  },
  buttonTouchableContainer: {
    marginTop: 40,
    width: "70%",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonContainerContainer: {},
  buttonContainer: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    marginBottom: Platform.OS === "android" ? 0 : 0,
  },

  buttonText: {
    textAlign: "center",
    color: "white",
    fontFamily: "ChangaOne_400Regular",
    fontSize: 20,
  },
  realtitleContainer: {
    marginBottom: 30,
    marginTop: 20,
    width: width * 0.7,
    alignItems: "center",
    height: 50,
    justifyContent: "center",
  },
  titleText: {
    color: "white",
    fontFamily: "ChangaOne_400Regular",
    fontSize: 18,
  },
});

export default EditProfileView;
