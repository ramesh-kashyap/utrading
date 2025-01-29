import React from 'react';
import { View, Text, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { BottomTabParamList } from '../../navigation/BottomTabParamList';
type Props = {
    name : string;
    image : any;
    description : string;
    link : any;
}

const ApiList = ({name, image, description, link} : Props) => {
  
    const {colors} : {colors : any} = useTheme();

    return (
        <View 
            style={{
                flexDirection:'row',
                alignItems:'center',
                paddingVertical:10,
            }}
        >
            <View
                style={{
                    height:50,
                    width:50,
                    borderRadius:SIZES.radius,
                    alignItems:'center',
                    justifyContent:'center',
                    backgroundColor:colors.card,
                    marginRight:15,
                }}
            >
                <Image
                    style={{
                        height:32,
                        width:32,
                        resizeMode:'contain',
                        tintColor:colors.transparent,
                    }}
                    source={image}
                />
            </View>
            <View style={{flex:1}}>
                <Text style={[FONTS.fontLg,FONTS.fontMedium,{color:colors.title,marginBottom:6,lineHeight:18}]}>{name}</Text>
                <Text style={[FONTS.fontSm,FONTS.fontBaseMedium,{color:colors.text,lineHeight:18}]}>{name}</Text>
            </View>
            <View style={{alignItems:'flex-end'}}>
                <Text style={[FONTS.h6,FONTS.fontBaseSemiBold,{color:colors.title,marginBottom:2}]} onPress={() => navigation.navigate('Apibind')}>{description} </Text>
                <Text style={[FONTS.fontXs,FONTS.fontBaseMedium,{color: parseInt(link) > 0 ? COLORS.success : COLORS.danger}]}>{link}</Text>
            </View>
        </View>
    )
}
export default ApiList;