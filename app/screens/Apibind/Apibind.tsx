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
import { useNavigation } from "@react-navigation/native";
type ApibindProps = StackScreenProps<RootStackParamList, "Apibind">;

const exchanges = [
    {
        name: 'Binance',
        image: 'https://storage.googleapis.com/a1aa/image/GyxXJRoqiq46GdSebL2FQg9dL66wIvjreOpJLbGlIbsURdenA.jpg',
        description: 'Support spot, UDS-M futures',
        link: 'https://www.binance.com/en/terms',
    },
    {
        name: 'Binance US',
        image: 'https://storage.googleapis.com/a1aa/image/2ruz4e85oaSeL07MU8MoyBwXBZCKvz4uxYWJrMphbuQIRdenA.jpg',
        description: 'Support spot trading',
        link: 'https://www.binance.us/en/terms-of-use',
      },
      {
        name: 'OKX',
        image: 'https://storage.googleapis.com/a1aa/image/uPK4vWAINWajGxebGU2r22IGDhrkSsy2varbwfE6igRWRdenA.jpg',
        description: 'Support spot and futures trading',
        link: 'https://www.okx.com/en/terms-of-service',
      },
      {
        name: 'Bybit',
        image: 'https://storage.googleapis.com/a1aa/image/uNtVZL0phorAFBRXC44zucGzCiKe7dR4q4ZPbQIlkX8ooOfTA.jpg',
        description: 'Support spot and futures trading',
        link: 'https://www.bybit.com/terms-of-service/',
      },
      {
        name: 'Bitget',
        image: 'https://storage.googleapis.com/a1aa/image/Y8kb0hd9YzKhGBeJ1ktSpwJQ4dC7dDSvEgM1xFFep7gJRdenA.jpg',
        description: 'Support spot and futures trading',
        link: 'https://www.bitget.com/en/terms',
      },
      {
        name: 'Kucoin',
        image: 'https://storage.googleapis.com/a1aa/image/U9k5ZNiY3F5nL1KPdh0UmV5rrI0kOhIMfBh4MTt3CSBnoOfTA.jpg',
        description: 'Support spot and futures trading',
        link: 'https://www.kucoin.com/terms',
      },
      {
        name: 'Bitfinex',
        image: 'https://storage.googleapis.com/a1aa/image/d8zqOvPSQAIZG5ufAr5KjzBflbA45jzfx1k36B9VXmwWi68nA.jpg',
        description: 'Support spot trading',
        link: 'https://www.bitfinex.com/legal/terms',
      },
      {
        name: 'HTX Global',
        image: 'https://storage.googleapis.com/a1aa/image/OGkCzjqQGKreLy6upeYmuWrzg751nSnfCtCluCYagQqeE15PB.jpg',
        description: 'Support spot and futures trading',
        link: 'https://www.htx.com/en-us/terms',
      },
      {
        name: 'Kraken Spot',
        image: 'https://storage.googleapis.com/a1aa/image/U0osKJT5k8LfECIFPMOfo6ReFGr70D3A5CZCuIYLFsFmi68nA.jpg',
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
                leftAction={() => navigation.navigate('Home')}
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