import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AccountSettings from './AccountSettings';
import RestaurantList from './RestaurantList';

const Tab = createMaterialTopTabNavigator();

export default function ProfileTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Cliente" component={RestaurantList} />
      <Tab.Screen name="Manager" component={AccountSettings} />
    </Tab.Navigator>
  );
}