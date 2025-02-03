import React, {useState,useEffect} from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from '../../navigation/RootStackParamList';
import {View, Text, SafeAreaView, ScrollView, Platform, TouchableOpacity,Alert} from "react-native";
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import Input from "../../components/Input/Input";
import Header from "../../layout/Header";
import { IMAGES } from '../../constants/Images';
import { Image } from "react-native";
import * as Clipboard from 'expo-clipboard'; // Import Clipboard from expo-clipboard
import {FontAwesome} from '@expo/vector-icons';
import Button from '../../components/Button/Button';
import { useRoute } from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Api from "../../../services/Api";
type ApimndScreenProps = StackScreenProps<RootStackParamList, 'Register'>;
const Apimnd =({ navigation }: ApimndScreenProps) =>{
    const route = useRoute();
    const { name } = route.params; 
    const [apiKey, setApiKey] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const [referralCode] = useState('ABCD1234'); // Example referral code
    const [ip, setIp] = useState(null);
    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(ip); // Copy to clipboard
        Alert.alert('Success', ' copied to clipboard!');
      };
const handleSubmit = async()=>{
    try {

        const formData = {
            apiKey,
            apiSecret :secretKey,
             remark: name,
          };
        // You can replace the following line with an actual API call (e.g., using axios or fetch)
        console.log('Submitting data:', formData);
        const response = await Api.post('/apiBind', formData); // Make API request
        if(response.data.success){
            console.log('Registration successful:', response.data);
            Alert.alert('Success',response.data.message);
        }else{
            Alert.alert('Error',response.data.message);
        }
           
    
      } catch (error) {
       
        const errorMessage = error.response.data?.message || "Something went wrong.";
        Alert.alert("Error", errorMessage);
      }
}

const fetchIP = async () => {
    try {
      const response = await  Api.get('/Public-IP');
      if (response.data.success) {
        setIp(response.data.ip);
        console.log(response.data.ip);
      } else {
        console.log('Error',response.data.message);
      }
    } catch (error) {
        const errorMessage = error.response.data?.message || "Something went wrong.";
        console.log("Error", errorMessage);
    }
  };

  useEffect(() => {
    fetchIP();
  }, []);
            const {colors}: {colors : any} = useTheme();
    return(
        <SafeAreaView style={{flex:1,backgroundColor:colors.background}}>
        <View
            style={{
                flex:1,
                backgroundColor:colors.background,
            }}
        >
            <Header 
                title={name}  
                leftIcon={'back'}
                leftAction={() => navigation.navigate('Apibind')}
            />
            <ScrollView>
                <View style={GlobalStyleSheet.container}>
                    <View style={[GlobalStyleSheet.card,{backgroundColor:colors.card}]}>
                        
                        <View style={[GlobalStyleSheet.cardHeader,{borderBottomColor:colors.border}]}>
                            <Text style={{...FONTS.h6,color:colors.title}}>Api Import</Text>
                        </View>

                        <View style={GlobalStyleSheet.cardBody}>
                            
                            <View style={{marginBottom:10}}>
                                <Input
                                     
                                    placeholder="Enter Api Key"
                                    onChangeText={(text) => setApiKey(text)}
                                />
                            </View>
                            <View style={{marginBottom:10}}>
                                <Input
                                    
                                   
                                    placeholder="Enter Secret Key"
                                    onChangeText={(text) => setSecretKey(text)}
                                   
                                />
                            </View>

                            <View style={GlobalStyleSheet.loginBtnArea}>
                        <Button
                            title={'Import'}
                            onPress={handleSubmit}
                        />
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                paddingVertical: 15,
                            }}
                        >
                            <Text style={{ ...FONTS.font, color: colors.title }}>{ip}</Text>
                            <TouchableOpacity
                                // onPress={() => navigation.navigate('Apibind')}
                                onPress={copyToClipboard}
                                style={{
                                    position: 'relative',
                                }}
                                        >
                                            <Image
                                                style={{height: 20, width: 20, tintColor: COLORS.primaryText,}}
                                                source={IMAGES.copy}
                                            />
                                <View style={GlobalStyleSheet.linkUnderLine} />
                            </TouchableOpacity>
                        </View>
                    </View>

                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    </SafeAreaView>
    )
}

export default Apimnd;