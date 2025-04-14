import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from './BottomTabParamList';
import TradeScreen from '../screens/Trade/Trade';
import ReferralScreen from '../screens/Referral/Referral';
import HomeScreen from '../screens/Home/Home';
import WalletScreen from '../screens/Wallet/Wallet';
import ProfileScreen from '../screens/Profile/Profile';
import BottomMenu from '../layout/BottomMenu';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomNavigation = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props: any) => <BottomMenu {...props} />}
    >
      <Tab.Screen 
        name='Trade'
        component={TradeScreen}
        options={{ tabBarLabel: t('trade') }}
      />
      <Tab.Screen 
        name='Referral'
        component={ReferralScreen}
        options={{ tabBarLabel: t('referral') }}
      />
      <Tab.Screen 
        name='Home'
        component={HomeScreen}
        options={{ tabBarLabel: t('home') }}
      />
      <Tab.Screen 
        name='Wallet'
        component={WalletScreen}
        options={{ tabBarLabel: t('wallet') }}
      />
      <Tab.Screen 
        name='Profile'
        component={ProfileScreen}
        options={{ tabBarLabel: t('profile') }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
