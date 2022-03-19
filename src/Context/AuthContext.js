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
      if (result?.content?.message === "User not found") {
        console.warn("No user");
        return "EXISTANCE";
      } else if (result?.content?.message === "Your account is not verified") {
        console.warn("Not verified");

        return "VERIFICATION";
      } else if (result?.content?.access_token) {
        setApiToken(result?.content?.access_token);
        storeToken(result?.content?.access_token);
        setisAuthentificated(true);
        return "LOGGED IN";
      } else {
        console.warn("Wait what ?", result);
        return "WHAT";
      }
    } catch (e) {
      return "NETWORK";
    }

    //setisAuthentificated(true);
  }

  async function signup(
    email,
    password,
    language,
    name,
    lastname,
    description,
    phoneNumber
  ) {
    console.log({
      email: email,
      password: password,
      language: language,
      name: name || null,
      lastname: lastname || null,
      description: description || null,
      phone_number: phoneNumber || null,
    });
    try {
      const result = await newRequest("auth/signup", "POST", {
        email: email,
        password: password,
        language: language,
        name: name || null,
        lastname: lastname || null,
        description: description || null,
        phone_number: phoneNumber || null,
      });

      if (result?.content?.statusCode === 400) {
        return "WRONG";
      } else if (result?.content?.statusCode === 500) {
        return "NETWORK";
      } else if (result?.content?.email) {
        return "CREATED";
      } else {
        console.warn("Wait what ?", result);
      }
    } catch (e) {
      return "NETWORK";
    }
  }
  const logout = (cb) => {
    setisAuthentificated(false);
    if (cb()) {
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
