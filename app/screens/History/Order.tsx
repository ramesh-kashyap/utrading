import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { useTheme } from '@react-navigation/native';
import { IMAGES } from '../../constants/Images';

const OrderData = [
    {
        coin : 'Bitcoin',
        date : '05-09-2022',
        amount : '52,521.50',
        status : 'Complete',
        total  : '1506 BTC',
    },
    {
        coin : 'Bitcoin',
        date : '05-09-2022',
        amount : '52,521.50',
        status : 'Complete',
        total  : '1506 BTC',
    },
    {
        coin : 'Bitcoin',
        date : '05-09-2022',
        amount : '52,521.50',
        status : 'Complete',
        total  : '1506 BTC',
    },
    {
        coin : 'Bitcoin',
        date : '05-09-2022',
        amount : '52,521.50',
        status : 'Complete',
        total  : '1506 BTC',
    },
    {
        coin : 'Bitcoin',
        date : '05-09-2022',
        amount : '52,521.50',
        status : 'Complete',
        total  : '1506 BTC',
    },
    {
        coin : 'Bitcoin',
        date : '05-09-2022',
        amount : '52,521.50',
        status : 'Complete',
        total  : '1506 BTC',
    },
    {
        coin : 'Bitcoin',
        date : '05-09-2022',
        amount : '52,521.50',
        status : 'Complete',
        total  : '1506 BTC',
    },
    {
        coin : 'Bitcoin',
        date : '05-09-2022',
        amount : '52,521.50',
        status : 'Complete',
        total  : '1506 BTC',
    },
    {
        coin : 'Bitcoin',
        date : '05-09-2022',
        amount : '52,521.50',
        status : 'Complete',
        total  : '1506 BTC',
    },
    {
        coin : 'Bitcoin',
        date : '05-09-2022',
        amount : '52,521.50',
        status : 'Complete',
        total  : '1506 BTC',
    },
]

const Order = () => {

    const {colors} : {colors : any} = useTheme();

    return (
        <ScrollView>
            <View
                style={GlobalStyleSheet.container}
            >
                {OrderData.map((data,index) => {
                    return(
                        <View
                            key={index}
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                                backgroundColor:colors.input,
                                marginBottom:8,
                                paddingHorizontal:10,
                                paddingVertical:10,
                                borderRadius:SIZES.radius_sm,
                                borderWidth:1,
                                borderColor:colors.border,
                            }}
                        >
                            <View style={{flex:1}}>
                                <Text style={[FONTS.font,FONTS.fontSemiBold,{color:colors.title,marginBottom:6,top:-1}]}>{data.coin}</Text>
                                <Text style={[FONTS.fontXs,{color:colors.text,marginBottom:6}]}>Total</Text>
                                <Text style={[FONTS.fontXs,{color:colors.text}]}>{data.date}</Text>
                            </View>
                            <View style={{alignItems:'flex-end'}}>
                                <Text style={[FONTS.font,FONTS.fontBaseSemiBold,{color:colors.title,marginBottom:6}]}>{data.amount}</Text>
                                <Text style={[FONTS.fontXs,{color:colors.title,marginBottom:6}]}>{data.total}</Text>
                                <Text style={[FONTS.fontXs,{color:COLORS.success}]}>{data.status}</Text>
                            </View>
                        </View>
                    )
                })}
            </View>
        </ScrollView>
    )
}

export default Order;