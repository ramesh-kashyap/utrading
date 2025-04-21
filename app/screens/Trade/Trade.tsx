import React, {useState,useEffect} from 'react';
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
import OpenBot from './OpenBot';
import TradeHistory from './TradeHistory';
import {Feather}  from '@expo/vector-icons';
import Api from "../../../services/Api";
import { useTranslation } from 'react-i18next';
type TradeScreenProps = CompositeScreenProps<
    StackScreenProps<BottomTabParamList, 'Trade'>,
    StackScreenProps<RootStackParamList>
>;

const TradeScreen = ({navigation} : TradeScreenProps) => {
     const { t } = useTranslation(); 
    const {colors} : {colors : any} = useTheme();
     const [modalShow , setModal] = useState<boolean>(false);
    const [activeTab , setActiveTab] = useState<string>('buy');
    const [activeTab2 , setActive2Tab] = useState<string>('Limit');
    const [activeSpot, setActiveSpot] =useState('spot');
    const [isPaused, setIsPaused] = useState(false);
    const [totalAmounts, setTotalAmounts] = useState<{ [key: string]: string | number }>({});
    const [totalPnl, setTotalPnl] = useState<number>(0);
     const [totalPnlPercentage, setTotalPnlPercentage] = useState<number>(0);
    const [coinData , setCoinData] = useState<any>({
            image : IMAGES.bitcoin,
            name : 'Spot',
            tag : 'BTC',
            balance : '$8,456.87',
            amount : '0.154836',
            rate : '+4.2',
        });
        const fetchBalance = async (type) => {
            try {
              // Call the API with the query parameter 'type'
              const response = await Api.get('/getActiveTrades', {
                params: { type },
              });
              if (response.data.success) {
                // Update coinData with the fetched balance and update the name accordingly
                setTotalPnl(response.data.totalOverallPnl);
                setTotalPnlPercentage(response.data.totalOverallPnlPercentage);
                // setCoinData((prev) => ({
                //   ...prev,
                //   balance: response.data.balance,
                //   name: type.charAt(0).toUpperCase() + type.slice(1),
                // }));
              } else {
                Alert.alert('Error', response.data.error || 'Failed to fetch balance.');
              }
            } catch (error) {
              console.error('Error fetching balance:', error);
              Alert.alert('Error', 'An error occurred while fetching balance.');
              
            }
          };
        
          // On component mount, fetch the default "spot" balance.
          useEffect(() => {
            const intervalId = setInterval(() => {
              fetchBalance(activeSpot); // Use the current activeSpot state here.
            }, 1000);
          
            return () => clearInterval(intervalId);
          }, [activeSpot]);
          // Toggle between "spot" and "future" types
          const toggleSpot = async () => {
            const newType = activeSpot === 'spot' ? 'future' : 'spot';
            setActiveSpot(newType);
            await fetchBalance(newType);
          };
        
        
          const pausePlay = () => {
            Alert.alert(
              'Confirmation',
              `Are you sure you want to ${isPaused ? 'resume' : 'pause'}?`,
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Yes',
                  onPress: async () => {
                    const newPauseState = !isPaused;
                    setIsPaused(newPauseState);
                    try {
                      // Choose endpoint based on active coin type:
                      // For "spot", use /start-spot-cron or /stop-spot-cron.
                      // For "future", use /start-future-cron or /stop-future-cron.
                      let endpoint = '';
                      if (activeSpot === 'spot') {
                        endpoint = newPauseState ? '/stop-spot-cron' : '/start-spot-cron';
                      } else {
                        endpoint = newPauseState ? '/stop-future-cron' : '/start-future-cron';
                      }
                      const response = await Api.get(endpoint);
                      if (
                        response.data.status &&
                        (response.data.status.includes('started') ||
                          response.data.status.includes('stopped'))
                      ) {
                        console.log(response.data.status);
                      } else {
                        console.log(`Error: Failed to ${newPauseState ? 'stop' : 'start'} the cron job`);
                      }
                    } catch (error) {
                      console.error('API error:', error);
                    }
                  }
                }
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
                title={t('trade')}
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
                    ]}>{Number(totalPnl).toFixed(2)}</Text>
                    <Text style={[
                        FONTS.fontXs,{
                            color:totalPnlPercentage > 0 ? COLORS.success : COLORS.danger,
                        }
                    ]}>{Number(totalPnlPercentage).toFixed(2)}%</Text>
                </View>
                <Feather  size={22} color={colors.text} onPress={pausePlay}  name={isPaused ? 'play-circle' : 'pause-circle'}/>
            </TouchableOpacity>
            

        </View>
                  
                    <TabStyle1
                 tabMenu={[t('openOrders'), t('tradeHistory')]}
                setActiveTab={setActiveTab}
                activeTab={activeTab}
                colors={colors}
            />

            {activeTab === "Open Orders" ?
                // <OpenOrder type={activeSpot} colors={colors}/> 
                <OpenBot/> 
                :
            activeTab === "Trade History" ?
                <TradeHistory type={activeSpot} colors={colors}/>
                :
                // <OpenOrder type={activeSpot} colors={colors}/>
                <OpenBot/> 
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