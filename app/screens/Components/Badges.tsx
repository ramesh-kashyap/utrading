import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import Badge from '../../components/Badge/Badge';
import BadgeLight from '../../components/Badge/BadgeLight';
import BadgeOutline from '../../components/Badge/BadgeOutline';

const Badges = () => {

    const {colors} : {colors : any} = useTheme(); 

    return (
        <>
            <SafeAreaView style={{flex:1,backgroundColor:colors.card}}>
                <View
                    style={{
                        flex:1,
                        backgroundColor:colors.background,
                    }}
                >
                    <Header 
                        title={'Badges'}
                        leftIcon={'back'}
                    />
                    <ScrollView>
                        <View style={GlobalStyleSheet.container}>
                            <View style={[GlobalStyleSheet.card,{backgroundColor:colors.card}]}>
                                <View style={[GlobalStyleSheet.cardHeader,{borderBottomColor:colors.border}]}>
                                    <Text style={{...FONTS.h6,color:colors.title}}>Classic badge</Text>
                                </View>
                                <View style={GlobalStyleSheet.cardBody}>
                                    <View
                                        style={{
                                            flexDirection:'row',
                                            flexWrap:'wrap',
                                        }}
                                    >    
                                        <Badge
                                            title={'Primary'}
                                            style={{marginRight:4,marginBottom:4}}
                                        />
                                        <Badge
                                            color={COLORS.secondary}
                                            title={'Secondary'}
                                            style={{marginRight:4,marginBottom:4}}
                                        />
                                        <Badge
                                            color={COLORS.danger}
                                            title={'Danger'}
                                            style={{marginRight:4,marginBottom:4}}
                                        />
                                        <Badge
                                            color={COLORS.success}
                                            title={'Success'}
                                            style={{marginRight:4,marginBottom:4}}
                                        />
                                        <Badge
                                            color={COLORS.info}
                                            title={'Info'}
                                            style={{marginRight:4,marginBottom:4}}
                                        />
                                        <Badge
                                            color={COLORS.warning}
                                            title={'Warning'}
                                            style={{marginRight:4,marginBottom:4}}
                                        />
                                        <Badge
                                            color={COLORS.dark}
                                            title={'Dark'}
                                            style={{marginRight:4,marginBottom:4}}
                                        />
                                        <Badge
                                            color={COLORS.light}
                                            title={'Light'}
                                            style={{marginRight:4,marginBottom:4}}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={[GlobalStyleSheet.card,{backgroundColor:colors.card}]}>
                                <View style={[GlobalStyleSheet.cardHeader,{borderBottomColor:colors.border}]}>
                                    <Text style={{...FONTS.h6,color:colors.title}}>Light badge</Text>
                                </View>
                                <View style={GlobalStyleSheet.cardBody}>
                                    <View
                                        style={{
                                            flexDirection:'row',
                                            flexWrap:'wrap',
                                        }}
                                    >    
                                        <BadgeLight
                                            title={'Primary'}
                                            style={{marginRight:4,marginBottom:4}}
                                        />
                                        <BadgeLight
                                            color={COLORS.secondary}
                                            title={'Secondary'}
                                            style={{marginRight:4,marginBottom:4}}
                                        />
                                        <BadgeLight
                                            color={COLORS.danger}
                                            title={'Danger'}
                                            style={{marginRight:4,marginBottom:4}}
                                        />
                                        <BadgeLight
                                            color={COLORS.success}
                                            title={'Success'}
                                            style={{marginRight:4,marginBottom:4}}
                                        />
                                        <BadgeLight
                                            color={COLORS.info}
                                            title={'Info'}
                                            style={{marginRight:4,marginBottom:4}}
                                        />
                                        <BadgeLight
                                            color={COLORS.warning}
                                            title={'Warning'}
                                            style={{marginRight:4,marginBottom:4}}
                                        />
                                        <BadgeLight
                                            color={COLORS.dark}
                                            title={'Dark'}
                                            style={{marginRight:4,marginBottom:4}}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={[GlobalStyleSheet.card,{backgroundColor:colors.card}]}>
                                <View style={[GlobalStyleSheet.cardHeader,{borderBottomColor:colors.border}]}>
                                    <Text style={{...FONTS.h6,color:colors.title}}>Outline badge</Text>
                                </View>
                                <View style={GlobalStyleSheet.cardBody}>
                                    <View
                                        style={{
                                            flexDirection:'row',
                                            flexWrap:'wrap',
                                        }}
                                    >    
                                        <BadgeOutline
                                            title={'Primary'}
                                            style={{marginRight:4,marginBottom:4}}
                                        />
                                        <BadgeOutline
                                            color={COLORS.secondary}
                                            title={'Secondary'}
                                            style={{marginRight:4,marginBottom:4}}
                                        />
                                        <BadgeOutline
                                            color={COLORS.danger}
                                            title={'Danger'}
                                            style={{marginRight:4,marginBottom:4}}
                                        />
                                        <BadgeOutline
                                            color={COLORS.success}
                                            title={'Success'}
                                            style={{marginRight:4,marginBottom:4}}
                                        />
                                        <BadgeOutline
                                            color={COLORS.info}
                                            title={'Info'}
                                            style={{marginRight:4,marginBottom:4}}
                                        />
                                        <BadgeOutline
                                            color={COLORS.warning}
                                            title={'Warning'}
                                            style={{marginRight:4,marginBottom:4}}
                                        />
                                        <BadgeOutline
                                            color={COLORS.dark}
                                            title={'Dark'}
                                            style={{marginRight:4,marginBottom:4}}
                                        />
                                    </View>
                                </View>
                            </View>

                            <View style={[GlobalStyleSheet.card,{backgroundColor:colors.card}]}>
                                <View style={[GlobalStyleSheet.cardHeader,{borderBottomColor:colors.border}]}>
                                    <Text style={{...FONTS.h6,color:colors.title}}>Rounded badge</Text>
                                </View>
                                <View style={GlobalStyleSheet.cardBody}>
                                    <View
                                        style={{
                                            flexDirection:'row',
                                            flexWrap:'wrap',
                                        }}
                                    >    
                                        <Badge
                                            title={'Primary'}
                                            rounded
                                            style={{marginRight:4,marginBottom:4}}
                                        />
                                        <Badge
                                            color={COLORS.secondary}
                                            rounded
                                            title={'Secondary'}
                                            style={{marginRight:4,marginBottom:4}}
                                        />
                                        <Badge
                                            color={COLORS.danger}
                                            rounded
                                            title={'Danger'}
                                            style={{marginRight:4,marginBottom:4}}
                                        />
                                        <Badge
                                            color={COLORS.success}
                                            rounded
                                            title={'Success'}
                                            style={{marginRight:4,marginBottom:4}}
                                        />
                                        <Badge
                                            color={COLORS.info}
                                            rounded
                                            title={'Info'}
                                            style={{marginRight:4,marginBottom:4}}
                                        />
                                        <Badge
                                            color={COLORS.warning}
                                            rounded
                                            title={'Warning'}
                                            style={{marginRight:4,marginBottom:4}}
                                        />
                                        <Badge
                                            color={COLORS.dark}
                                            rounded
                                            title={'Dark'}
                                            style={{marginRight:4,marginBottom:4}}
                                        />
                                        <Badge
                                            color={COLORS.light}
                                            rounded
                                            title={'Light'}
                                            style={{marginRight:4,marginBottom:4}}
                                        />
                                    </View>
                                </View>
                            </View>

                            <View style={[GlobalStyleSheet.card,{backgroundColor:colors.card}]}>
                                <View style={[GlobalStyleSheet.cardHeader,{borderBottomColor:colors.border}]}>
                                    <Text style={{...FONTS.h6,color:colors.title}}>Size badge</Text>
                                </View>
                                <View style={GlobalStyleSheet.cardBody}>
                                    <View
                                        style={{
                                            flexDirection:'row',
                                            flexWrap:'wrap',
                                            alignItems:'center',
                                        }}
                                    >    
                                        <Badge
                                            title={'Small'}
                                            style={{marginRight:4,marginBottom:4}}
                                        />
                                        <Badge
                                            title={'Medium'}
                                            size={'md'}
                                            style={{marginRight:4,marginBottom:4}}
                                            />
                                        <Badge
                                            title={'Large'}
                                            size={'lg'}
                                            style={{marginRight:4,marginBottom:4}}
                                        />
                                    </View>
                                </View>
                            </View>

                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </>
    );
};


export default Badges;