import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { CompositeScreenProps, useTheme } from '@react-navigation/native';
import { StackScreenProps } from "@react-navigation/stack";
import {Feather}  from '@expo/vector-icons';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { BottomTabParamList } from '../../navigation/BottomTabParamList';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { IMAGES } from '../../constants/Images';

const menuData = [
    {
        icon : IMAGES.verification,
        title : "Kyc Verification",
        navigate : 'Verification',
    },
    {
        icon : IMAGES.settings,
        title : "Settings",
        navigate : 'Settings',
    },
    {
        icon : IMAGES.support,
        title : "Support",
        navigate : 'Support',
    },
    {
        icon : IMAGES.history,
        title : "History",
        navigate : 'History',
    },
    {
        icon : IMAGES.language,
        title : "Language",
        type : 'language',
    },
    {
        icon : IMAGES.logout,
        title : "Log out",
        navigate : 'Login',
    },
]

const languageData = [
    {
        id : "1",
        title : 'Hindi'
    },
    {
        id : "2",
        title : 'English'
    },
    {
        id : "3",
        title : 'Urdu'
    },
    {
        id : "4",
        title : 'Arabic'
    },
    {
        id : "5",
        title : 'Chinese'
    },
    {
        id : "6",
        title : 'Japanese'
    },
    {
        id : "7",
        title : 'Italic'
    },
    {
        id : "8",
        title : 'Russian'
    },
]

type ProfileScreenProps = CompositeScreenProps<
        StackScreenProps<BottomTabParamList, 'Profile'>,
        StackScreenProps<RootStackParamList>
    >;

const ProfileScreen = ({navigation} : ProfileScreenProps) => {
    
    const {colors} : {colors : any} = useTheme();

    const [language , setLanguage] = useState<any>('English');

    const bottomSheetRef = useRef<any>(null);
    const snapPoints = useMemo(() => ['60%'], []);

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

    return (
        <SafeAreaView
            style={{
                flex:1,
                backgroundColor:colors.background,
            }}
        >

            <ScrollView>
                <View
                    style={{
                        position:'absolute',
                        zIndex:1,
                        left:0,
                        right:0,
                    }}
                >
                    <Header
                        title='Profile'
                        leftIcon='back'
                        leftAction={() => navigation.navigate('Home')}
                    />
                </View>
                <LinearGradient
                    start={{x: 1, y: 0.5}} end={{x: 0.5, y: 1.0}}
                    locations={[0,1]}
                    colors={["#273121","#161717"]}
                    style={[GlobalStyleSheet.container,{
                        padding:0,
                        borderBottomLeftRadius:25,
                        borderBottomRightRadius:25,
                        marginBottom:10,
                        paddingHorizontal:15,
                        paddingVertical:20,
                        flexDirection:'row',
                        alignItems:'center',
                        paddingTop:65,
                    }]}
                >
                    <View
                        style={{
                            alignItems:'center',
                            justifyContent:'center',
                            borderWidth:6,
                            borderRadius:65,
                            borderColor:'rgba(255,255,255,.1)',
                            marginRight:12,
                        }}
                    >
                        <Image
                            source={IMAGES.profilePic}
                            style={{
                                height:65,
                                width:65,
                                borderRadius:65,
                            }}
                        />
                    </View>   
                    <View style={{flex:1}}>
                        <Text style={[FONTS.h5,FONTS.fontSemiBold,{color:COLORS.darkTitle,marginBottom:10}]}>Yatin Xarma</Text>
                        <Text style={[FONTS.fontXs,{color:COLORS.darkText}]}>yatin@example.com</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('EditProfile')}
                        style={{
                            height:45,
                            width:45,
                            borderRadius:45,
                            backgroundColor:COLORS.darkBorder,
                            alignItems:'center',
                            justifyContent:'center',
                        }}
                    >
                        <Image
                            source={IMAGES.edit}
                            style={{
                                height:20,
                                width:20,
                                resizeMode:'contain',
                                tintColor:COLORS.white,
                            }}
                        />
                    </TouchableOpacity>
                </LinearGradient>

                <View
                    style={GlobalStyleSheet.container}
                >
                    {menuData.map((data:any,index) => {
                        return(
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    data.type === "language"
                                        ?
                                        bottomSheetRef.current.snapToIndex(0)
                                        :
                                        data.navigate && navigation.navigate(data.navigate)
                                }}
                                style={{
                                    marginBottom:8,
                                    flexDirection:'row',
                                    alignItems:'center',
                                    paddingVertical:5,
                                }}
                            >
                                <View
                                    style={{
                                        height:40,
                                        width:40,
                                        borderRadius:SIZES.radius,
                                        borderWidth:1,
                                        borderColor:colors.border,
                                        backgroundColor:colors.input,
                                        alignItems:'center',
                                        justifyContent:'center',
                                        marginRight:15,
                                    }}
                                >
                                    <Image
                                        source={data.icon}
                                        style={{
                                            height:18,
                                            width:18,
                                            tintColor:colors.title,
                                        }}
                                    />
                                </View>
                                <Text style={[FONTS.h6,FONTS.fontSemiBold,{color:colors.title,lineHeight:18,flex:1}]}>{data.title}</Text>
                                {data.type === "language" ?
                                    <Text style={[GlobalStyleSheet.linkBtn,{marginRight:5}]}>{language}</Text>
                                    : 
                                    <Feather 
                                        name='chevron-right'
                                        size={20}
                                        color={colors.text}
                                    />
                                }
                            </TouchableOpacity>
                        )
                    })}
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
                <BottomSheetScrollView
                    contentContainerStyle={[GlobalStyleSheet.container,{
                        padding:0,
                        paddingBottom:20,
                    }]}
                >
                    {languageData.map((data,index) => {
                        return(
                            <TouchableOpacity
                                key={index}
                                onPress={() => {setLanguage(data.title);bottomSheetRef.current.close()}}
                                style={[GlobalStyleSheet.listItem,{
                                    backgroundColor:colors.input,
                                    borderColor:colors.border,
                                },language === data.title && {
                                    backgroundColor:COLORS.primary,
                                }]}
                            >
                                <Text style={
                                    [GlobalStyleSheet.listItemTxt,
                                    {
                                        color:colors.title,
                                    },
                                    data.title === language && {
                                        ...FONTS.fontSemiBold,
                                        color: COLORS.title,
                                    }
                                ]}>{data.title}</Text>
                                <View
                                    style={[GlobalStyleSheet.listIndicator,{
                                        borderColor:colors.border,
                                    },language === data.title && {
                                        borderColor:COLORS.title,
                                        opacity : .8,
                                    }]}
                                >
                                    {language === data.title &&
                                        <View
                                            style={{
                                                height:10,
                                                width:10,
                                                borderRadius:10,
                                                backgroundColor:COLORS.title,
                                            }}
                                        />
                                    }
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </BottomSheetScrollView>
            </BottomSheet>

        </SafeAreaView>
    )
}
export default ProfileScreen;