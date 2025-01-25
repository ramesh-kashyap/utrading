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
import { FONTS } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Header from '../../layout/Header';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

type RegisterScreenProps = StackScreenProps<RootStackParamList, 'Register'>;

const Register = ({navigation} : RegisterScreenProps) => {

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
                title="Register"
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
                            <Text style={[GlobalStyleSheet.loginTitle,{color:colors.title}]}>Getting Started</Text>
                            <Text style={[GlobalStyleSheet.loginDesc,{color:colors.text}]}>A crypto login is a secure authentication process that enables users to access</Text>
                        </View>
                        <View style={GlobalStyleSheet.inputGroup}>
                            <Text style={[GlobalStyleSheet.label,{color:colors.title}]}>Email</Text>
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
                        <View style={GlobalStyleSheet.inputGroup}>
                            <Text style={[GlobalStyleSheet.label,{color:colors.title}]}>Confirm password</Text>
                            <Input
                                placeholder={'Confirm password'}
                                type={'password'}
                            />
                        </View>
                    </View>
                    
                    <View
                        style={GlobalStyleSheet.loginBtnArea}
                    >
                        <Button
                            title={'Register'}
                            onPress={() => navigation.navigate('Login')}
                        />
                        <View
                            style={{
                                flexDirection:'row',
                                justifyContent:'center',
                                paddingVertical:15,
                            }}
                        >
                            <Text style={{...FONTS.font,color:colors.title}}>Already have an account? </Text>
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
export default Register;