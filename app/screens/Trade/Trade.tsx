import React, {useState} from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, StyleSheet,Alert } from 'react-native';
import { CompositeScreenProps, useTheme } from '@react-navigation/native';
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { BottomTabParamList } from '../../navigation/BottomTabParamList';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import CoinDropDown from './CoinDropDown';
import { IMAGES } from '../../constants/Images';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import TabStyle1 from '../../components/Tabs/TabStyle1';
import LimitOrder from './LimitOrder';
import MarketOrder from './MarketOrder';
import Button from '../../components/Button/Button';
import OrderTabs from './OrderTabs';
import OrderBook from './OrderBook';
import OpenOrder from './OpenOrder';
import TradeHistory from './TradeHistory';
import {Feather}  from '@expo/vector-icons';

type TradeScreenProps = CompositeScreenProps<
    StackScreenProps<BottomTabParamList, 'Trade'>,
    StackScreenProps<RootStackParamList>
>;

const TradeScreen = ({navigation} : TradeScreenProps) => {
    
    const {colors} : {colors : any} = useTheme();
     const [modalShow , setModal] = useState<boolean>(false);
    const [activeTab , setActiveTab] = useState<string>('buy');
    const [activeTab2 , setActive2Tab] = useState<string>('Limit');
    const [activeSpot, setActiveSpot] =useState('spot');
    const [isPaused, setIsPaused] = useState(false);
    const [coinData , setCoinData] = useState<any>({
            image : IMAGES.bitcoin,
            name : 'Spot',
            tag : 'BTC',
            balance : '$8,456.87',
            amount : '0.154836',
            rate : '+4.2',
        });
        const toggleSpot = () => {
            setActiveSpot(prev => (prev === 'spot' ? 'future' : 'spot'));
          };
          const pausePlay = () => {
            console.log('hieihei');
            Alert.alert(
              'Confirmation',
              `Are you sure you want to ${isPaused ? 'resume' : 'pause'}?`,
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: () => setIsPaused(!isPaused),
                },
              ],
              { cancelable: false }
            );
          };

    return (
        <SafeAreaView
            style={{
                flex:1,
                backgroundColor:colors.background,
            }}
        >
            <Image
                source={IMAGES.pattern2}
                style={GlobalStyleSheet.colorBg1}
            />
            <Image
                source={IMAGES.pattern3}
                style={GlobalStyleSheet.colorBg2}
            />
            <Header
                title='Trade'
                leftIcon='back'
                leftAction={() => navigation.navigate('Home')}
            />
            <ScrollView>
                <View style={GlobalStyleSheet.container}>
                    {/* <CoinDropDown colors={colors}/> */}
                    <View
            style={{
                marginHorizontal:-8,
                marginTop:-8,
                marginBottom:20,
            }}
        >
            <TouchableOpacity
                onPress={() => setModal(true)}
                activeOpacity={.8}
                style={{
                    borderRadius:SIZES.radius,
                    flexDirection:'row',
                    backgroundColor:colors.input,
                    borderWidth:1,
                    borderColor:colors.border,
                    alignItems:'center',
                    paddingHorizontal:12,
                    paddingVertical:8,
                }}
            >
                <View
                    style={{
                        height:40,
                        width:40,
                        borderRadius:20,
                        backgroundColor:colors.card,
                        alignItems:'center',
                        justifyContent:'center',
                        marginRight:10,
                    }}
                    
                >
                    <Image
                        style={{
                            height:20,
                            width:20,
                            resizeMode:'contain',
                            tintColor:colors.title,
                        }}
                        source={IMAGES.bitcoin}
                    />
                </View>
                <View style={{flex:1}}>
                    <Text onPress={toggleSpot}
                    style={[
                        FONTS.h6,FONTS.fontSemiBold,{
                            color:colors.title,
                            marginBottom:6,
                            marginTop:-2,
                        }
                        
                    ]}>{activeSpot}</Text>
                    {/* <Text style={[FONTS.fontXs,FONTS.fontBaseMedium,{color:colors.text}]}>{coinData.tag}</Text> */}
                </View>
                <View style={{flex:1}}>
                    {/* <Text style={[
                        FONTS.h6,FONTS.fontSemiBold,{
                            color:colors.title,
                            marginBottom:6,
                            marginTop:-2,
                        }
                    ]}>{coinData.name}</Text> */}
                </View>
                <View
                    style={{
                        marginRight:12,
                        alignItems:'flex-end',
                    }}
                >
                    <Text onPress={toggleSpot} style={[
                        FONTS.h6,FONTS.fontBaseSemiBold,{
                            color:colors.title,
                        }
                    ]}>{coinData.balance}</Text>
                    <Text style={[
                        FONTS.fontXs,{
                            color:coinData.rate > 0 ? COLORS.success : COLORS.danger,
                        }
                    ]}>{coinData.rate}%</Text>
                </View>
                <Feather  size={22} color={colors.text} onPress={pausePlay}  name={isPaused ? 'play-circle' : 'pause-circle'}/>
            </TouchableOpacity>
            

            {/* <CoinSheet
                modal={modalShow}
                setModal={setModal}
                setCoinData={setCoinData}
            /> */}
        </View>
                    {/* <View
                        style={[styles.tabRow,{
                            backgroundColor:colors.card,
                        }]}
                    >
                        <TouchableOpacity
                            onPress={() => setActiveTab('buy')}
                            style={[styles.tabBtn,{
                                borderColor:colors.border,
                            },activeTab === 'buy' && {
                                backgroundColor: COLORS.primary,
                            }]}
                        >
                            <Text style={[FONTS.h6,FONTS.fontSemiBold,{color:colors.title,lineHeight:18},activeTab === 'buy' && {color:COLORS.title}]}>Buy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setActiveTab('sell')}
                            style={[styles.tabBtn,{
                                borderColor:colors.border,
                            },activeTab === 'sell' && {
                                backgroundColor: COLORS.danger,
                            }]}
                        >
                            <Text style={[FONTS.h6,FONTS.fontSemiBold,{color:colors.title,lineHeight:18},activeTab === 'sell' && {color:COLORS.white}]}>Sell</Text>
                        </TouchableOpacity>
                    </View> */}
                    {/* <View style={{marginBottom:15}}>
                        <TabStyle1 
                            size={'sm'}
                            color={'#fff'}
                            tabMenu={['Market','Limit']}
                            setActiveTab={setActive2Tab}
                            activeTab={activeTab2}
                            activeIndex={1}
                            colors={colors}
                        />
                    </View> */}

                    
                    {/* {activeTab2 === 'Limit' ?
                        <LimitOrder
                            colors={colors}
                        />
                        :
                    activeTab2 === 'Market' ?
                        <MarketOrder
                            colors={colors}
                        />
                        :
                        <></>
                    }

                    <View style={{
                        paddingHorizontal:15,
                        marginBottom:25,
                    }}>
                        {activeTab === "buy" ?
                            <Button
                                onPress={() => {}}
                                title='Buy BTC'
                            />
                            :
                        activeTab === "sell" ?
                            <Button
                                onPress={() => {}}
                                color={COLORS.danger}
                                title='Sell BTC'
                            />
                            :
                            <></>
                        }
                    </View> */}
                    
                    {/* <OrderBook colors={colors}/> */}

                    {/* <OrderTabs
                        colors={colors}
                    /> */}
                    <TabStyle1
                tabMenu={['Open Orders','Trade History']}
                setActiveTab={setActiveTab}
                activeTab={activeTab}
                colors={colors}
            />

            {activeTab === "Open Orders" ?
                <OpenOrder colors={colors}/>
                :
            activeTab === "Trade History" ?
                <TradeHistory colors={colors}/>
                :
                <OpenOrder colors={colors}/>
            }
                    
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    tabRow : {
        flexDirection:'row',
        marginHorizontal:-15,
        paddingHorizontal:10,
        paddingVertical:5,
        marginTop:10,
        marginBottom:10,
    },
    tabBtn : {
        height:45,
        flex:1,
        borderWidth:1,
        borderRadius:SIZES.radius_sm,
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal:5,
    }
});

export default TradeScreen;