import React from 'react';
import { View, Text, Image } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { useTheme } from '@react-navigation/native';
import {Defs, LinearGradient, Stop} from "react-native-svg";
import { VictoryArea, VictoryChart } from 'victory-native';
import { IMAGES } from '../../constants/Images';

const chartData = [20,40,35,50,25,60,50,70,60,75,30,50,43,75,70,75];

type Props = {
    color ?: string;
    balance: number; 
    cardText : string;
}

const WalletCard = ({color, balance, cardText} : Props) => {

    const {colors} : {colors : any} = useTheme();

    return (
        <View
            style={{
                paddingHorizontal:15,
                paddingVertical:18,
                borderRadius:SIZES.radius,
                borderWidth:1,
                borderColor:'rgba(255,255,255,.25)',
                backgroundColor:colors.card,
                overflow:'hidden',
            }}
        >
            <Image
                source={IMAGES.pattern2}
                style={{
                    height:300,
                    width:300,
                    position:'absolute',
                    top:-120,
                    left:-100,
                    tintColor : color ? color : COLORS.primary,
                }}
            />
            <Text style={[FONTS.fontSm,{color:colors.title,marginBottom:3}]}>{cardText}</Text>
            <Text style={[FONTS.fontLg,FONTS.fontBaseSemiBold,{color:colors.title}]}>{balance.toFixed(2)} USD</Text>

            <View style={{marginLeft:-16,marginTop:18,overflow:'hidden',marginRight:-15}}>
                <View style={{marginBottom:-1}}>
                    <VictoryChart
                        width={(SIZES.width - 50) / 2}
                        height={60}
                        padding={0}
                    >
                        <Defs>
                            <LinearGradient x1="0%" y1="0%" x2="0%" y2="100%" id="gradientStroke" >
                            <Stop offset="0%" stopOpacity={.3} stopColor={color ? color : COLORS.primary}/>
                            <Stop offset="70%" stopOpacity={.05} stopColor={color ? color : COLORS.primary}/>
                            <Stop offset="100%" stopOpacity={0} stopColor={color ? color : COLORS.primary}/>
                            </LinearGradient>
                        </Defs>
                        <VictoryArea
                            domain={{y : [0,80]}}
                            interpolation="natural"
                            animate={{
                                duration: 500,
                                onLoad: { duration: 1000 }
                            }}
                            style={{
                                data: {
                                    fill: 'url(#gradientStroke)', fillOpacity: 0.6, stroke: color ? color : COLORS.primary, strokeWidth: 1
                                },
                                parent: { border: "10px solid #fff" }
                            }}
                            data={chartData}
                            labels={({ datum } : {datum : any}) => datum.x}
                        />
                    </VictoryChart>
                </View>
            </View>
            <View
                style={{
                    flexDirection:'row',
                    alignItems:'center',
                    paddingTop:10,
                    marginBottom:-5,
                }}
            >
                <Text style={{
                    ...FONTS.fontSm,
                    color : color ? color : COLORS.primary,
                    flex:1,
                }}>25,500 BTC</Text>
                <View
                    style={{
                        height:30,
                        width:30,
                        borderRadius:SIZES.radius_sm,
                        backgroundColor:colors.border,
                        alignItems:'center',
                        justifyContent:'center',
                    }}
                >
                    <Image
                        source={IMAGES.bitcoin}
                        style={{
                            height:14,
                            width:14,
                            resizeMode:'contain',
                            tintColor:colors.title,
                        }}
                    />
                </View>
            </View>
        </View>
    )
}

export default WalletCard;