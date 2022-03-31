import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import useFetch from "../data/useFetch";

import messaging from "@react-native-firebase/messaging";

const AuthContext = createContext({
  isAuthentificated: false,
  login: (email, password) => error,
  signup: (email, password, more) => error,
  logout: (cb) => {},
  apiToken: "",
  isFirstLogin: true,
  setIsFirstLogin: (status) => {},
  autoLogin: (callback) => {},
  userInfos: {},
  updateUserInfos: () => {},
  setdeviceFcmToken: () => {},
});

// create context
function AuthProvider({ children }) {
  const [isAuthentificated, setisAuthentificated] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [request, newRequest] = useFetch();
  const [apiToken, setApiToken] = useState(null);
  const [userInfos, setUserInfos] = useState({});
  const [deviceFcmToken, setdeviceFcmToken] = useState();
  const [fcmRequest, newFcmRequest] = useFetch();

  async function updateUserInfos() {
    const result = await newRequest("user/profile", "GET", {}, apiToken);
    if (result?.status === "Unauthorized") {
      logout();
    }
    if (result?.content?.email) {
      setUserInfos(result.content);
    } else {
      deleteTokenFromStorage();
      setApiToken(null);
      setisAuthentificated(false);
    }
  }
  useEffect(async () => {
    if (apiToken) {
      updateUserInfos();
    }
  }, [apiToken]);

  async function login(email, password) {
    try {
      const result = await newRequest("auth/login", "POST", {
        email: email,
        password: password,
      });

      // If access token = User logged in
      if (result?.content?.access_token) {
        setApiToken(result?.content?.access_token);
        storeToken(result?.content?.access_token);
        messaging()
          .getToken()
          .then((fcmToken) =>
            newFcmRequest(
              "user/deviceToken",
              "POST",
              {
                deviceToken: fcmToken,
              },
              result?.content?.access_token
            )
          );

        setIsFirstLogin(result?.content?.first_connection);

        setisAuthentificated(true);

        return "LOGGED IN";
      }

      // If not we test all messages
      switch (result?.content?.message) {
        case "User not found":
          console.log("No user");
          return "EXISTANCE";
        case "Your account is not verified":
          console.log("Not verified");
          return "VERIFICATION";
        case "Unauthorized":
          console.log("Wrong Password");
          return "PASSWORD";
        case "User not found":
          break;
        default: //IT IS NOT SUPPOSED TO ACCESS HERE
          console.log("Wait what ?", result);
          return "NETWORK";
      }
    } catch (e) {
      console.warn(e);
      return "NETWORK";
    }
  }

  async function signup(userInfos) {
    let selectedPromo = userInfos.promo;

    if (selectedPromo === "i2" && userInfos?.destination) {
      selectedPromo = selectedPromo + "-" + userInfos?.destination;
    }

    try {
      const result = await newRequest("auth/signup", "POST", {
        email: userInfos?.email,
        password: userInfos?.password,
        language: userInfos?.language,
        promo: selectedPromo,
        first_name: userInfos?.name || null,
        last_name: userInfos?.lastname || null,
        description: userInfos?.description || null,
        phone_number: userInfos?.phoneNumber || null,
      });
      console.log(result);
      switch (result?.content?.statusCode) {
        case 400:
          return "WRONG";
        case 500:
          return "NETWORK";
        default:
          if (result?.content?.email) {
            return "CREATED";
          }
          return "NETWORK";
      }
    } catch (e) {
      console.warn(e);
      return "NETWORK";
    }
  }
  const logout = (cb) => {
    setisAuthentificated(false);
    deleteTokenFromStorage();
    if (cb) {
      cb();
    }
  };
  const getApiToken = () => {
    return apiToken;
  };

  async function autoLogin(callback) {
    try {
      const token = await retrieveToken();
      if (token != false) {
        setApiToken(token);
        messaging()
          .getToken()
          .then((fcmToken) =>
            newFcmRequest(
              "user/deviceToken",
              "POST",
              {
                deviceToken: fcmToken,
              },
              token
            )
          );
        setisAuthentificated(true);
      }
      if (callback) {
        callback();
      }
      return token;
    } catch (e) {
      console.warn(e);
      return null;
    }
  }

  const storeToken = async (token) => {
    try {
      await AsyncStorage.setItem("@apiToken", token);
      await AsyncStorage.setItem("@apiTokenDate", Date.now().toString());
    } catch (e) {
      console.warn(e);
    }
  };
  async function retrieveToken() {
    try {
      const token = await AsyncStorage.getItem("@apiToken");
      const tokenDate = await AsyncStorage.getItem("@apiTokenDate");
      if (
        token &&
        tokenDate &&
        (tokenDate - Date.now()) / (1000 * 60 * 60 * 24) < 30
      ) {
        console.log("TOKEN");
        return token;
      } else {
        console.log("NOT TOKEN");
        return false;
      }
    } catch (e) {
      console.warn(e);

      return false;
    }
  }
  async function deleteTokenFromStorage() {
    try {
      const token = await AsyncStorage.removeItem("@apiToken");
      const tokenDate = await AsyncStorage.removeItem("@apiTokenDate");
    } catch (e) {
      console.warn(e);
    }
  }
  return (
    <AuthContext.Provider
      value={{
        isAuthentificated,
        login,
        logout,
        apiToken,
        isFirstLogin,
        setIsFirstLogin,
        signup,
        autoLogin,
        userInfos,
        updateUserInfos,
        setdeviceFcmToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
const useAuthentification = () => useContext(AuthContext);

export { AuthProvider, useAuthentification };
