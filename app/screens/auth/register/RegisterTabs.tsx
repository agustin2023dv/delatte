import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CustomerRegister from './CustomerRegister';
import ManagerRegister from './ManagerRegister';

const Tab = createMaterialTopTabNavigator();

export default function RegisterTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Cliente" component={CustomerRegister} />
      <Tab.Screen name="Manager" component={ManagerRegister} />
    </Tab.Navigator>
  );
}
