import React from "react";
import { SafeAreaView, Text } from "react-native";
import { RestaurantList } from "components/restaurant/RestaurantList";
import { useAuth } from "@/app/contexts/AuthContext";

export default function HomeScreen() {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1 }}>
        
        <RestaurantList/>

    </SafeAreaView>
  );
}
