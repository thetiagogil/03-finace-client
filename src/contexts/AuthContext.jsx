import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = async (currentToken) => {
    setIsLoading(true);

    if (!currentToken) {
      console.error("Token is missing");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/verify`,
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        }
      );

      if (response.ok) {
        setToken(currentToken);
        setIsAuthenticated(true);
        const parsed = await response.json();
        setCurrentUser(parsed.userId);
        window.localStorage.setItem("authToken", currentToken);
      } else {
        // Handle other errors (e.g., log, show an error message)
        console.error(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const tokenFromStorage = window.localStorage.getItem("authToken");
    if (tokenFromStorage) {
      handleLogin(tokenFromStorage);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchWithToken = async (endpoint, callback, method = "GET", body) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api${endpoint}`,
        {
          method,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (response.ok) {
        const parsed = await response.json();
        callback(parsed);
      } else {
        // Handle other errors
        console.error(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error during fetchWithToken:", error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        fetchWithToken,
        isLoading,
        isAuthenticated,
        handleLogin,
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
