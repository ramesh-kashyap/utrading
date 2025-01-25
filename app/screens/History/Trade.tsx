import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { useTheme } from '@react-navigation/native';

const TradeData = [
    {
        coin : 'BTC / USDT',
        date : '05-09-2022',
        type : "Buy",
        price : '1051.50',
        filled : '685.54',
        role : 'Taker',
        total : '5458.50',
    },
    {
        coin : 'BTC / USDT',
        date : '05-09-2022',
        type : "Buy",
        price : '1051.50',
        filled : '685.54',
        role : 'Taker',
        total : '5458.50',
    },
    {
        coin : 'BTC / USDT',
        date : '05-09-2022',
        type : "Buy",
        price : '1051.50',
        filled : '685.54',
        role : 'Taker',
        total : '5458.50',
    },
    {
        coin : 'BTC / USDT',
        date : '05-09-2022',
        type : "Buy",
        price : '1051.50',
        filled : '685.54',
        role : 'Taker',
        total : '5458.50',
    },
    {
        coin : 'BTC / USDT',
        date : '05-09-2022',
        type : "Buy",
        price : '1051.50',
        filled : '685.54',
        role : 'Taker',
        total : '5458.50',
    },
    {
        coin : 'BTC / USDT',
        date : '05-09-2022',
        type : "Buy",
        price : '1051.50',
        filled : '685.54',
        role : 'Taker',
        total : '5458.50',
    },
    {
        coin : 'BTC / USDT',
        date : '05-09-2022',
        type : "Buy",
        price : '1051.50',
        filled : '685.54',
        role : 'Taker',
        total : '5458.50',
    },
    {
        coin : 'BTC / USDT',
        date : '05-09-2022',
        type : "Buy",
        price : '1051.50',
        filled : '685.54',
        role : 'Taker',
        total : '5458.50',
    },
    {
        coin : 'BTC / USDT',
        date : '05-09-2022',
        type : "Buy",
        price : '1051.50',
        filled : '685.54',
        role : 'Taker',
        total : '5458.50',
    },
    {
        coin : 'BTC / USDT',
        date : '05-09-2022',
        type : "Buy",
        price : '1051.50',
        filled : '685.54',
        role : 'Taker',
        total : '5458.50',
    },
    {
        coin : 'BTC / USDT',
        date : '05-09-2022',
        type : "Buy",
        price : '1051.50',
        filled : '685.54',
        role : 'Taker',
        total : '5458.50',
    },
]

const Trade = () => {

    const {colors} : {colors : any} = useTheme();

    return (
        <ScrollView>
            <View
                style={GlobalStyleSheet.container}
            >
                {TradeData.map((data,index) => {
                    return(
                        <View
                            key={index}
                            style={{
                                backgroundColor:colors.input,
                                marginBottom:8,
                                paddingHorizontal:10,
                                paddingVertical:10,
                                borderRadius:SIZES.radius_sm,
                                borderWidth:1,
                                borderColor:colors.border,
                            }}
                        >
                            <View style={{flexDirection:'row',alignItems:'center',marginBottom:1}}>
                                <Text style={[FONTS.font,FONTS.fontSemiBold,{color:colors.title,flex:1}]}>{data.coin}</Text>
                                <Text style={[FONTS.fontXs,{color:colors.text}]}>{data.date}</Text>
                             </View>
                             <Text style={[FONTS.font,FONTS.fontMedium,{color:colors.title,marginBottom:4}]}>{data.type}</Text>
                             <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Text style={[FONTS.fontSm,{color:colors.text,flex:1}]}>Price</Text>
                                <Text style={[FONTS.fontSm,{color:colors.title}]}>{data.price}</Text>
                            </View>
                             <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Text style={[FONTS.fontSm,{color:colors.text,flex:1}]}>Filled</Text>
                                <Text style={[FONTS.fontSm,{color:colors.title}]}>{data.filled}</Text>
                            </View>
                             <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Text style={[FONTS.fontSm,{color:colors.text,flex:1}]}>Role</Text>
                                <Text style={[FONTS.fontSm,{color:colors.title}]}>{data.role}</Text>
                            </View>
                             <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Text style={[FONTS.fontSm,{color:colors.text,flex:1}]}>Total</Text>
                                <Text style={[FONTS.fontSm,{color:colors.title}]}>{data.total}</Text>
                            </View>
                        </View>
                    )
                })}
            </View>
        </ScrollView>
    )
}

export default Trade;