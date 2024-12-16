import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ReservationsTab from './ReservationsTab';
import AccountSettings from './AccountSettings';

const Tab = createMaterialTopTabNavigator();

export default function ProfileTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Mis Reservas" component={ReservationsTab} />
      <Tab.Screen name="Información de la cuenta" component={AccountSettings} />
    </Tab.Navigator>
  );
}