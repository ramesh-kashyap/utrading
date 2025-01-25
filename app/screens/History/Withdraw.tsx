import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { useTheme } from '@react-navigation/native';
import { IMAGES } from '../../constants/Images';

const WithdrawData = [
    {
        coin : 'Bitcoin',
        date : '05-09-2022',
        amount : '52,521.50',
        status : 'Complete',
    },
    {
        coin : 'Bitcoin',
        date : '05-09-2022',
        amount : '52,521.50',
        status : 'Complete',
    },
    {
        coin : 'Bitcoin',
        date : '05-09-2022',
        amount : '52,521.50',
        status : 'Complete',
    },
    {
        coin : 'Bitcoin',
        date : '05-09-2022',
        amount : '52,521.50',
        status : 'Complete',
    },
    {
        coin : 'Bitcoin',
        date : '05-09-2022',
        amount : '52,521.50',
        status : 'Complete',
    },
    {
        coin : 'Bitcoin',
        date : '05-09-2022',
        amount : '52,521.50',
        status : 'Complete',
    },
    {
        coin : 'Bitcoin',
        date : '05-09-2022',
        amount : '52,521.50',
        status : 'Complete',
    },
    {
        coin : 'Bitcoin',
        date : '05-09-2022',
        amount : '52,521.50',
        status : 'Complete',
    },
    {
        coin : 'Bitcoin',
        date : '05-09-2022',
        amount : '52,521.50',
        status : 'Complete',
    },
    {
        coin : 'Bitcoin',
        date : '05-09-2022',
        amount : '52,521.50',
        status : 'Complete',
    },
    {
        coin : 'Bitcoin',
        date : '05-09-2022',
        amount : '52,521.50',
        status : 'Complete',
    },
]

const Withdraw = () => {

    const {colors} : {colors : any} = useTheme();

    return (
        <ScrollView>
            <View
                style={GlobalStyleSheet.container}
            >
                {WithdrawData.map((data,index) => {
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
                            <View
                                style={{
                                    height:40,
                                    width:40,
                                    borderRadius:SIZES.radius_sm,
                                    alignItems:'center',
                                    justifyContent:'center',
                                    backgroundColor:COLORS.danger,
                                    marginRight:12,
                                }}
                            >
                                <Image
                                    source={IMAGES.withdraw2}
                                    style={{
                                        height:18,
                                        width:18,
                                        tintColor:COLORS.white,
                                        resizeMode:'contain',
                                    }}
                                />
                            </View>
                            <View style={{flex:1}}>
                                <Text style={[FONTS.font,FONTS.fontSemiBold,{color:colors.title,marginBottom:8,top:-1}]}>{data.coin}</Text>
                                <Text style={[FONTS.fontXs,{color:colors.text}]}>{data.date}</Text>
                            </View>
                            <View style={{alignItems:'flex-end'}}>
                                <Text style={[FONTS.font,FONTS.fontBaseSemiBold,{color:colors.title,marginBottom:5}]}>{data.amount}</Text>
                                <Text style={[FONTS.fontXs,{color:COLORS.success}]}>{data.status}</Text>
                            </View>
                        </View>
                    )
                })}
            </View>
        </ScrollView>
    )
}

export default Withdraw;