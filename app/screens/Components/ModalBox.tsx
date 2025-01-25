import React, { useState } from 'react';
import { Modal, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { useTheme } from '@react-navigation/native';
import Feather  from "react-native-vector-icons/Feather";
import LoginModal from '../../components/Modal/LoginModal';
import OptionModal from '../../components/Modal/OptionModal';
import RegisterModal from '../../components/Modal/RegisterModal';
import SuccessModal from '../../components/Modal/SuccessModal';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import Header from '../../layout/Header';


const ModalBox = () => {

    const {colors} : {colors : any} = useTheme();

    const [activeSheet , setActiveSheet] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const ActionData = [
        {
            icon : "info",
            title : "Confirm modal",
            sheet : 'option',
        },
        {
            icon : "check-circle",
            title : "Success Bar",
            sheet : 'success',
        },
        {
            icon : "log-out",
            title : "Login",
            sheet : 'login',
        },
        {
            icon : "file-text",
            title : "Register",
            sheet : 'register',
        },
    ]

    return (
        <>


            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={{
                    alignItems:'center',
                    justifyContent:'center',
                    flex:1,
                    position:'relative',
                }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => setModalVisible(false)}
                        style={{
                            position:'absolute',
                            height:'100%',
                            width:'100%',
                            backgroundColor:'rgba(0,0,0,.3)',
                        }}
                    />
                    {activeSheet === "option" ?
                        <OptionModal close={setModalVisible}/> :
                        activeSheet === "success" ?
                        <SuccessModal/> :
                        activeSheet === "login" ?
                        <LoginModal close={setModalVisible}/> :
                        activeSheet === "register" ?
                        <RegisterModal close={setModalVisible}/>
                        :
                        <SuccessModal/>
                    }
                </View>
            </Modal>

            <SafeAreaView style={{flex:1,backgroundColor:colors.card}}>
                <View
                    style={{
                        flex:1,
                        backgroundColor:colors.background,
                    }}
                >
                    <Header 
                        title={'Modal Box'}
                        leftIcon={'back'}
                    />
                    <ScrollView>
                        <View style={GlobalStyleSheet.container}>
                            <View style={[GlobalStyleSheet.card,{backgroundColor:colors.card}]}>
                                <View style={GlobalStyleSheet.cardBody}>
                                    {ActionData.map((data,index) => {
                                        return(
                                            <Ripple
                                                onPress={() => {setActiveSheet(data.sheet);setModalVisible(true)}}
                                                key={index}
                                                style={[{
                                                    flexDirection:'row',
                                                    alignItems:'center',
                                                    paddingHorizontal:0,
                                                    paddingVertical:12,
                                                    borderBottomWidth:1,
                                                    borderColor:colors.border,
                                                },
                                                index === ActionData.length - 1 && {
                                                    borderBottomWidth:0,
                                                }
                                                ]}
                                            >
                                                <View
                                                    style={{
                                                        height:30,
                                                        width:30,
                                                        backgroundColor:COLORS.primary,
                                                        borderRadius:30,
                                                        marginRight:12,
                                                        alignItems:'center',
                                                        justifyContent:'center',
                                                    }}
                                                >
                                                    <Feather  size={16} color={COLORS.title} name={data.icon}/>
                                                </View>
                                                <Text style={{...FONTS.font,...FONTS.fontMedium,flex:1,color:colors.title}}>{data.title}</Text>
                                                <Feather  color={colors.text} name={'chevron-right'} size={22}/>
                                            </Ripple>
                                        )
                                    })}
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </>
    );
};

export default ModalBox;