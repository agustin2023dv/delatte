import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AccountSettings from './AccountSettingsTab';
import ReservationsTab from './ReservationsTab';
import ManagerRestaurantsTab from './ManagerRestaurantsTab';

const Tab = createMaterialTopTabNavigator();

export default function ProfileTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Información de la cuenta" component={AccountSettings} />
      <Tab.Screen name="MisRestaurantes" component={ManagerRestaurantsTab} />
      <Tab.Screen name="Reservas" component={ReservationsTab} />
      
    </Tab.Navigator>
  );
}