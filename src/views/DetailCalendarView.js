import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderComponenent from "../components/HeaderComponenent";
import ColoredViewComponent from "../components/ColoredViewComponent";
import letterAA from "../assets/Letters/Italique/aa.png";
import letterp from "../assets/Letters/Italique/p.png";
import letterr from "../assets/Letters/Italique/r.png";
import lettero from "../assets/Letters/Italique/o.png";
import letters from "../assets/Letters/Italique/s.png";
import letterd from "../assets/Letters/Italique/d.png";
import lettere from "../assets/Letters/Italique/e.png";
import OutlinedText from "../components/OutlinedText";
import MapView, { Marker } from "react-native-maps";
import { useTranslation } from "../Context/TranslationContext";
import ModalPersonList from "../components/ModalPersonList";
import { useTheme } from "../Context/theme/ThemeContext";
import getImage from "../components/data/getImage";
import { useAuthentification } from "../Context/AuthContext";
import useFetch from "../data/useFetch";

const { width, height } = Dimensions.get("screen");

function DetailCalendarView(props) {
  const { apiToken } = useAuthentification();
  const { themeStyle } = useTheme();
  const event = props.route.params.event;
  const [request, newRequest] = useFetch();
  const [requestInscription, newRequestInscription] = useFetch();
  const [statusInscription, setStatusInscription] = useState();
  const [participants, setParticipants] = useState([]);

  const [image, setImage] = useState();
  function getHeads() {
    newRequest("event/" + event.id, "GET", {}, apiToken);
  }
  useEffect(() => {
    getImage(event.image, apiToken, setImage);
    if (event.open) {
      getHeads();
    }
  }, [event]);
  useEffect(() => {
    if (request?.status === "Done") {
      setParticipants(request.content.registered_user);
      console.log("PARTICIPANT UPDATED");
    }
  }, [request]);

  useEffect(() => {
    console.log("HERE YOU");
    if (requestInscription?.status === "Done") {
      console.log("HERE YOU YOU");
      getHeads();
    }
  }, [requestInscription]);
  function openInApp() {
    Linking.openURL(
      "https://www.google.com/maps/search/?api=1&query=" +
        event.location.coordinates[1] +
        "%2C" +
        event.location.coordinates[0]
    );
  }
  const { toggleLangage, langage } = useTranslation();
  const [isModalParticipantVisible, setModalParticipantVisible] =
    useState(false);
  function openModal() {
    setModalParticipantVisible(!isModalParticipantVisible);
  }

  return (
    <View
      style={[styles.container, { backgroundColor: themeStyle.background }]}
    >
      <ModalPersonList
        isVisible={isModalParticipantVisible}
        setVisible={setModalParticipantVisible}
        navigation={props.navigation}
        participants={participants}
      />
      <HeaderComponenent navigation={props.navigation} />
      <ScrollView style={styles.bodyScrollContainer}>
        <View style={styles.bodyContainer}>
          <View style={{ minWidth: "60%", marginBottom: 30 }}>
            <ColoredViewComponent coloredViewStyle={{ height: 40 }}>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                  paddingHorizontal: 10,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontFamily: "ChangaOne_400Regular_Italic",
                    fontSize: 18,
                  }}
                >
                  {event.translation[0].title}
                </Text>
              </View>
            </ColoredViewComponent>
          </View>
          <View>
            <Image
              source={{
                uri: image,
              }}
              style={styles.backgroundImage}
            />
          </View>
          <View>
            <View style={styles.labelContainer}>
              <View style={styles.labelTextletterContainer}>
                <OutlinedText
                  letterImage={letterAA}
                  fontHeight={15}
                  style={{ marginRight: 7 }}
                />
                <OutlinedText
                  letterImage={letterp}
                  top={3}
                  fontHeight={12}
                  style={{ marginRight: 1 }}
                />
                <OutlinedText
                  letterImage={letterr}
                  fontHeight={9}
                  style={{ marginRight: 1 }}
                />
                <OutlinedText
                  letterImage={lettero}
                  fontHeight={9}
                  style={{ marginRight: 0 }}
                />
                <OutlinedText
                  letterImage={letterp}
                  top={3}
                  fontHeight={12}
                  style={{ marginRight: 1 }}
                />
                <OutlinedText
                  letterImage={lettero}
                  fontHeight={9}
                  style={{ marginRight: 0 }}
                />
                <OutlinedText
                  letterImage={letters}
                  fontHeight={9}
                  style={{ marginRight: 7 }}
                />
                <OutlinedText
                  letterImage={letterd}
                  fontHeight={13}
                  style={{ marginRight: 1 }}
                />
                <OutlinedText
                  letterImage={lettere}
                  fontHeight={9}
                  style={{ marginRight: 7 }}
                />
              </View>
              <Text style={[styles.labelText, { color: themeStyle.text }]}>
                {event.translation[0].title}
              </Text>
            </View>
          </View>

          <View style={{ width: "80%", marginTop: 10 }}>
            <Text
              style={{
                fontFamily: "Neon",
                lineHeight: 20,
                fontSize: 18,
                color: themeStyle.textless,
              }}
            >
              {event.translation[0].long_desc}
            </Text>
            <MapView
              style={styles.mapContainer}
              showsUserLocation
              initialRegion={{
                latitude: event.location.coordinates[1],
                longitude: event.location.coordinates[0],
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  latitude: event.location.coordinates[1],
                  longitude: event.location.coordinates[0],
                }}
                title={event.location_title}
                description={event.location_subtitle}
              />
            </MapView>
            <TouchableOpacity
              onPress={() => openInApp()}
              style={[
                styles.buttonTouchableContainer,
                { marginTop: 20, marginBottom: 10 },
              ]}
            >
              <ColoredViewComponent
                coloredViewStyle={styles.buttonContainer}
                containerStyle={styles.buttonContainerContainer}
                isBlue
              >
                <Text style={styles.buttonText}>Ouvrir dans maps</Text>
              </ColoredViewComponent>
            </TouchableOpacity>
            {event?.open && (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                    height: 50,
                    position: "relative",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "ChangaOne_400Regular",
                      fontSize: 18,
                      marginRight: 10,
                      color: themeStyle.text,
                    }}
                  >
                    {langage.theyAreIn} :
                  </Text>

                  <PersonsHeads
                    participants={participants}
                    navigation={props.navigation}
                    setVisible={openModal}
                  />
                </View>

                <TouchableOpacity
                  style={styles.buttonTouchableContainer}
                  onPress={() => {
                    newRequestInscription(
                      "event/inscription/" + event.id,
                      "GET",
                      {},
                      apiToken
                    );
                  }}
                  disabled={requestInscription?.status === "Loading"}
                >
                  <ColoredViewComponent
                    coloredViewStyle={styles.buttonContainer}
                    containerStyle={styles.buttonContainerContainer}
                  >
                    <Text style={styles.buttonText}>
                      {requestInscription?.status === "Loading"
                        ? langage.isSaving
                        : langage.imInButton}
                    </Text>
                  </ColoredViewComponent>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
