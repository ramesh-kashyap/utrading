import React from 'react';
import { SafeAreaView, ActivityIndicator } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { TabView, TabBar } from 'react-native-tab-view';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import Deposit from './Deposit';
import Withdraw from './Withdraw';
import Order from './Order';
import Trade from './Trade';
import { GlobalStyleSheet } from '../../constants/StyleSheet';

const History = () => {

    const theme = useTheme();
    const {colors} = theme;

    const renderScene = ({route} : {route : any}) => {
        switch (route.key) {
            case 'Deposit':
                return <Deposit/>;
            case 'Withdraw':
                return <Withdraw/>;
            case 'Order':
                return <Order/>;
            case 'Trade':
                return <Trade/>;
            default:
                return null;
        }
    };
    
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {key: 'Deposit', title: "Deposit"},
        {key: 'Withdraw', title: "Withdraw"},
        {key: 'Order', title: "Order"},
        {key: 'Trade', title: "Trade"},
    ]);

    const renderTabBar = (props:any) => {
        return (
            <TabBar
                {...props}
                style={{
                    backgroundColor: theme.dark ? colors.background : colors.card,
                    paddingHorizontal:5,
                    height:50,
                    borderBottomWidth:1,
                    borderBottomColor:colors.border,
                    elevation:0,
                    shadowOpacity:0,
                }}
                scrollEnabled={true}
                tabStyle={{
                    width: 110,
                    height: 45,
                }}
                inactiveColor={colors.text}
                activeColor={'#000'}
                indicatorContainerStyle={{
                    paddingHorizontal:5,
                    left:5
                }}
                indicatorStyle={{
                    height: 40,
                    borderRadius:8,
                    backgroundColor: COLORS.primary,
                    bottom:5,
                }}
                pressColor={'transparent'}
                labelStyle={{
                    ...FONTS.font,
                    ...FONTS.fontSemiBold,
                    lineHeight:16,
                    textTransform: 'capitalize',
                }}
            />
        );
    };

    const renderLazyPlaceholder = () => (
        <ActivityIndicator color={COLORS.primary} />
    );

    return (
        <SafeAreaView
            style={[GlobalStyleSheet.container,{
                padding:0,
                flex:1,
                backgroundColor:colors.background,
            }]}
        >
            <Header
                title='History'
                leftIcon='back'
            />

            <TabView
                lazy
                renderLazyPlaceholder={renderLazyPlaceholder}
                navigationState={{index, routes}}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{width: SIZES.width, height: 0}}
                renderTabBar={renderTabBar}
            />

        </SafeAreaView>
    )
}

export default History;