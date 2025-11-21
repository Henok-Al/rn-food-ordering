import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/home/HomeScreen';
import OrdersListScreen from '../screens/orders/OrdersListScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import { MainTabParamList } from './types';
import { COLORS } from '../utils/constants';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.muted,
    }}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Orders" component={OrdersListScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

export default MainTabNavigator;
