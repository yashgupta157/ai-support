import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

 
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  }function login(userData, token) {
  console.log("LOGIN CALLED");
  console.log("TOKEN:", token);
  console.log("USER:", userData);

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(userData));

  console.log("Stored token:", localStorage.getItem("token"));

  setUser(userData);
}

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}