import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AccountSettings from './AccountSettings';
import RestaurantList from './RestaurantList';

const Tab = createMaterialTopTabNavigator();

export default function ProfileTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Mis Restaurantes" component={RestaurantList} />
      <Tab.Screen name="Información de la cuenta" component={AccountSettings} />
    </Tab.Navigator>
  );
}