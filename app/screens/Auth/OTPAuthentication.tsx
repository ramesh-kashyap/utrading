import React from 'react';
import { 
    View, 
    Text, 
    Image, 
    SafeAreaView, 
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { useTheme } from '@react-navigation/native';
import { IMAGES } from '../../constants/Images';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Header from '../../layout/Header';
import OTPTextInput from 'react-native-otp-textinput';
import Button from '../../components/Button/Button';

type OTPAuthenticationScreenProps = StackScreenProps<RootStackParamList, 'OTPAuthentication'>;

const OTPAuthentication = ({navigation} : OTPAuthenticationScreenProps) => {

    const {colors} : {colors : any} = useTheme();

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
                title="OTP Authentication"
                leftIcon={'back'}
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
                            <Text style={[GlobalStyleSheet.loginTitle,{color:colors.title}]}>Enter OTP</Text>
                            <Text style={[GlobalStyleSheet.loginDesc,{color:colors.text}]}>A verification code has been dispatched to you at your email address.</Text>
                        </View>
                        <View style={GlobalStyleSheet.inputGroup}>
                            <Text style={[GlobalStyleSheet.label,{color:colors.title}]}>Email</Text>
                            <View style={{alignItems:'center'}}>
                                <OTPTextInput 
                                    tintColor={COLORS.primary}
                                    textInputStyle={{
                                        borderBottomWidth : 2,
                                        color :colors.title,
                                    }}
                                    containerStyle={{
                                        width : 300,
                                        marginVertical:20
                                    }}
                                    
                                />
                            </View>
                        </View>
                        <View style={{
                            alignItems:'flex-end',
                            marginBottom:20,
                        }}>
                            <TouchableOpacity
                                style={{
                                    position:'relative',
                                }}
                            >
                                <Text style={GlobalStyleSheet.linkBtn}>Resend Code</Text>
                                <View style={GlobalStyleSheet.linkUnderLine}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    <View
                        style={GlobalStyleSheet.loginBtnArea}
                    >
                        <Button
                            title={'Submit'}
                            onPress={() => navigation.navigate('ResetPassword')}
                        />
                        <View
                            style={{
                                flexDirection:'row',
                                justifyContent:'center',
                                paddingVertical:15,
                            }}
                        >
                            <Text style={{...FONTS.font,color:colors.title}}>Back to </Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Login')}
                                style={{
                                    position:'relative',
                                }}
                            >
                                <Text style={GlobalStyleSheet.linkBtn}>Login</Text>
                                <View style={GlobalStyleSheet.linkUnderLine}/>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </ScrollView>

        </SafeAreaView>
    )
}
export default OTPAuthentication;