import React , { useRef, useState ,  useEffect}  from 'react';
import {View, Text, 
    Image, 
    SafeAreaView, 
    ScrollView,
    Alert,
    Platform,
    TouchableOpacity
} from 'react-native';
import * as AuthSession from 'expo-auth-session';
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { useTheme, useNavigation } from '@react-navigation/native';
import { IMAGES } from '../../constants/Images';
import { FONTS } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Api2, { googleAuth } from "../../../services/Api";
import Api from "../../../services/Api";
import PhoneInput from 'react-native-phone-input';

import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../layout/Header';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from "expo-web-browser";
import { CommonActions } from '@react-navigation/native';
import { useAuth } from '../../Helper/AuthContext';
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";


type LoginScreenProps = StackScreenProps<RootStackParamList, 'Login'>;

WebBrowser.maybeCompleteAuthSession();
const socialLink = [
    {
        icon : IMAGES.facebook,
    },
    {
        icon : IMAGES.whatsapp,
    },
    {
        icon : IMAGES.instagram,
    },
    {
        icon : IMAGES.twitter,
    },
]

const GOOGLE_CLIENT_ID = '990050944679-nm8b6jrg7rsth4ho0844jl2ifl0o2ejk.apps.googleusercontent.com';
const Login = () => {
    const navigation = useNavigation();
    const { isAuthenticated , login } = useAuth();
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [passwordType, setPasswordType] = useState(true); // true for hidden, false for visible
    const [isLoading, setIsLoading] = useState(false);
    const {colors} : {colors : any} = useTheme();
    const phoneRef = useRef<PhoneInput>(null); // Create a ref for the PhoneInput component
       
    const togglePasswordView = () => setPasswordType(!passwordType);

    const handleSubmit = async () => {
      if (!phone || !password) {
        Alert.alert("Error", "Please fill in all fields.");
        return;
      }
      setIsLoading(true);
      try {
        const response = await Api.post("/login", {
          phone: phone,
          password: password,
        });
        
        if (response.data.status) {
          Alert.alert("Error", response.data.message);
        } else {
         
          console.log("authToken", response.data.token);
          await login(response.data.token);
          navigation.navigate('DrawerNavigation',{screen : 'Home'}); // Redirect to the Home screen
          console.log("isAuthenticated", isAuthenticated);
        //   navigation.dispatch(
        //     CommonActions.reset({
        //       index: 0,
        //       routes: [{ name: 'DrawerNavigation' }],
        //     })
        //   );
        }
      } catch (error) {
        console.log("check", error);
        console.error("Error during login:", error.response || error.message || error);
        const errorMessage =
        error.response?.data?.errors?.[0]?.msg || 'Invalid credentials';
        Alert.alert("Error", errorMessage);
      } finally {
        setIsLoading(false);
      }
    };
  
   
    
     
    
      
    const [accessToken, setAccessToken] = useState(null);
    
    const [loading, setLoading] = useState(false);
  
   
  
    const [userInfo, setUserInfo] = useState(null);

//     const redirectUri = AuthSession.makeRedirectUri({
//         scheme: "cryptocraft", // Use your app's scheme (same as in app.json)
//         useProxy: false,       // Disable proxy for standalone builds
//       });
//   const [request, response, promptAsync] = Google.useAuthRequest({
//     androidClientId: '990050944679-nm8b6jrg7rsth4ho0844jl2ifl0o2ejk.apps.googleusercontent.com',
//     redirectUri: redirectUri,
//   });

//   useEffect(() => {
//     if (response?.type === 'success') {
//       const { authentication } = response;
//       fetchUserInfo(authentication.accessToken);
//     }
//   }, [response]);

//   const fetchUserInfo = async (accessToken) => {
//     try {
//       const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       });
//       const userInfo = await userInfoResponse.json();
//       setUserInfo(userInfo);
//       Alert.alert('Login Success', JSON.stringify(userInfo));
//     } catch (error) {
//       console.error('Error fetching user info:', error);
//     }
//   };

  const handlePhoneChange = (number: string) => {
    setPhone(number);
};
      //const {setDarkTheme,setLightTheme} = React.useContext(ThemeContext);

    return (
        <SafeAreaView
            style={{
                flex:1,
                backgroundColor:colors.background,
                overflow:'hidden',
            }}
        >
            <Image
                source={IMAGES.pattern2}
                style={GlobalStyleSheet.colorBg1}
            />
            <Image
                source={IMAGES.pattern3}
                style={GlobalStyleSheet.colorBg2}
            />
            <Header
                title="Login"
            />

            <ScrollView contentContainerStyle={{flexGrow:1}}>
                <View
                    style={[GlobalStyleSheet.container,{flex:1}]}
                >
                    <View style={{flex:1}}>
                        <View
                            style={{
                                paddingHorizontal:15,
                                paddingVertical:15,
                                marginBottom:20,
                            }}
                        >
                            <Text style={[GlobalStyleSheet.loginTitle,{color:colors.title}]}>Login Account</Text>
                            <Text style={[GlobalStyleSheet.loginDesc,{color:colors.text}]}>A crypto login is a secure authentication process that enables users to access</Text>
                        </View>
                        <View>                         
                                <Input value = ""/>
                                <TouchableOpacity
                                    style={{
                                        position:'absolute',
                                        height:50,
                                        width:350,
                                        alignItems:'center',
                                        justifyContent:'center',
                                    }}
                                    onPress={() => promptAsync()}
                                >
                                    <Text style={[GlobalStyleSheet.label,{color:colors.title}]}>Login with Google</Text>
                                    <Image
                                        style={{
                                            height:20,
                                            width:20,
                                        }}
                                        source={IMAGES.google}
                                    />
                                </TouchableOpacity>
                            </View>
                        <View style={GlobalStyleSheet.inputGroup}>
                            <Text style={[GlobalStyleSheet.label,{color:colors.title,marginTop:20,}]}>Phone</Text>
                            <PhoneInput
                                                           ref={phoneRef}
                                                           value={phone}
                                                           onChangePhoneNumber={handlePhoneChange}
                                                           initialCountry="us"
                                                           textStyle={{
                                                               color: colors.text,
                                                               fontSize: 16,
                                                           }}
                                                           flagStyle={{
                                                               width: 30,
                                                               height: 20,
                                                           }}
                                                           textProps={{
                                                               placeholder: 'Enter phone number',
                                                           }}
                                                           style={{
                                                               borderWidth: 1,
                                                               borderColor: colors.border,
                                                               borderRadius: 8,
                                                               padding: 10,
                                                               backgroundColor: colors.card,
                                                           }}
                                                       />
                        </View>
                        <View style={GlobalStyleSheet.inputGroup}>
                            <Text style={[GlobalStyleSheet.label,{color:colors.title}]}>Password</Text>
                            <Input
                                placeholder={'Type your password'}
                                type={'password'}
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                            />
                        </View>
                        <View style={{
                            alignItems:'flex-end',
                            marginBottom:20,
                        }}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('ForgotPassword')}
                                style={{
                                    position:'relative',
                                }}
                            >
                                <Text style={GlobalStyleSheet.linkBtn}>Forgot Password</Text>
                                <View style={GlobalStyleSheet.linkUnderLine}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    <View
                        style={GlobalStyleSheet.loginBtnArea}
                    >
                        <Button
                            title={'Login'}
                            onPress={handleSubmit}
                        />
                        <View
                            style={{
                                flexDirection:'row',
                                justifyContent:'center',
                                paddingVertical:15,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Register')}
                                style={{
                                    position:'relative',
                                }}
                            >
                                <Text style={GlobalStyleSheet.linkBtn}>Register</Text>
                                <View style={GlobalStyleSheet.linkUnderLine}/>
                            </TouchableOpacity>
                            <Text style={{...FONTS.font,color:colors.title}}> for free</Text>
                        </View>
                    </View>

                </View>
            </ScrollView>

        </SafeAreaView>
    )
}
export default Login;