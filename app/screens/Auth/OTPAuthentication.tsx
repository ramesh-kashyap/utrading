import React ,{  useState } from 'react';
import { 
    View, 
    Text, 
    Image, 
    SafeAreaView, 
    ScrollView,
    Alert,
    TouchableOpacity
} from 'react-native';
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { useTheme } from '@react-navigation/native';
import { IMAGES } from '../../constants/Images';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Header from '../../layout/Header';
import { OtpInput } from "react-native-otp-entry";
import Button from '../../components/Button/Button';
import Api from '../../../services/Api';
import { useRouter } from 'expo-router';
type OTPAuthenticationScreenProps = StackScreenProps<RootStackParamList, 'OTPAuthentication'>;

const OTPAuthentication = ({route,navigation} : OTPAuthenticationScreenProps) => {

    const {colors} : {colors : any} = useTheme();
    const [otp, setOtp] = useState('');
    const { userName, userPhone, userPassword } = route.params;
    const handleOTPChange = (value) => {
        console.log("OTP Entered:", value);
        if (value.length <= 6) { // Assuming a 6-digit OTP
            setOtp(value);
        }
    };
    const handleVerifyOtp = async () => {
        if (!otp) {
            Alert.alert('Error', 'Please enter the OTP');
            return;
        }
        console.log("phone",userPhone) ; 
        try {
            const response = await Api.post('/verify-otp', { phone: userPhone, otp });
            console.log(response.data);
            if (response.data.success) {
                Alert.alert('OTP Verified', 'Proceeding with registration');
                
                // Call API to register the user
                handleRegister();
            } else {
                Alert.alert('Error', 'Invalid OTP');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to verify OTP');
            console.log(error);
        }
    };

    const handleRegister = async () => {
        try {
            const response = await Api.post('/register', {
                name: userName,
                phone: userPhone,
                password: userPassword,
            });
            console.log(response.data);
            Alert.alert('Success', 'Registration successful');
            
            // Navigate to HomeScreen with user data
            navigation.navigate('Login');

        } catch (error) {
            Alert.alert('Error', 'Registration failed');
            console.log(error.response);
        }
    };

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
                            <Text style={[GlobalStyleSheet.label,{color:colors.title}]}>Phone</Text>
                            <View style={{alignItems:'center'}}>
                            <OtpInput
                numberOfDigits={6}
                focusColor="blue"
                onTextChange={(value) => setOtp(value)}
                theme={{
                    containerStyle: { marginBottom: 20 },
                    pinCodeContainerStyle: { borderBottomWidth: 2 },
                    pinCodeTextStyle: { fontSize: 20, color: "white" }
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
                            onPress={handleVerifyOtp}
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