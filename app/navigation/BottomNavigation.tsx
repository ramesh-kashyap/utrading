import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from './BottomTabParamList';
import TradeScreen from '../screens/Trade/Trade';
import ReferralScreen from '../screens/Referral/Referral';
import HomeScreen from '../screens/Home/Home';
import WalletScreen from '../screens/Wallet/Wallet';
import ProfileScreen from '../screens/Profile/Profile';
import BottomMenu from '../layout/BottomMenu';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown : false
            }}
            tabBar={(props:any) => <BottomMenu {...props}/>}
        >
            <Tab.Screen 
                name='Trade'
                component={TradeScreen}
            />
            <Tab.Screen 
                name='Referral'
                component={ReferralScreen}
            />
            <Tab.Screen 
                name='Home'
                component={HomeScreen}
            />
            <Tab.Screen 
                name='Wallet'
                component={WalletScreen}
            />
            <Tab.Screen 
                name='Profile'
                component={ProfileScreen}
            />
        </Tab.Navigator>
    )
}

export default BottomNavigation;