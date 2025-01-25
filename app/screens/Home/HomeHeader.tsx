import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {Feather}  from '@expo/vector-icons';
import { COLORS, FONTS } from '../../constants/theme';
import { IMAGES } from '../../constants/Images';

type Props = {
    colors : any;
    navigation : any;
}

const HomeHeader = ({colors, navigation}:Props) => {
    return (
        <View
            style={{
                flexDirection:'row',
                alignItems:'center',
            }}
        >
            <Image
                style={{
                    height:40,
                    width:40,
                    borderRadius:20,
                    marginRight:10,
                }}
                source={IMAGES.profilePic}
            />
            <View style={{flex:1}}>
                <Text style={[FONTS.font,FONTS.fontSemiBold,{color:colors.title,marginBottom:6}]}>Yatin Xarma</Text>
                <Text style={[FONTS.fontXs,{color:colors.text}]}>yatin@example.com</Text>
            </View>

            <TouchableOpacity
                onPress={() => navigation.navigate('Notifications')}
                style={[style.headerBtn,{backgroundColor:colors.border}]}
            >
                <Feather  color={colors.title} size={22} name='bell'/>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.openDrawer()}
                style={[style.headerBtn,{backgroundColor:colors.border}]}
            >
                <Feather  color={colors.title} size={22} name='grid'/>
            </TouchableOpacity>

        </View>
    )
}

const style = StyleSheet.create({
    headerBtn : {
        height:45,
        width:45,
        marginLeft:10,
        borderRadius:25,
        alignItems:'center',
        justifyContent:'center',
    }
});

export default HomeHeader;