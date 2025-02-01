import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform, SafeAreaView } from 'react-native';
import Route from './app/navigation/Route';
import { useFonts } from 'expo-font';
import { AuthProvider } from './app/Helper/AuthContext'; 

const App = () =>{

		const [loaded] = useFonts({
        PoppinsRegular: require('./app/assets/fonts/Poppins-Regular.ttf'),
        RalewayBold : require('./app/assets/fonts/Raleway-Bold.ttf'),
        RalewayMedium : require('./app/assets/fonts/Raleway-Medium.ttf'),
        RalewaySemiBold : require('./app/assets/fonts/Raleway-SemiBold.ttf'),
        PoppinsMedium : require('./app/assets/fonts/Poppins-Medium.ttf'),
        PoppinsSemiBold : require('./app/assets/fonts/Poppins-SemiBold.ttf'),
		});  

		if(!loaded){
		  return null;
		}

    return (
      <AuthProvider> 
        <SafeAreaProvider>
          <SafeAreaView
            style={{
                flex: 1,
                // paddingTop:Platform.OS === 'web' ? 0 : 35,
              }}
            >
              <Route/>
          </SafeAreaView>
        </SafeAreaProvider>
        </AuthProvider>
    );
};

export default App;
