import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Linking } from 'react-native';
import { CompositeScreenProps, useTheme } from '@react-navigation/native';
import { StackScreenProps } from "@react-navigation/stack";
import { Feather }  from '@expo/vector-icons';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { BottomTabParamList } from '../../navigation/BottomTabParamList';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { IMAGES } from '../../constants/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next'; // Import the hook

const menuData = [
    {
        icon : IMAGES.verification,
        title : "kycVerification",
        navigate : 'Verification',
    },
    {
        icon : IMAGES.history,
        title : "PhoenixCard",
        navigate : 'PhoenixCard',
    },
    {
        icon : IMAGES.history,
        title : "AlgoOverview",
        navigate : 'AlgoOverview',
    },
    {
        icon : IMAGES.settings,
        title : "settings",
        navigate : 'Settings',
    },
    {
        icon : IMAGES.settings,
        title : "apiBind",
        navigate : 'Apibind',
    },
    {
        icon : IMAGES.support,
        title : "support",
    },
    {
        icon : IMAGES.history,
        title : "history",
        navigate : 'history',
    },
    {
        icon : IMAGES.language,
        title : "language",
        type : 'language',
    },
    {
        icon : IMAGES.logout,
        title : "logout",
    },
];

const languageData = [
    { id: "en", title: 'English' },
    { id: "hi", title: 'Hindi' },
    { id: "ur", title: 'Urdu' },
    { id: "ar", title: 'Arabic' },
    { id: "zh", title: 'Chinese' },
    { id: "ja", title: 'Japanese' },
    { id: "it", title: 'Italian' },
    { id: "ru", title: 'Russian' },
];

type ProfileScreenProps = CompositeScreenProps<
    StackScreenProps<BottomTabParamList, 'Profile'>,
    StackScreenProps<RootStackParamList>
>;

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
    const { colors } = useTheme();
    const { t, i18n } = useTranslation(); // Access translation functions
    const [language, setLanguage] = useState('English');
    const bottomSheetRef = useRef<any>(null);
    const snapPoints = useMemo(() => ['60%'], []);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('authToken');
            navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'Login' }],
                })
            );
        } catch (error) {
            console.error('Error removing token from AsyncStorage:', error);
        }
    };

    const handleSupportPress = () => {
        const url = "https://t.me/nodetraders";
        Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
    };

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const renderBackdrop = useCallback(
        (props: any) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
          />
        ),
        []
    );

    // Function to change language
    const handleLanguageChange = (langId: string, title: string) => {
        setLanguage(title);
        i18n.changeLanguage(langId);
        bottomSheetRef.current?.close();
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <ScrollView>
                <View style={{ position: 'absolute', zIndex: 1, left: 0, right: 0 }}>
                    <Header
                        title={t('profile')}
                        leftIcon='back'
                        leftAction={() => navigation.navigate('Home')}
                    />
                </View>
                <LinearGradient
                    start={{ x: 1, y: 0.5 }} end={{ x: 0.5, y: 1.0 }}
                    locations={[0, 1]}
                    colors={["#273121", "#161717"]}
                    style={[GlobalStyleSheet.container, {
                        padding: 0,
                        borderBottomLeftRadius: 25,
                        borderBottomRightRadius: 25,
                        marginBottom: 10,
                        paddingHorizontal: 15,
                        paddingVertical: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingTop: 65,
                    }]}
                >
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 6,
                        borderRadius: 65,
                        borderColor: 'rgba(255,255,255,.1)',
                        marginRight: 12,
                    }}>
                        <Image
                            source={IMAGES.profilePic}
                            style={{
                                height: 65,
                                width: 65,
                                borderRadius: 65,
                            }}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={[FONTS.h5, FONTS.fontSemiBold, { color: COLORS.darkTitle, marginBottom: 10 }]}>Sachin Xarma</Text>
                        <Text style={[FONTS.fontXs, { color: COLORS.darkText }]}>yatin@example.com</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('EditProfile')}
                        style={{
                            height: 45,
                            width: 45,
                            borderRadius: 45,
                            backgroundColor: COLORS.darkBorder,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Image
                            source={IMAGES.edit}
                            style={{
                                height: 20,
                                width: 20,
                                resizeMode: 'contain',
                                tintColor: COLORS.white,
                            }}
                        />
                    </TouchableOpacity>
                </LinearGradient>

                <View style={GlobalStyleSheet.container}>
                    {menuData.map((data: any, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                if (data.type === "language") {
                                    bottomSheetRef.current?.snapToIndex(0);
                                } else if (data.title === ("logout")) {
                                    handleLogout();
                                } else if (data.title === "Support") {
                                    handleSupportPress();
                                } else {
                                    data.navigate && navigation.navigate(data.navigate);
                                }
                            }}
                            style={{
                                marginBottom: 8,
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingVertical: 5,
                            }}
                        >
                            <View
                                style={{
                                    height: 40,
                                    width: 40,
                                    borderRadius: SIZES.radius,
                                    borderWidth: 1,
                                    borderColor: colors.border,
                                    backgroundColor: colors.input,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: 15,
                                }}
                            >
                                <Image
                                    source={data.icon}
                                    style={{
                                        height: 18,
                                        width: 18,
                                        tintColor: colors.title,
                                    }}
                                />
                            </View>
                            <Text style={[FONTS.h6, FONTS.fontSemiBold, { color: colors.title, lineHeight: 18, flex: 1 }]}>
                                {t(data.title)}
                            </Text>
                            {data.type === "language" ? (
                                <Text style={[GlobalStyleSheet.linkBtn, { marginRight: 5 }]}>{t('language')}</Text>
                            ) : (
                                <Feather name='chevron-right' size={20} color={colors.text} />
                            )}
                        </TouchableOpacity>
                    ))}
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
                    backgroundColor: colors.cardBg,
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                }}
                handleIndicatorStyle={{
                    backgroundColor: colors.border,
                    width: 100,
                    height: 6,
                }}
            >
                <BottomSheetScrollView
                    contentContainerStyle={[GlobalStyleSheet.container, {
                        padding: 0,
                        paddingBottom: 20,
                    }]}
                >
                    {languageData.map((data, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleLanguageChange(data.id, data.title)}
                            style={[
                                GlobalStyleSheet.listItem,
                                { backgroundColor: colors.input, borderColor: colors.border },
                                language === data.title && { backgroundColor: COLORS.primary }
                            ]}
                        >
                            <Text
                                style={[
                                    GlobalStyleSheet.listItemTxt,
                                    { color: colors.title },
                                    language === data.title && { ...FONTS.fontSemiBold, color: COLORS.title }
                                ]}
                            >
                                {data.title}
                            </Text>
                            <View
                                style={[
                                    GlobalStyleSheet.listIndicator,
                                    { borderColor: colors.border },
                                    language === data.title && { borderColor: COLORS.title, opacity: 0.8 }
                                ]}
                            >
                                {language === data.title && (
                                    <View
                                        style={{
                                            height: 10,
                                            width: 10,
                                            borderRadius: 10,
                                            backgroundColor: COLORS.title,
                                        }}
                                    />
                                )}
                            </View>
                        </TouchableOpacity>
                    ))}
                </BottomSheetScrollView>
            </BottomSheet>
        </SafeAreaView>
    );
};

export default ProfileScreen;
