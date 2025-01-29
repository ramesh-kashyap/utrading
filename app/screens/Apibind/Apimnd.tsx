import React from "react";
import {View, Text, SafeAreaView, ScrollView, Platform } from "react-native";
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import Input from "../../components/Input/Input";
import Header from "../../layout/Header";
import {FontAwesome} from '@expo/vector-icons';
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
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    </SafeAreaView>
    )
}

export default Apimnd;