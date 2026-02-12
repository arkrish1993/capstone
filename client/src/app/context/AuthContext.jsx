import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const setLoginCredentials = (credentials) => {
    setLoggedInUser(credentials);
  };

  return (
    <AuthContext.Provider value={{ loggedInUser, setLoginCredentials }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
