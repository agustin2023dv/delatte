  import React from 'react';
  import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
  import ReservationsTab from './ReservationsTab';
  import AccountSettings from './AccountSettingsTab';

  const Tab = createMaterialTopTabNavigator();

  export default function ProfileTabs() {
    return (
      <Tab.Navigator>

<Tab.Screen 
  name="AccountSettings" 
  component={AccountSettings} 
  options={{ title: "Información de la cuenta" }} 
/>

        <Tab.Screen 
  name="ReservationsTab" 
  component={ReservationsTab} 
  options={{ title: "Mis Reservas" }} 
/>


        
      </Tab.Navigator>
    );
  }