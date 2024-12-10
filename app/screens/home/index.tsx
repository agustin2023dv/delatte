import React from "react";
import { SafeAreaView, Text } from "react-native";
import { useAuth } from "@/app/contexts/AuthContext";
import SearchBar from "components/search/SearchBar";

export default function HomeScreen() {
  useAuth();

  return (
    <SafeAreaView style={{ flex: 1 }}>
        
        <SearchBar/>
        

    </SafeAreaView>
  );
}
