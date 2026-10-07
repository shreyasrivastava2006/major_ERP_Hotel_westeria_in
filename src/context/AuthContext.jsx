import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/userLocalStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser, removeUser] = useLocalStorage(
    "wisteria_user",
    null
  );

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    removeUser();
  };

  const value = {
    user,
    login,
    logout,
    isLoggedIn: user !== null,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}

export default AuthContext;