import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import {Feather}  from '@expo/vector-icons';
import Header from '../../layout/Header';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { GlobalStyleSheet } from '../../constants/StyleSheet';

const accordionIco = require('../../assets/images/icons/accordion.png');
const bottomSheet = require('../../assets/images/icons/bottomSheet.png');
const modal = require('../../assets/images/icons/modal.png');
const chart = require('../../assets/images/icons/chart.png');
const divider = require('../../assets/images/icons/divider.png');
const badge = require('../../assets/images/icons/badge.png');
const input = require('../../assets/images/icons/input.png');
const list = require('../../assets/images/icons/list.png');
const pricing = require('../../assets/images/icons/pricing.png');
const share = require('../../assets/images/icons/share.png');
const tabs = require('../../assets/images/icons/tabs.png');
const table = require('../../assets/images/icons/table.png');
const toggle = require('../../assets/images/icons/toggle.png');

const ComponentData = [
    {
        icon : accordionIco,
        title : "Accordions List",
        navigate : 'Accordion',
    },
    {
        icon : bottomSheet,
        title : "Bottom Sheets",
        navigate : 'BottomSheet',
    },
    {
        icon : modal,
        title : "Modal Box",
        navigate : 'ModalBox',
    },
    {
        icon : accordionIco,
        title : "Button Styles",
        navigate : 'Buttons',
    },
    {
        icon : badge,
        title : "Badges",
        navigate : 'Badges',
    },
    {
        icon : chart,
        title : "Charts",
        navigate : 'Charts',
    },
    {
        icon : accordionIco,
        title : "Header Styles",
        navigate : 'Headers',
    },
    {
        icon : accordionIco,
        title : "Footer Menu Styles",
        navigate : 'Footers',
    },
    {
        icon : input,
        title : "Inputs",
        navigate : 'Inputs',
    },
    {
        icon : list,
        title : "List Styles",
        navigate : 'lists',
    },
    {
        icon : pricing,
        title : "Pricing Pack",
        navigate : 'Pricings',
    },
    {
        icon : divider,
        title : "Seprators",
        navigate : 'DividerElements',
    },
    {
        icon : accordionIco,
        title : "Snackbars",
        navigate : 'Snackbars',
    },
    {
        icon : share,
        title : "Social",
        navigate : 'Socials',
    },
    {
        icon : accordionIco,
        title : "Swipeable",
        navigate : 'Swipeable',
    },
    {
        icon : tabs,
        title : "Tabs",
        navigate : 'Tabs',
    },
    {
        icon : table,
        title : "Table",
        navigate : 'Tables',
    },
    {
        icon : toggle,
        title : "Toggle",
        navigate : 'Toggles',
    },
]
type ComponentScreenProps = StackScreenProps<RootStackParamList, 'Components'>;

const Components = ({navigation} : ComponentScreenProps) => {
    
    const {colors} : {colors : any} = useTheme();

    return (
        <SafeAreaView
            style={{
                flex:1,
                backgroundColor:colors.background,
            }}
        >
            <Header
                title='Components'
                leftIcon='back'
            />
            <ScrollView contentContainerStyle={[GlobalStyleSheet.container,{padding:0, paddingBottom:15,paddingTop:15}]}>
                {ComponentData.map((data:any,index) => {
                    return(
                        <TouchableOpacity
                            onPress={() => navigation.navigate(data.navigate)}
                            key={index}
                            style={{
                                flexDirection:'row',
                                backgroundColor:colors.input,
                                borderWidth:1,
                                borderColor:colors.border,
                                marginBottom : 5,
                                marginHorizontal : 15,
                                paddingHorizontal : 12,
                                alignItems:'center',
                                paddingVertical : 10,
                                borderRadius:SIZES.radius,
                            }}
                        >
                            <View style={{
                                height:30,
                                width:30,
                                borderRadius:30,
                                backgroundColor:COLORS.primary,
                                alignItems:'center',
                                justifyContent:'center',
                                marginRight:10,
                            }}>
                                <Image
                                    style={{
                                        height:20,
                                        width:20,
                                        tintColor:COLORS.title,
                                        resizeMode:'contain',
                                    }}
                                    source={data.icon}
                                />
                            </View>
                            <Text style={{...FONTS.font,...FONTS.fontMedium,color:colors.title,flex:1}}>{data.title}</Text>
                            <Feather  style={{opacity:.8}} color={colors.text} name={'chevron-right'} size={20}/>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Components;