import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  Linking,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
} from "react-native";
import CheckBoxComponent from "../components/CheckBoxComponent";
const { width, height } = Dimensions.get("screen");
import { useTranslation } from "../Context/TranslationContext";
import BackButtonComponent from "../components/BackButtonComponent";
import settingIcon from "../assets/icons/settings.png";
import Modal from "react-native-modal";
import ColoredViewComponent from "../components/ColoredViewComponent";
import PushNotification from "react-native-push-notification";
import notifee from "@notifee/react-native";
import { useTheme } from "../Context/theme/ThemeContext";
import { useAuthentification } from "../Context/AuthContext";
import useFetch from "../data/useFetch";
function NotificationCenterView(props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const { langage } = useTranslation();
  const { themeStyle } = useTheme();
  const { apiToken } = useAuthentification();
  const [notifs, setNotifs] = useState([]);
  const [notifRequest, newNotifRequest] = useFetch();
  const [putRequest, newPutRequest] = useFetch();
  const [user, setUser] = useState();
  useEffect(() => {
    newNotifRequest("user/profile", "GET", {}, apiToken);
  }, []);
  useEffect(() => {
    if (notifRequest?.status === "Done") {
      setNotifs(notifRequest.content.notifications);
      setUser(notifRequest.content);
    }
  }, [notifRequest]);

  function openNotificationModal() {
    setModalOpen(true);
  }

  function handleNotification(notification) {
    notifee.displayNotification({
      title: notification.title,
      body: notification.content,
      android: {
        channelId: "default",
      },
    });
  }
  function saveNotificationParameter(activity, food, sponsor, challenge) {
    setModalOpen(false);
    newPutRequest(
      "user",
      "PUT",
      {
        activityNotification: activity,
        foodNotification: food,
        sponsorNotification: sponsor,
        challengesNotification: challenge,
      },
      apiToken
    );
  }

  return (
    <View
      style={{
        paddingTop: 20,
        alignItems: "center",
        backgroundColor: themeStyle.background,
        height: height - 60,
      }}
    >
      <SafeAreaView></SafeAreaView>
      <ModalNotification
        isVisible={isModalOpen}
        setVisible={setModalOpen}
        saveNotificationParameter={saveNotificationParameter}
        userProfile={user}
      />
      <BackButtonComponent navigation={props.navigation} />
      <TouchableOpacity
        style={{ position: "absolute", right: 20, top: 20 }}
        onPress={() => openNotificationModal()}
      >
        <Image
          source={settingIcon}
          style={{
            width: 30,
            height: 30,
            opacity: 0.8,
            tintColor: themeStyle.textless,
          }}
        />
      </TouchableOpacity>

      <Image
        source={require("../assets/images/logos/Couleur/Logo.png")}
        style={{
          width: width * 0.4,
          height: width * 0.4,
          resizeMode: "contain",
        }}
      />
      <Text style={[styles.pageTitle, { color: themeStyle.textless }]}>
        {langage.notification}
      </Text>
      <ScrollView
        style={{
          width: "100%",

          marginTop: 20,
          marginBottom: 10,
          paddingTop: 20,
          paddingBottom: 50,
        }}
      >
        {notifs.map((notification, index) => (
          <Notification
            notification={notification}
            key={notification.id}
            navigation={props.navigation}
            index={index}
            onPress={handleNotification}
          />
        ))}
        {/* <Notification isNew /> */}
      </ScrollView>
    </View>
  );
}

