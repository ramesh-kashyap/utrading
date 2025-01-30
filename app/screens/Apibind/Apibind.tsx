import React from "react";
import {View, Text, SafeAreaView, ScrollView, Platform } from "react-native";
// import WalletList from "../../components/List/WalletList";
import ApiList from "./ApiList";

import {IMAGES} from '../../constants/Images';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { CompositeScreenProps, useTheme } from '@react-navigation/native';
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { BottomTabParamList } from '../../navigation/BottomTabParamList';
import Header from '../../layout/Header';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import { useNavigation } from "@react-navigation/native";
type ApibindProps = StackScreenProps<RootStackParamList, "Apibind">;

const exchanges = [
    {
        name: 'Binance',
        image: IMAGES.Binance,
        description: 'Support spot, UDS-M futures',
        link: 'https://www.binance.com/en/terms',
    },
    {
        name: 'Binance US',
        image: IMAGES.BinanceUS,
        description: 'Support spot trading',
        link: 'https://www.binance.us/en/terms-of-use',
      },
      {
        name: 'OKX',
        image: IMAGES.OKX,
        description: 'Support spot and futures trading',
        link: 'https://www.okx.com/en/terms-of-service',
      },
      {
        name: 'Bybit',
        image: IMAGES.Bybit,
        description: 'Support spot and futures trading',
        link: 'https://www.bybit.com/terms-of-service/',
      },
      {
        name: 'Bitget',
        image: IMAGES.Bitget,
        description: 'Support spot and futures trading',
        link: 'https://www.bitget.com/en/terms',
      },
      {
        name: 'Kucoin',
        image: IMAGES.Kucoin,
        description: 'Support spot and futures trading',
        link: 'https://www.kucoin.com/terms',
      },
      {
        name: 'Bitfinex',
        image: IMAGES.Bitfinex,
        description: 'Support spot trading',
        link: 'https://www.bitfinex.com/legal/terms',
      },
      {
        name: 'HTX Global',
        image: IMAGES.HTXGlobal,
        description: 'Support spot and futures trading',
        link: 'https://www.htx.com/en-us/terms',
      },
      {
        name: 'Kraken Spot',
        image: IMAGES.KrakenSpot,
        description: 'Support spot trading',
        link: 'https://www.kraken.com/legal',
      },
]

const Apibind: React.FC<ApibindProps> = ({ navigation }) =>{

    const theme = useTheme();
        const {colors} : {colors : any} = theme;

    return(
       
        

        <SafeAreaView
            style={{
                flex:1,
                backgroundColor:colors.background,
            }}
        >
            <Header
                title='ApiBind'
                leftIcon='back'
                // leftAction={() => navigation.navigate('')}
            />
            <ScrollView>
                <View style={GlobalStyleSheet.container}>
                    <View>
                    {exchanges.map((data,index)=>{
                return(
                    <ApiList
                    image={data.image}
                    name={data.name}
                    description="Import"
                    
                    key={index}
                    />
                )      

            })} 
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Apibind;