import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {Feather}  from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { FONTS, SIZES } from '../../constants/theme';

type Props = {
    sheet ?: any;
    modal ?: any;
    value : any;
    defaultText ?: string;
}

const Select = ({sheet,value,defaultText,modal} : Props) => {

    const {colors} : {colors : any} = useTheme();

    return (
        <View>
            <TouchableOpacity
                onPress={() => modal ? modal(true) : sheet.current.snapToIndex(0)}
                style={{
                    ...FONTS.font,
                    height : 48,
                    borderRadius:SIZES.radius_sm,
                    paddingHorizontal:15,
                    paddingVertical:5,
                    borderWidth:1,
                    backgroundColor:colors.input,
                    borderColor:colors.border,
                    flexDirection:'row',
                    alignItems:'center',
                }}
            >
                <Text style={[FONTS.font,{color:colors.title,lineHeight:16,flex:1}]}>{value ? value : defaultText ? defaultText : "Select type"}</Text>

                <Feather  size={22} color={colors.text} name='chevron-down'/>

            </TouchableOpacity>
        </View>
    )
}

export default Select;