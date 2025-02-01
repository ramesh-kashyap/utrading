import React from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Image, Button, Alert, Share} from 'react-native';
import { CompositeScreenProps, useTheme } from '@react-navigation/native';
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { BottomTabParamList } from '../../navigation/BottomTabParamList';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import Header from '../../layout/Header';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import { IMAGES } from '../../constants/Images';
import Input from '../../components/Input/Input';
import * as Linking from 'expo-linking'

const socialLink = [
    {
        icon : IMAGES.facebook,
    },
    // {
    //     icon : IMAGES.whatsapp,
    // },
    // {
    //     icon : IMAGES.instagram,
    // },
    // {
    //     icon : IMAGES.twitter,
    // },
]

const tableData = [
    {
        num:'#1',
        split:'8%',
        referrals:'3',
        amount:'(0.01 BTC)',
    },
    {
        num:'#2',
        split:'6%',
        referrals:'13',
        amount:'(0.03 BTC)',
    },
    {
        num:'#3',
        split:'3%',
        referrals:'25',
        amount:'(0.02 BTC)',
    },
    {
        num:'#4',
        split:'2%',
        referrals:'37',
        amount:'(0.05 BTC)',
    },
    {
        num:'#5',
        split:'1%',
        referrals:'59',
        amount:'(0.04 BTC)',
    },
]

const shareAndOpen = async () => {
    const sharedLink = 'https://example.com'; // Replace with your actual link

    try {
        const result = await Share.share({
            message: `Check this out! ${sharedLink}`,
            url: sharedLink, // URL to share
        });

        // If the user successfully shares, open the link
        if (result.action === Share.sharedAction) {
            setTimeout(() => {
                Linking.openURL(sharedLink).catch((err) =>
                    Alert.alert('Error', 'Could not open the link')
                );
            }, 2000); // Small delay to ensure sharing completes
        }
    } catch (error) {
        console.log('Error sharing:', error);
    }
};


type ReferralScreenProps = CompositeScreenProps<
    StackScreenProps<BottomTabParamList, 'Referral'>,
    StackScreenProps<RootStackParamList>
>;

