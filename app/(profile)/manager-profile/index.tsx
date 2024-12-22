import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AccountSettings from './AccountSettingsTab';
import RestaurantList from './ManagerRestaurantsTab';
import ReservationsTab from './ReservationsTab';

const Tab = createMaterialTopTabNavigator();

export default function ProfileTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Mis Restaurantes" component={RestaurantList} />
      <Tab.Screen name="Reservas" component={ReservationsTab} />
      <Tab.Screen name="Información de la cuenta" component={AccountSettings} />
    </Tab.Navigator>
  );
}