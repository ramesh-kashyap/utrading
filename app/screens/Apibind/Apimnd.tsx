import React from "react";
import {View, Text, SafeAreaView, ScrollView, Platform, TouchableOpacity  } from "react-native";
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import Input from "../../components/Input/Input";
import Header from "../../layout/Header";
import {FontAwesome} from '@expo/vector-icons';
import Button from '../../components/Button/Button';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const Apimnd =()=>{

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
                title={'Inputs'}  
                leftIcon={'back'}
                leftAction={() => navigation.navigate('Apibind')}
            />
            <ScrollView>
                <View style={GlobalStyleSheet.container}>
                    <View style={[GlobalStyleSheet.card,{backgroundColor:colors.card}]}>

                        <View style={[GlobalStyleSheet.cardHeader,{borderBottomColor:colors.border}]}>
                            <Text style={{...FONTS.h6,color:colors.title}}>Classic Input</Text>
                        </View>

                        <View style={GlobalStyleSheet.cardBody}>
                            <View style={{marginBottom:10}}>
                                <Input
                                    value={''}  
                                    placeholder="Enter Username"
                                    onChangeText={(value)=> console.log(value)}
                                />
                            </View>
                            <View style={{marginBottom:10}}>
                                <Input
                                    value={''}  
                                    placeholder="Enter Email"
                                    onChangeText={(value)=> console.log(value)}
                                />
                            </View>
                            <View style={{marginBottom:10}}>
                                <Input
                                    value={''}  
                                    type={'password'}
                                    placeholder="Enter Password"
                                    onChangeText={(value)=> console.log(value)}
                                />
                            </View>

                            <View style={GlobalStyleSheet.loginBtnArea}>
                        <Button
                            title={'Register'}
                            onPress={handleRegister}
                        />
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                paddingVertical: 15,
                            }}
                        >
                            <Text style={{ ...FONTS.font, color: colors.title }}>Already have an account? </Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Login')}
                                style={{
                                    position: 'relative',
                                }}
                            >
                                <Text style={GlobalStyleSheet.linkBtn}>Login</Text>
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