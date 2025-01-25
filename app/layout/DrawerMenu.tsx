import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { IMAGES } from '../constants/Images';
import { FONTS } from '../constants/theme';

const MenuItems = [
    {
        icon : IMAGES.home2,
        title : "Home",
        navigate : 'DrawerNavigation',
    },
    {
        icon : IMAGES.grid,
        title : "Component",
        navigate : 'Components',
    },
    {
        icon : IMAGES.settings,
        title : "Settings",
        navigate : 'Settings',
    },
    {
        icon : IMAGES.history,
        title : "History",
        navigate : 'History',
    },
    {
        icon : IMAGES.logout,
        title : "Logout",
        navigate : 'Login',
    },
]

const DrawerMenu = ({navigation} : {navigation : any}) => {

    const {colors} : {colors : any} = useTheme();


    return (
        <ScrollView contentContainerStyle={{flexGrow:1}}>
            <View
                style={{
                    flex:1,
                    backgroundColor:colors.background,
                    paddingHorizontal:15,
                    paddingVertical:15,
                }}
            >
                <View
                    style={{
                        flexDirection:'row',
                        alignItems:'center',
                        borderBottomWidth:1,
                        borderBottomColor:colors.border,
                        paddingBottom:25,
                        paddingTop:10,
                    }}
                >
                    <Image
                        source={IMAGES.profilePic}
                        style={{
                            height:55,
                            width:55,
                            borderRadius:30,
                            marginRight:10,
                        }}
                    />
                    <View
                        style={{
                            flex:1,
                        }}
                    >
                        <Text style={[FONTS.font,FONTS.fontSemiBold,{color:colors.title,marginBottom:8}]}>Yatin Xarma</Text>
                        <Text style={[FONTS.fontXs,{color:colors.text}]}>yatinxarma@example.com</Text>
                    </View>
                </View>
                <View style={{flex:1,paddingVertical:20}}>
                    {MenuItems.map((data,index) => {
                        return(
                            <TouchableOpacity
                                onPress={() => data.navigate === "DrawerNavigation" ? navigation.closeDrawer() : navigation.navigate(data.navigate)}
                                key={index}
                                style={{
                                    flexDirection:'row',
                                    alignItems:'center',
                                    paddingVertical:8,
                                    marginBottom:12,
                                }}
                            >
                                <Image
                                    source={data.icon}
                                    style={{
                                        height:18,
                                        width:18,
                                        tintColor:colors.text,
                                        marginRight:14,
                                    }}
                                />
                                <Text style={[FONTS.font,FONTS.fontMedium,{color:colors.title,fontSize:15}]}>{data.title}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
                <View
                    style={{
                        paddingVertical:10,
                    }}
                >
                    <Text style={[FONTS.font,FONTS.fontSemiBold,{color:colors.title,marginBottom:8}]}>React Native Crypto App</Text>
                    <Text style={[FONTS.fontXs,{color:colors.text}]}>Version 1.0</Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default DrawerMenu;