import React, {useState} from "react";
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
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
type ApimndScreenProps = StackScreenProps<RootStackParamList, 'Register'>;
const Apimnd =({ navigation }: ApimndScreenProps) =>{
            
    const [referralCode] = useState('ABCD1234'); // Example referral code
    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(referralCode); // Copy to clipboard
        Alert.alert('Success', ' copied to clipboard!');
      };

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
                title={'Api Import'}  
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
                                    value={''}  
                                    placeholder="Api Key"
                                    onChangeText={(value)=> console.log(value)}
                                />
                            </View>
                            <View style={{marginBottom:10}}>
                                <Input
                                    value={''}  
                                    type={'password'}
                                    placeholder="Secret Key"
                                    onChangeText={(value)=> console.log(value)}
                                />
                            </View>

                            <View style={GlobalStyleSheet.loginBtnArea}>
                        <Button
                            title={'Import'}
                        />
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                paddingVertical: 15,
                            }}
                        >
                            <Text style={{ ...FONTS.font, color: colors.title }}>13.213.132.125 13.251.83.60 18.139.102.94 3.1.7.213 46.137.215.117..</Text>
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