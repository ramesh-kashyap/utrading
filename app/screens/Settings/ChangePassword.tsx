import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

const ChangePassword = () => {

    const {colors} : {colors : any} = useTheme();

    return (
        <SafeAreaView
            style={{
                flex:1,
                backgroundColor:colors.background,
            }}
        >
            <Header
                title='Change Password'
                leftIcon='back'
            />

            <ScrollView
                contentContainerStyle={{
                    flexGrow:1
                }}
            >    
                <View style={[GlobalStyleSheet.container,{flex:1}]}>
                    <View style={{flex:1,paddingTop:5}}>
                        <View style={GlobalStyleSheet.inputGroup}>
                            <Text style={[GlobalStyleSheet.label,{color:colors.title}]}>Current password</Text>
                            <Input
                                type='password'
                                placeholder='Current password'
                            />
                        </View>
                        <View style={GlobalStyleSheet.inputGroup}>
                            <Text style={[GlobalStyleSheet.label,{color:colors.title}]}>New password</Text>
                            <Input
                                type='password'
                                placeholder='New password'
                            />
                        </View>
                        <View style={GlobalStyleSheet.inputGroup}>
                            <Text style={[GlobalStyleSheet.label,{color:colors.title}]}>Confirm password</Text>
                            <Input
                                type='password'
                                placeholder='Confirm password'
                            />
                        </View>
                    </View>
                    <View
                        style={{
                            paddingHorizontal:15,
                            paddingVertical:15,
                        }}
                    >
                        <Button
                            onPress={() => {}}
                            title='Update'
                        />
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>   
    )
}

export default ChangePassword;