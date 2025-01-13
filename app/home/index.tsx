import React from "react";
import { SafeAreaView } from "react-native";
import SearchBar from "components/search/SearchBar";
import LogOutButton from "components/buttons/LogOutButton";

export default function HomeScreen() {


  return (
    <SafeAreaView style={{ flex: 1 }}>
        <LogOutButton />
        <SearchBar/>
        

    </SafeAreaView>
  );
}
