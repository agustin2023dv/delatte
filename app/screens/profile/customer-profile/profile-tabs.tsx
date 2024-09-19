import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import AccountSettings from './account-settings';

const Tab = createMaterialTopTabNavigator();

//**Componente de navegación por pestañas para el perfil**
const ProfileTabs = () => {
  return (
    <Tab.Navigator>
      {/* Pestaña de configuración de cuenta */}
      <Tab.Screen name="AccountSettings" component={AccountSettings} />
    </Tab.Navigator>
  );
};

export default ProfileTabs;
