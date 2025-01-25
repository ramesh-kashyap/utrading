import React, { useState } from 'react';
import { SafeAreaView, View, ScrollView, Text, Image } from 'react-native';
import { CompositeScreenProps, useTheme } from '@react-navigation/native';
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { BottomTabParamList } from '../../navigation/BottomTabParamList';
import HomeHeader from './HomeHeader';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Cards from './Cards';
import { COLORS, FONTS } from '../../constants/theme';
import InfoCard from './InfoCard';
import TabStyle1 from '../../components/Tabs/TabStyle1';
import TopGainers from './TopGainers';
import TopLosers from './TopLosers';
import { IMAGES } from '../../constants/Images';

type HomeScreenProps = CompositeScreenProps<
    StackScreenProps<BottomTabParamList, 'Home'>,
    StackScreenProps<RootStackParamList>
>;


const HomeScreen = ({navigation} : HomeScreenProps) => {

    const {colors} : {colors : any} = useTheme();

    const [activeTab , setActiveTab] = useState<any>('Top Gainers');

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
            
            <ScrollView
                contentContainerStyle={{paddingBottom:30}}
            >
                <View style={GlobalStyleSheet.container}>
                    <View style={{marginBottom:20}}>
                        <HomeHeader navigation={navigation} colors={colors} />
                    </View>
                    <View
                        style={{
                            flexDirection:'row',
                            alignItems:'flex-end',
                        }}
                    >
                        <View style={{flex:1}}>
                            <Text style={[FONTS.font,{color:colors.text,marginBottom:10}]}>Total Balance</Text>
                            <Text style={[FONTS.h1,FONTS.fontBaseSemiBold,{color:colors.title,lineHeight:40}]}>$25,150.20</Text>
                        </View>
                        <View
                            style={{
                                paddingHorizontal:10,
                                marginBottom:5,
                                paddingVertical:2,
                                borderRadius:20,
                                backgroundColor:'rgba(115,255,152,.15)',
                            }}
                        >
                            <Text style={[FONTS.fontSm,{color:COLORS.success}]}>+3.50%</Text>
                        </View>
                    </View>

                    <Cards/>
                    
                    <InfoCard colors={colors}/>
                    
                    <Text style={[FONTS.font,FONTS.fontSemiBold,{color:colors.title,marginBottom:12}]}>24h Markets</Text>

                    <TabStyle1
                        tabMenu={['Top Gainers','Top Losers']}
                        setActiveTab={setActiveTab}
                        activeTab={activeTab}
                        colors={colors}
                    />

                    {activeTab === 'Top Gainers' ?
                        <TopGainers/>
                        :
                    activeTab === 'Top Losers' ?
                        <TopLosers/>
                        :
                        <></>  
                    }

                </View>
            </ScrollView>
            
        </SafeAreaView>
    )
}
export default HomeScreen;