function Notification({ notification, navigation, index, onPress }) {
  const { apiToken } = useAuthentification();
  const [request, newRequest] = useFetch();

  const { themeStyle } = useTheme();

  const [isNewVisible, setIsNewVisible] = useState(true);
  function callBack() {
    if (notification?.isNew) {
      isRead();
    }
    if (notification?.action) {
      switch (notification.action) {
        case "URL":
          Linking.openURL(notification.url);
          break;
        default:
          try {
            navigation.navigate(notification?.action, notification?.url);
          } catch (e) {
            console.warn(e);
            console.log(e);
          }
          break;
      }
    }
  }

  function isRead() {
    newRequest("notification/" + notification.id, "POST", {}, apiToken);
    setIsNewVisible(!isNewVisible);
  }
  return (
    <View
      style={{
        width: "100%",
        paddingHorizontal: "5%",
        paddingTop: index === 0 ? 20 : 0,
      }}
    >
      <TouchableOpacity style={{ zIndex: 2 }} onPress={() => isRead()}>
        {notification?.isNew && isNewVisible ? (
          <Image
            source={require("../assets/images/new.png")}
            style={{
              width: 50,
              height: 50,
              position: "absolute",
              top: -20,
              left: -20,
            }}
          />
        ) : (
          <></>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: themeStyle.backDifferent,
          width: "100%",
          minHeight: 70,
          marginBottom: 20,
          borderRadius: 10,
          padding: 10,
          paddingHorizontal: 20,
        }}
        onPress={() => callBack()}
      >
        <Text
          style={{
            fontFamily: "ChangaOne_400Regular",
            marginBottom: 5,
            color: themeStyle.textless,
          }}
        >
          {notification.title}
        </Text>
        <Text style={{ fontFamily: "Neon", color: themeStyle.textless }}>
          {notification.content}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function ModalNotification({
  isVisible,
  saveNotificationParameter,
  userProfile,
  setVisible,
}) {
  const [value, setValue] = useState(true);
  const [value1, setValue1] = useState(true);
  const [value2, setValue2] = useState(true);
  const [value3, setValue3] = useState(true);
  const [notiTogglefRequest, newNotifToggleRequest] = useFetch();

  const { themeStyle } = useTheme();
  useEffect(() => {
    setValue(userProfile?.activityNotification);
    setValue1(userProfile?.foodNotification);
    setValue2(userProfile?.sponsorNotification);
    setValue3(userProfile?.challengesNotification);
  }, [userProfile]);
  return (
    <Modal
      isVisible={isVisible}
      customBackdrop={
        <Pressable
          onPress={() => setVisible(false)}
          style={{
            flex: 1,
            width: "100%",
            backgroundColor: themeStyle.background,
          }}
        ></Pressable>
      }
    >
      <View
        style={{
          width: "90%",
          minHeight: "20%",
          backgroundColor: themeStyle.backless,
          borderRadius: 20,
          alignSelf: "center",
          alignItems: "center",
          padding: 15,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 15,
        }}
      >
        <Text
          style={{
            fontFamily: "ChangaOne_400Regular",
            fontSize: 20,
            marginBottom: 20,
            textAlign: "center",
            color: themeStyle.text,
          }}
        >
          Parametrez les notifications
        </Text>
        <Text
          style={{
            fontFamily: "Neon",
            fontSize: 20,
            marginBottom: 20,
            textAlign: "center",
            color: themeStyle.textless,
          }}
        >
          Choisissez les notifications push que vous souhaitez recevoir afin de
          limiter la quantité tout en restant informé
        </Text>
        <View
          style={{
            maxWidth: "80%",
            justifyContent: "center",
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          <View style={{ marginVertical: 10 }}>
            <CheckBoxComponent setValue={setValue} value={value}>
              <Text
                style={{
                  fontFamily: "ChangaOne_400Regular_Italic",
                  color: themeStyle.textless,
                }}
              >
                Notifications Activités
              </Text>
            </CheckBoxComponent>
          </View>
          <View
            style={{
              marginVertical: 10,
            }}
          >
            <CheckBoxComponent setValue={setValue1} value={value1}>
              <Text
                style={{
                  fontFamily: "ChangaOne_400Regular_Italic",
                  color: themeStyle.textless,
                }}
              >
                Notification Food
              </Text>
            </CheckBoxComponent>
          </View>
          <View style={{ marginVertical: 10 }}>
            <CheckBoxComponent setValue={setValue2} value={value2}>
              <Text
                style={{
                  fontFamily: "ChangaOne_400Regular_Italic",
                  color: themeStyle.textless,
                }}
              >
                Notification Sponsor
              </Text>
            </CheckBoxComponent>
          </View>
          <View style={{ marginVertical: 10, marginBottom: 30 }}>
            <CheckBoxComponent setValue={setValue3} value={value3}>
              <Text
                style={{
                  fontFamily: "ChangaOne_400Regular_Italic",
                  color: themeStyle.textless,
                }}
              >
                Notification Défis
              </Text>
            </CheckBoxComponent>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.buttonTouchableContainer]}
          onPress={() =>
            saveNotificationParameter(value, value1, value2, value3)
          }
        >
          <ColoredViewComponent
            coloredViewStyle={styles.buttonContainer}
            containerStyle={styles.buttonContainerContainer}
          >
            <Text style={styles.buttonText}>Enregistrer</Text>
          </ColoredViewComponent>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  pageTitle: {
    justifyContent: "center",
    textAlign: "center",
    fontFamily: "ChangaOne_400Regular",
    fontSize: 30,
  },
  buttonTouchableContainer: {
    width: "70%",
  },
  buttonContainerContainer: {},
  buttonContainer: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    marginBottom: 0,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontFamily: "ChangaOne_400Regular",
    fontSize: 20,
  },
});

export default NotificationCenterView;
