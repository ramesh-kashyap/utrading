import React, { useCallback, useRef, useState ,useEffect} from 'react';
import { View, Text, SafeAreaView, ScrollView, Platform, Alert } from 'react-native';
import { CompositeScreenProps, useTheme } from '@react-navigation/native';
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { BottomTabParamList } from '../../navigation/BottomTabParamList';
import WalletBalance from './WalletBalance';
import { IMAGES } from '../../constants/Images';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import WalletList from '../../components/List/WalletList';
import { COLORS, FONTS } from '../../constants/theme';
import WalletCard from './WalletCard';
import BottomSheet ,{ BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import WithdrawSheet from '../../components/BottomSheet/WithdrawSheet';
import TransferSheet from '../../components/BottomSheet/TransferSheet';
import DepositSheet from '../../components/BottomSheet/DepositSheet';
import { Checkbox } from 'react-native-paper';
import Api from "../../../services/Api";
const walletData = [
    {
        image : IMAGES.bitcoin,
        name : 'Bitcoin',
        tag : 'BTC',
        balance : '$8,456.87',
        amount : '0.154836',
        rate : '+4.2',
    },
    {
        image : IMAGES.ethereum,
        name : 'Ethereum',
        tag : 'BTC',
        balance : '$8,456.87',
        amount : '0.154836',
        rate : '+1.5',
    },
    {
        image : IMAGES.ripple,
        name : 'Ripple',
        tag : 'BTC',
        balance : '$8,456.87',
        amount : '0.154836',
        rate : '+4.1',
    },
    {
        image : IMAGES.bitcoin,
        name : 'Bitcoin',
        tag : 'BTC',
        balance : '$8,456.87',
        amount : '0.154836',
        rate : '+4.2',
    },
    {
        image : IMAGES.ethereum,
        name : 'Ethereum',
        tag : 'BTC',
        balance : '$8,456.87',
        amount : '0.154836',
        rate : '+1.5',
    },
    {
        image : IMAGES.ripple,
        name : 'Ripple',
        tag : 'BTC',
        balance : '$8,456.87',
        amount : '0.154836',
        rate : '+4.1',
    },
]

type WalletScreenProps = CompositeScreenProps<
    StackScreenProps<BottomTabParamList, 'Wallet'>,
    StackScreenProps<RootStackParamList>
>;

const WalletScreen = ({navigation} : WalletScreenProps) => {

    const theme = useTheme();
    const {colors} : {colors : any} = theme;
    const [toggleCheckBox , setToggleCheckBox] = useState<boolean>(false);
    const [sbalance, setSbalance] = useState<number>(0);
    const [fbalance, setFbalance] = useState<number>(0);
    const [cardText, setCardtext] = useState<string>('');
    const [sheetType , setSheetType] = useState<string>('');

    const bottomSheetRef = useRef<any>(null);
    const snapPoints = [sheetType === 'deposit' ? 360 : sheetType === 'withdraw' ? 500 : sheetType === 'transfer' ? 580 : 300];
    //const snapPoints = useMemo(() => ['60%'], []);

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const renderBackdrop = useCallback(
        (props:any) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
          />
        ),
        []
    );

    const fetchSpotBalance = async () => {
        try {
          const response = await Api.get(`/account-info`);
          if (response.data.success) {
            setSbalance(response.data.usdtBalance.free); // Assuming response contains spot balance
          } else {
            console.log('Error: Spot Balance not fetched');
          }
        } catch (error) {
          console.error('Error fetching spot balance:', error);
        }
      };
    
      // Fetch Future Balance
      const fetchFutureBalance = async () => {
        try {
          const response = await Api.get(`/future-account-info`);
          console.log(response.data.tradingData.balance);
          if (response.data.success) {
            setFbalance(response.data.tradingData.balance); // Assuming response contains future balance
          } else {
            console.log('Error: Future Balance not fetched');
          }
        } catch (error) {
          console.error('Error fetching future balance:', error);
        }
      };
    
      // useEffect to trigger both functions when component mounts
      useEffect(() => {
        fetchSpotBalance(); // Fetch Spot Balance
        fetchFutureBalance(); // Fetch Future Balance
      }, []);

    return (
        <SafeAreaView
            style={{
                flex:1,
                backgroundColor:colors.background,
            }}
        >
            <ScrollView
                contentContainerStyle={[GlobalStyleSheet.container,{
                    padding:0,
                    paddingBottom:30
                }]}
            >
                <WalletBalance
                    navigation={navigation}
                    bottomSheetRef={bottomSheetRef}
                    setSheetType={setSheetType}
                    sbalance={parseFloat(sbalance) || 0} 
                    fbalance={parseFloat(fbalance) || 0}
                />
                <View style={GlobalStyleSheet.container}>

                    <View
                        style={GlobalStyleSheet.row}
                    >   
                        <View style={GlobalStyleSheet.col50}>
                            <WalletCard
                                color={theme.dark ? '#62F5E4' : '#0EB6A2'}
                               
                                balance={parseFloat(sbalance)} cardText={'Spot Trade'}
                            />
                        </View>
                        <View style={GlobalStyleSheet.col50}>
                            <WalletCard
                                color={theme.dark ? '#E1E445' : '#BDC009'}
                               balance={parseFloat(fbalance) || 0} cardText={'Future Trade'}
                               />
                           
                        </View>
                    </View>

                    <View
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            borderBottomWidth:1,
                            borderBottomColor:colors.border,
                            paddingBottom:8,
                            marginBottom:5,
                            marginTop:18,
                        }}
                    >
                        <Text style={[FONTS.fontLg,FONTS.fontSemiBold,{color:colors.title,flex:1}]}>Conversion</Text>
                        <View
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                            }}
                        >
                            <View
                                style={[Platform.OS === 'ios' && {
                                    transform:[{
                                        scale:.8
                                    }],
                                    marginRight:5,
                                }]}
                            >
                                <Checkbox
                                    status={toggleCheckBox ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setToggleCheckBox(!toggleCheckBox);
                                    }}
                                    color={COLORS.primary}
                                />
                            </View>
                            <Text style={[FONTS.fontSm,{color:colors.text,lineHeight:18}]} onPress={() => navigation.navigate('Apibind')}>Hide 0 Balance</Text>
                        </View>
                    </View>
                    <View>
                        {walletData.map((data , index) => {
                            return(
                                <WalletList
                                    image={data.image}
                                    name={data.name}
                                    tag={data.tag}
                                    balance={data.balance}
                                    amount={data.amount}
                                    rate={data.rate}
                                    key={index}
                                />
                            )
                        })}
                    </View>
                </View>
            </ScrollView>

            <BottomSheet
                enablePanDownToClose={true}
                ref={bottomSheetRef}
                backdropComponent={renderBackdrop}
                index={-1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                backgroundStyle={{
                    backgroundColor:colors.cardBg,
                    borderTopLeftRadius:25,
                    borderTopRightRadius:25,
                }}
                handleIndicatorStyle={{
                    backgroundColor:colors.border,
                    width:100,
                    height:6,
                }}
            >
                <BottomSheetScrollView>
                    {sheetType === 'deposit' ?
                        <DepositSheet/>
                        :
                    sheetType === 'withdraw' ?
                        <WithdrawSheet/>
                        :
                    sheetType === 'transfer' ?
                        <TransferSheet/>
                        :
                        <></>
                    }
                </BottomSheetScrollView>
            </BottomSheet>
        </SafeAreaView>
    )
}
export default WalletScreen;