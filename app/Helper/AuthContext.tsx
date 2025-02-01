import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const jwtDecode = require('jwt-decode');

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  console.log("jwtDecode:", jwtDecode);
  useEffect(() => {
    let isMounted = true; // Prevent state updates on unmounted components

    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        console.log('Token:', token);
        if (token) {
          // Decode the token
          console.log('Token:');
          const decodedToken = jwtDecode.jwtDecode(token);  // Decoding the JWT
          console.log('Decoded Token:', decodedToken);
          // Check if the token has expired
          const isExpired = decodedToken.exp < Date.now() / 1000;
          console.log('isExpired', isExpired);
          if (isExpired) {
            // If expired, remove the token and set isAuthenticated to false
            await AsyncStorage.removeItem('authToken');
            if (isMounted) setIsAuthenticated(false);
          } else {
            // If not expired, set isAuthenticated to true
            console.log('chhe2');
            if (isMounted) setIsAuthenticated(true);
          }
        } else {
          // No token found, set isAuthenticated to false
          console.log('chhe1');
          if (isMounted) setIsAuthenticated(false);
        }
        if (isMounted) setLoading(false); // Set loading to false after checking auth
      } catch (error) {
        console.error('Error checking authentication:', error);
        if (isMounted) setLoading(false); // Set loading to false in case of error
      }
    };

    checkAuth();

    return () => {
      isMounted = false; // Cleanup function to avoid memory leaks
    };
  }, []);

  const login = async (token: string) => {
    try {
      await AsyncStorage.setItem('authToken', token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
