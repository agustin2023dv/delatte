import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CustomerRegister from "./CustomerRegister";
import ManagerRegister from "./ManagerRegister";

const Tab = createMaterialTopTabNavigator();

export default function RegisterTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "#e7ded9" },
        tabBarLabelStyle: { fontFamily: "Montserrat-Bold", fontSize: 14, color: "#271207" },
        tabBarIndicatorStyle: { backgroundColor: "#a5744b" },
      }}
    >
      <Tab.Screen name="Cliente" component={CustomerRegister} />
      <Tab.Screen name="Manager" component={ManagerRegister} />
    </Tab.Navigator>
  );
}
