import React, {useCallback, useRef, useState} from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useTheme } from '@react-navigation/native';
import {Feather}  from '@expo/vector-icons';
import Header from '../../layout/Header';
import { IMAGES } from '../../constants/Images';
import { FONTS, SIZES } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { StackScreenProps } from '@react-navigation/stack';
import BottomSheet, { BottomSheetBackdrop, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import Button from '../../components/Button/Button';
import ThemeBtn from '../../components/ThemeBtn';
import Api from "../../../services/Api";





const menuData = [
    {
        icon : IMAGES.darkMode,
        title : "Dark Mode",
        type : 'theme',
    },
    {
        icon : IMAGES.mail,
        title : "Email Address",
        sheet : 'email',
    },
    {
        icon : IMAGES.phone,
        title : "Phone Number",
        sheet : 'phone',
    },
    {
        icon : IMAGES.lock,
        title : "Change Password",
        navigate : 'ChangePassword',
    },
    {
        icon : IMAGES.scan,
        title : "Two Step Authentication",
        navigate : 'TwoStepAuthentication',
    },
]


type SettingsScreenProps = StackScreenProps<RootStackParamList, 'Settings'>;

const Settings = ({navigation} : SettingsScreenProps) => {

    const [changeMail , setChangeMail] = useState("");
    const [changePhone, setChangePhone] = useState("");

    const handleChange = async () => {
        try {
            let endpoint = sheetType === 'email' ? "/change-mail" : "/change-phone";
            let payload = sheetType === 'email' 
                ? { changeMail: changeMail } 
                : { changePhone: changePhone };
    
            const response = await Api.post(endpoint, payload);
    
            console.log(response.data);
    
            // Ensure response.data.message is a string before using it
            const successMessage = typeof response.data.success === 'string' ? response.data.success : "Operation successful.";
            const errorMessage = typeof response.data.message === 'string' ? response.data.message : "An error occurred.";
    
            if (response.data.success) {
                Alert.alert("Success", successMessage);
                sheetType === 'email' ? setChangeMail("") : setChangePhone("");
            } else {
                Alert.alert("Error", errorMessage);
            }
        } catch (error: any) {
            console.error("Error:", error);
    
            let errorMessage = "An unknown error occurred. Please try again.";
    
            if (error.response) {
                if (typeof error.response.data?.message === 'string') {
                    errorMessage = error.response.data.message;
                } else if (Array.isArray(error.response.data?.errors) && error.response.data.errors.length > 0) {
                    errorMessage = error.response.data.errors[0]?.msg || errorMessage;
                }
            } else if (error.request) {
                errorMessage = "No response from server. Please try again later.";
            }
    
            Alert.alert("Error", errorMessage);
        }
    };
    
    

    const {colors} : {colors : any} = useTheme();
    const [sheetType , setSheetType] = useState<string>('email');

    const bottomSheetRef = useRef<any>(null);
    const snapPoints = [230];

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const renderBackdrop = useCallback(
        (props:any) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
          />
        ),
        []
    );

    return (
        <SafeAreaView
            style={{
                flex:1,
                backgroundColor:colors.background,
            }}
        >
            <Header
                title='Settings'
                leftIcon='back'
            />
            <ScrollView>
                <View style={GlobalStyleSheet.container}>
                    {menuData.map((data:any,index) => {
                        return(
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    if (data.navigate) {
                                        navigation.navigate(data.navigate);
                                    } else if (data.sheet === 'email' || data.sheet === 'phone') {
                                        setSheetType(data.sheet);
                                        bottomSheetRef.current?.snapToIndex(0);
                                    }
                                }}
                                
                                
                                
                                style={{
                                    marginBottom:8,
                                    flexDirection:'row',
                                    alignItems:'center',
                                    paddingVertical:5,
                                }}
                            >
                                <View
                                    style={{
                                        height:40,
                                        width:40,
                                        borderRadius:SIZES.radius,
                                        borderWidth:1,
                                        borderColor:colors.border,
                                        backgroundColor:colors.input,
                                        alignItems:'center',
                                        justifyContent:'center',
                                        marginRight:15,
                                    }}
                                >
                                    <Image
                                        source={data.icon}
                                        style={{
                                            height:18,
                                            width:18,
                                            tintColor:colors.title,
                                        }}
                                    />
                                </View>
                                <Text style={[FONTS.h6,FONTS.fontSemiBold,{color:colors.title,lineHeight:18,flex:1}]}>{data.title}</Text>
                                {data.type === 'theme' ?
                                    <ThemeBtn/>
                                    :
                                    <Feather 
                                        name='chevron-right'
                                        size={20}
                                        color={colors.text}
                                    />
                                }
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>

            <BottomSheet
                enablePanDownToClose={true}
                ref={bottomSheetRef}
                backdropComponent={renderBackdrop}
                index={-1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                backgroundStyle={{
                    backgroundColor:colors.cardBg,
                    borderTopLeftRadius:25,
                    borderTopRightRadius:25,
                }}
                handleIndicatorStyle={{
                    backgroundColor:colors.border,
                    width:100,
                    height:6,
                }}
            >
                <BottomSheetView style={[GlobalStyleSheet.container]}>
                    <View style={{paddingTop:10}}>
                        {sheetType === 'email' ?
                            <View style={GlobalStyleSheet.inputGroup}>
                                <Text style={[GlobalStyleSheet.label,{color:colors.title}]}>Change Email</Text>
                                <BottomSheetTextInput 
                                    style={[GlobalStyleSheet.input,{
                                        color : colors.title,
                                        backgroundColor : colors.input,
                                        borderColor:colors.border,
                                    }]}
                                    value={changeMail}
                                    onChangeText={setChangeMail}
                                    placeholder='Type your email'
                                    placeholderTextColor={colors.text}
                                />
                            </View>
                            :
                        sheetType === 'phone' ?
                            <View style={GlobalStyleSheet.inputGroup}>
                                <Text style={[GlobalStyleSheet.label,{color:colors.title}]}>Phone Number</Text>
                                <BottomSheetTextInput 
                                    style={[GlobalStyleSheet.input,{
                                        color : colors.title,
                                        backgroundColor : colors.input,
                                        borderColor:colors.border,
                                    }]}
                                    value={changePhone}
                                    onChangeText={setChangePhone}
                                    placeholder='Type your number'
                                    placeholderTextColor={colors.text}
                                />
                            </View>
                            :
                            <></>
                        }
                    </View>
                    <View
                        style={{
                            paddingHorizontal:15,
                            paddingBottom:30,
                            paddingTop:10,
                        }}
                    >
                        <Button
                            onPress={handleChange}
                            title={'Submit'}
                        />
                    </View>
                </BottomSheetView>
            </BottomSheet>

        </SafeAreaView>
    )
}

export default Settings;