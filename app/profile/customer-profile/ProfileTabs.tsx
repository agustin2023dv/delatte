import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ReservationsTab from './ReservationsTab';
import AccountSettings from './AccountSettings';

const Tab = createMaterialTopTabNavigator();

export default function ProfileTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Cliente" component={ReservationsTab} />
      <Tab.Screen name="Manager" component={AccountSettings} />
    </Tab.Navigator>
  );
}