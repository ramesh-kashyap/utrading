import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Header from '../../layout/Header';
import ClassicTable from '../../components/Tables/ClassicTable';
import TableOddEven from '../../components/Tables/TableOddEven';

const Tables = () => {

    const {colors} = useTheme();

    return (
        <SafeAreaView style={{flex:1,backgroundColor:colors.background}}>
            <View style={{flex:1,backgroundColor:colors.background}}>
                <Header title={'Tables'} leftIcon={'back'}/>
                <ScrollView>
                    <View style={{...GlobalStyleSheet.container}}>
                        <ClassicTable/>
                        <TableOddEven/>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};


export default Tables;