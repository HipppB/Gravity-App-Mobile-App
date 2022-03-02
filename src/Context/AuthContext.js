import React, { createContext, useContext, useState } from "react";
import { Button } from "react-native-web";

const AuthContext = createContext({
  isAuthentificated: false,
  login: (userInfos) => {},
  logout: (cb) => {},
  getApiToken: () => {
    token;
  },
});

// create context
function AuthProvider({ children }) {
  const [isAuthentificated, setisAuthentificated] = useState(false);
  const [apiToken, setApiToken] = useState(null);
  const login = (userInfos) => {
    console.log("LOGGED IN");

    setisAuthentificated(true);
  };
  const logout = (cb) => {
    setisAuthentificated(false);
    if (cb()) {
      cb();
    }
  };
  const getApiToken = () => {
    return apiToken;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthentificated,
        login,
        logout,
        getApiToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
const useAuthentification = () => useContext(AuthContext);

export { AuthProvider, useAuthentification };
