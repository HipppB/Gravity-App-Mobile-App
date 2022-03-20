import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import useFetch from "../data/useFetch";

const AuthContext = createContext({
  isAuthentificated: false,
  login: (email, password) => error,
  signup: (email, password, more) => error,
  logout: (cb) => {},
  getApiToken: () => {
    token;
  },
  isFirstLogin: true,
  setIsFirstLogin: (status) => {},
  autoLogin: (callback) => {},
});

// create context
function AuthProvider({ children }) {
  const [isAuthentificated, setisAuthentificated] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(true);
  const [request, newRequest] = useFetch();

  const [apiToken, setApiToken] = useState(null);

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
        default:
          console.log("Wait what ?", result); //IT IS NOT SUPPOSED TO ACCESS HERE
          return "NETWORK";
      }
    } catch (e) {
      return "NETWORK";
    }
  }

  async function signup(userInfos) {
    try {
      const result = await newRequest("auth/signup", "POST", {
        email: userInfos?.email,
        password: userInfos?.password,
        language: userInfos?.language,
        promo: userInfos?.promo,
        name: userInfos?.name || null,
        lastname: userInfos?.lastname || null,
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
        setisAuthentificated(true);
      }
      callback();
      return token;
    } catch (e) {
      return null;
    }
  }

  const storeToken = async (token) => {
    try {
      await AsyncStorage.setItem("@apiToken", token);
      await AsyncStorage.setItem("@apiTokenDate", Date.now().toString());
    } catch (e) {
      console.error("BIG ERROR", e);
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
      console.error(e);
      return false;
    }
  }
  async function deleteTokenFromStorage() {
    try {
      const token = await AsyncStorage.removeItem("@apiToken");
      const tokenDate = await AsyncStorage.removeItem("@apiTokenDate");
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <AuthContext.Provider
      value={{
        isAuthentificated,
        login,
        logout,
        getApiToken,
        isFirstLogin,
        setIsFirstLogin,
        signup,
        autoLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
const useAuthentification = () => useContext(AuthContext);

export { AuthProvider, useAuthentification };