function PersonsHeads({ listOfHeads, navigation, setVisible, participants }) {
  let [numberOfHead, setNumberOfHead] = useState([]);

  let [arrayHeads, setheads] = useState([]);
  useEffect(() => {
    let newNumberOfHead = participants.length > 5 ? 5 : participants.length;
    setNumberOfHead(newNumberOfHead);
    setheads(participants.slice(0, newNumberOfHead));
  }, [participants]);
  return (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      {arrayHeads.length > 0 &&
        arrayHeads.map((person, index) => {
          console.log(person);
          return (
            <PersonHead
              person={person}
              position={index}
              key={index}
              onPress={() =>
                navigation.navigate("PublicProfil", { id: person.id })
              }
            />
          );
        })}
      <TouchableOpacity
        style={{
          position: "absolute",
          left: arrayHeads.length * 20,
          alignSelf: "center",
          width: 40,
          height: 40,
          backgroundColor: "#ED8A33",
          borderRadius: 50,
          justifyContent: "center",
          alignItems: "flex-end",
        }}
        onPress={() => setVisible()}
      >
        <Text
          style={{
            left: 10,
            fontFamily: "ChangaOne_400Regular",
            color: "white",
            fontSize: 13,
            marginRight: 10,
            width: "100%",
            textAlign: "center",
          }}
        >
          +{participants.length - numberOfHead}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
function PersonHead({ person, position, onPress }) {
  const { apiToken } = useAuthentification();

  const [image, setImage] = useState();
  console.log("PERSON", person);
  useEffect(() => {
    if (person?.profile_picture) {
      getImage(person.profile_picture, apiToken, setImage);
    } else if (person?.first_name || person?.last_name) {
      setImage(
        "https://ui-avatars.com/api/?name=" +
          person?.first_name +
          "+" +
          person?.last_name
      );
    }
  }, [person]);
  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        left: position * 20,
        alignSelf: "center",
      }}
      onPress={onPress}
    >
      <Image
        source={{ uri: image }}
        style={{
          width: 40,
          height: 40,
          resizeMode: "cover",
          backgroundColor: "black",
          alignSelf: "center",

          borderRadius: 50,
        }}
      />
    </TouchableOpacity>
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
    alignItems: "center",
    paddingTop: 30,
  },
  backgroundImage: {
    width: 0.8 * width,
    height: 0.8 * width,
    borderRadius: 30,
  },
  labelContainer: {
    width: 0.8 * width,
    marginTop: 20,
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "red",
  },
  labelTextletterContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    // backgroundColor: "green",
  },
  labelText: {
    // backgroundColor: "blue",
    color: "black",
    fontSize: 18,
    fontFamily: "ChangaOne_400Regular_Italic",
  },

  labelTextLetter: {
    width: 20,
    height: 30,
    resizeMode: "contain",

    tintColor: "black",
  },
  buttonTouchableContainer: {
    marginTop: 10,
    marginBottom: 20,
    width: "70%",
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonContainerContainer: {},
  buttonContainer: {
    width: "100%",
    height: 50,
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontFamily: "ChangaOne_400Regular",
    fontSize: 20,
  },
  mapContainer: {
    marginTop: 20,
    height: width * 0.8,
    width: "100%",
    borderRadius: 30,
  },
});

export default DetailCalendarView;
