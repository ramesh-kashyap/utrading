import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import {Feather}  from '@expo/vector-icons';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { IMAGES } from '../../constants/Images';
import { COLORS } from '../../constants/theme';

const EditProfile = () => {
    
    const {colors} : {colors : any} = useTheme();

    return (
        <SafeAreaView
            style={{
                flex:1,
                backgroundColor:colors.background,
            }}
        >
            <Header
                leftIcon='back'
                title='Edit Profile'
            />
            <ScrollView
                contentContainerStyle={{
                    flexGrow:1
                }}
            >
                <View
                    style={[GlobalStyleSheet.container,{flex:1}]}
                >
                    <View
                        style={{
                            flex : 1
                        }}
                    >
                        <View
                            style={{
                                alignItems:'center',
                                marginBottom:30,
                                marginTop:10,
                            }}
                        >
                            <View>
                                <Image
                                    source={IMAGES.profilePic}
                                    style={{
                                        height:100,
                                        width:100,
                                        borderRadius:100,
                                    }}
                                />
                                <TouchableOpacity
                                    style={{
                                        height:32,
                                        width:32,
                                        backgroundColor:COLORS.primary,
                                        borderRadius:24,
                                        borderWidth:3,
                                        borderColor:colors.background,
                                        position:'absolute',
                                        bottom:0,
                                        right:0,
                                        alignItems:'center',
                                        justifyContent:'center',
                                    }}
                                >
                                    <Image
                                        style={{
                                            height:14,
                                            width:14,
                                            tintColor:COLORS.title,
                                        }}
                                        source={IMAGES.edit}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={GlobalStyleSheet.inputGroup}>
                            <Text style={[GlobalStyleSheet.label,{color:colors.title}]}>Username</Text>
                            <Input
                                placeholder={'Type your usename'}
                                defaultValue={'Yatin Xarma'}
                            />
                        </View>
                        <View style={GlobalStyleSheet.inputGroup}>
                            <Text style={[GlobalStyleSheet.label,{color:colors.title}]}>Email</Text>
                            <Input
                                placeholder={'Type your email'}
                                defaultValue={'yatin@example.com'}
                            />
                        </View>
                    </View>
                    <View style={{padding:15}}>
                        <Button
                            onPress={() => {}}
                            title='Save'
                        />
                    </View> 
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default EditProfile;