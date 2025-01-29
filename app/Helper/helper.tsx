import { jwtDecode } from 'jwt-decode';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Button } from 'react-native';
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';

export const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider  clientId='705111046549-lbh4610l0ddu7opemk0ck1mpccertsa3.apps.googleusercontent.com'>
        <Login />
      </GoogleOAuthProvider>
    );
  };
  
  // GoogleAuthWrapper for registration
  export const GoogleAuthWrapperRegister = () => {
    return (
      <GoogleOAuthProvider  clientId='705111046549-lbh4610l0ddu7opemk0ck1mpccertsa3.apps.googleusercontent.com'>
        <Register />
      </GoogleOAuthProvider>
    );
  };