import React from 'react';
import { View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FONTS, SIZES } from '../../constants/theme';
import { IMAGES } from '../../constants/Images';

type Props = {
    colors : any;
}

const InfoCard = ({colors} : Props) => {
    return (
        <View
            style={{
                paddingHorizontal:15,
                paddingVertical:15,
                borderRadius:SIZES.radius,
                backgroundColor:colors.card,
                flexDirection:'row',
                marginBottom:18,
            }}
        >
            <View style={{
                flex:1,
                alignItems:'center',
            }}>
                <View
                    style={{
                        height:50,
                        width:50,
                        borderRadius:25,
                        backgroundColor:colors.border,
                        marginBottom:15,
                        marginTop:5,
                        alignItems:'center',
                        justifyContent:'center',
                    }}
                >
                    <Image
                        source={IMAGES.wallet2}
                        style={{
                            height:22,
                            width:22,
                            tintColor:colors.title,
                        }}
                    />
                </View>
                <Text style={[FONTS.fontXs,{color:colors.text,marginBottom:6}]}>Total Deposit</Text>
                <Text style={[FONTS.h5,FONTS.fontBaseSemiBold,{color:colors.title,lineHeight:24}]}>$15,150.25</Text>
            </View>
            <LinearGradient
                colors={["rgba(255,255,255,0)",colors.border,"rgba(255,255,255,0)"]}
                style={{
                    width:1,
                    marginHorizontal:10
                }}
            >               
            </LinearGradient>
            <View style={{
                flex:1,
                alignItems:'center',
            }}>
                <View
                    style={{
                        height:50,
                        width:50,
                        borderRadius:25,
                        backgroundColor:colors.border,
                        marginBottom:15,
                        marginTop:5,
                        alignItems:'center',
                        justifyContent:'center',
                    }}
                >
                    <Image
                        source={IMAGES.profitLoss}
                        style={{
                            height:22,
                            width:22,
                            tintColor:colors.title,
                        }}
                    />
                </View>
                <Text style={[FONTS.fontXs,{color:colors.text,marginBottom:6}]}>Profit & Loss</Text>
                <Text style={[FONTS.h5,FONTS.fontBaseSemiBold,{color:colors.title,lineHeight:24}]}>$45,850.15</Text>
            </View>
        </View>
    )
}

export default InfoCard;