const ReferralScreen = ({navigation} : ReferralScreenProps) => {

    const {colors} : {colors : any} = useTheme();

    return (
        <SafeAreaView>
            <Header
                title='Referral'
                leftIcon='back'
                leftAction={() => navigation.navigate('Home')}
            />
            <ScrollView
                contentContainerStyle={{
                    paddingBottom:50,
                }}
            >
                <View style={GlobalStyleSheet.container}>
                    <View
                        style={[{
                            borderRadius:SIZES.radius,
                            backgroundColor:colors.card,
                            paddingHorizontal:18,
                            paddingVertical:25,
                            marginBottom:20
                        }]}
                    >
                        <Text style={{...FONTS.font,...FONTS.fontMedium,color:colors.title,marginBottom:18}}>Share your referral link and earn crypto when others trade</Text>
                        <View style={GlobalStyleSheet.inputGroup}>
                            <Text style={{...FONTS.fontXs,color:COLORS.primaryText,marginBottom:6}}>Referral ID</Text>
                            <View>
                                <Input
                                    defaultValue='AZ19ZGSH'
                                />
                                <TouchableOpacity
                                    style={{
                                        position:'absolute',
                                        height:48,
                                        width:48,
                                        alignItems:'center',
                                        justifyContent:'center',
                                        right:0,
                                    }}
                                >
                                    <Image
                                        style={{
                                            height:20,
                                            width:20,
                                            tintColor:COLORS.primaryText,
                                        }}
                                        source={IMAGES.copy}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={GlobalStyleSheet.inputGroup}>
                            <Text style={{...FONTS.fontXs,color:COLORS.primaryText,marginBottom:6}}>Referral Link</Text>
                            <View>
                                <Input
                                    defaultValue='0xbc6b1972ea764159a4cf1c03774'
                                />
                                <TouchableOpacity
                                    style={{
                                        position:'absolute',
                                        height:48,
                                        width:48,
                                        alignItems:'center',
                                        justifyContent:'center',
                                        right:0,
                                    }}
                                >
                                    <Image
                                        style={{
                                            height:20,
                                            width:20,
                                            tintColor:COLORS.primaryText,
                                        }}
                                        source={IMAGES.copy}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        <View style={{flexDirection:'row',justifyContent:'center'}}>
                            {socialLink.map((data,index) => {
                                return(
                                    <TouchableOpacity key={index}
                                        style={[{
                                            // ...styles.socialIcon,
                                            // backgroundColor:"rgba(255,255,255,.1)"
                                        }]}
                                        >
                                        {/* <Image  
                                            style={{
                                                height:20,
                                                width:20,
                                                resizeMode:'contain',
                                            }}
                                            source={data.icon}
                                        /> */}
                                        <Button title="Share & Open Link" onPress={shareAndOpen} />
                                    </TouchableOpacity>
                                )
                            })}
                        </View>

                    </View>
                    
                    <View style={{...GlobalStyleSheet.row,marginBottom:35}}>
                        <View style={{...GlobalStyleSheet.col50}}>
                            <View
                                style={{
                                    borderRadius:SIZES.radius,
                                    padding:20,
                                    backgroundColor:colors.card,
                                }}
                            >   
                                <View
                                    style={{
                                        height:40,
                                        width:40,
                                        borderRadius:SIZES.radius,
                                        backgroundColor:COLORS.primary,
                                        alignItems:'center',
                                        justifyContent:'center',
                                        marginBottom:10
                                    }}
                                >
                                    <Image
                                        style={{
                                            height:20,
                                            width:20,
                                            resizeMode:'contain',
                                            tintColor:COLORS.title,
                                        }}
                                        source={IMAGES.referral}
                                    />
                                </View>
                                <Text style={{...FONTS.font,color:colors.title}}>Your Community</Text>
                                <Text style={{...FONTS.h2,color:COLORS.primary,lineHeight:37,marginBottom:4}}>99</Text>
                                <Text style={{...FONTS.fontSm,color:colors.text}}>Referrals</Text>
                            </View>
                        </View>
                        <View style={{...GlobalStyleSheet.col50}}>
                            <View
                                style={{
                                    borderRadius:SIZES.radius,
                                    padding:20,
                                    position:'relative',
                                    backgroundColor:colors.card,
                                }}
                            >   
                            
                                <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:10}}>
                                    <View
                                        style={{
                                            height:40,
                                            width:40,
                                            borderRadius:SIZES.radius,
                                            backgroundColor:COLORS.primary,
                                            alignItems:'center',
                                            justifyContent:'center'
                                        }}
                                    >
                                        <Image
                                            style={{
                                                height:22,
                                                width:22,
                                                resizeMode:'contain',
                                                tintColor:COLORS.title,
                                            }}
                                            source={IMAGES.dollor}
                                        />
                                    </View>
                                </View>
                                <Text style={{...FONTS.font,color:colors.title}}>Lifetime Reward</Text>
                                <View
                                    style={{
                                        flexDirection:'row',
                                        alignItems:'center',
                                    }}
                                >
                                    <Text style={{...FONTS.h5,...FONTS.fontMedium,lineHeight:37,color:colors.title}}>75.33</Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection:'row',
                                        alignItems:'center',
                                    }}
                                >
                                    <Image
                                        style={{
                                            height:16,
                                            width:16,
                                            borderRadius:16,
                                            resizeMode:'contain',
                                            marginRight:5,
                                            tintColor:colors.title,
                                        }}
                                        source={IMAGES.bitcoin}
                                    />
                                    <Text style={{...FONTS.fontSm,color:colors.text}}>0.015 BTC</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    
                    <View style={{marginBottom:20}}>
                        <View style={{alignItems:'center',marginHorizontal:6,marginBottom:20}}>
                            <Text style={{...FONTS.h6,...FONTS.fontMedium,color:colors.title,textAlign:'center',marginBottom:8}}>Track your income with our unique five-tier referral system</Text>
                            <Text style={{...FONTS.fontXs,lineHeight:18,color:colors.text,textAlign:'center'}}>Crypto Money shares 20% of its trading fee profits from your direct and indirect referrals.</Text>
                        </View>
                        <View   
                            style={[{
                                backgroundColor:colors.card,
                                borderRadius:SIZES.radius,
                                flexDirection:'row',
                                paddingVertical:10,
                            }]}
                        >
                            <Text style={{...FONTS.fontSm,color:colors.title,flexGrow:150,paddingHorizontal:10}}>#</Text>
                            <Text style={{...FONTS.fontSm,color:colors.title,flexGrow:100,paddingHorizontal:10}}>Reward Split</Text>
                            <Text style={{...FONTS.fontSm,color:colors.title,flexGrow:100,paddingHorizontal:10}}>Referrals</Text>
                            <Text style={{...FONTS.fontSm,color:colors.title,flexGrow:100,paddingHorizontal:10,textAlign:'right'}}>Amount Earned</Text>
                        </View>
                        {tableData.map((data,index) => {
                            return(
                                <View key={index}
                                    style={{
                                        flexDirection:'row',
                                        paddingVertical:8,
                                    }}
                                >
                                    <Text style={{...FONTS.font,color:colors.text,flexGrow:100,paddingHorizontal:10}}>{data.num}</Text>
                                    <Text style={{...FONTS.font,color:colors.text,flexGrow:150,paddingHorizontal:10}}>{data.split}</Text>
                                    <Text style={{...FONTS.font,color:colors.text,flexGrow:100,paddingHorizontal:10}}>{data.referrals}</Text>
                                    <Text style={{...FONTS.font,color:colors.text,flexGrow:100,paddingHorizontal:10,textAlign:'right'}}>{data.amount}</Text>
                                </View>
                            )
                        })}
                    </View>
                    

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    socialIcon:{
        height:35,
        width:35,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:8,
        marginHorizontal:4,
    }
});

export default ReferralScreen;