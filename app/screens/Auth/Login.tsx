import React , { useState ,  useEffect}  from 'react';
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


import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../layout/Header';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

import * as WebBrowser from "expo-web-browser";
import * as Google from 'expo-auth-session';
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
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [passwordType, setPasswordType] = useState(true); // true for hidden, false for visible
    const [isLoading, setIsLoading] = useState(false);
    const {colors} : {colors : any} = useTheme();
     
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
          await AsyncStorage.setItem("authToken", response.data.token);
          navigation.navigate("Home"); // Redirect to the Home screen
        }
      } catch (error) {
        console.error("Error during login:", error.response || error.message || error);
        Alert.alert("Error", "An error occurred during the login process.");
      } finally {
        setIsLoading(false);
      }
    };
  
   
    
     
    
      
    const [accessToken, setAccessToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(false);
  
   
  
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: Platform.select({
          
          android: '990050944679-nm8b6jrg7rsth4ho0844jl2ifl0o2ejk.apps.googleusercontent.com',
          // Use different clientId for web if needed
        }),
      });
    
      useEffect(() => {
        if (response?.type === 'success') {
          const { id_token } = response.params;
          fetchUserInfo(id_token);  // Fetch user info after successful login
        } else if (response?.type === 'dismiss') {
          console.log('Authentication was dismissed by the user.');
          Alert.alert('Authentication was canceled.');
        }
      }, [response]);
    
      const fetchUserInfo = async (idToken) => {
        try {
          const userInfoResponse = await fetch(
            `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${idToken}`
          );
          const userInfo = await userInfoResponse.json();
          setUserInfo(userInfo);  // Set the user info in the state
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
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
                            <Text style={[GlobalStyleSheet.label,{color:colors.title,marginTop:20,}]}>Email</Text>
                            <Input
                                placeholder={'Type your email'}
                            />
                        </View>
                        <View style={GlobalStyleSheet.inputGroup}>
                            <Text style={[GlobalStyleSheet.label,{color:colors.title}]}>Password</Text>
                            <Input
                                placeholder={'Type your password'}
                                type={'password'}
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
                            onPress={() => navigation.navigate('DrawerNavigation',{screen : 'Home'})}
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