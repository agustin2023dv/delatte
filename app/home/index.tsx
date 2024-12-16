import React from "react";
import { SafeAreaView, Text } from "react-native";
import SearchBar from "components/search/SearchBar";

export default function HomeScreen() {


  return (
    <SafeAreaView style={{ flex: 1 }}>
        
        <SearchBar/>
        

    </SafeAreaView>
  );
}
