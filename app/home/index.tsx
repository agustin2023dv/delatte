import React from "react";
import { SafeAreaView, StyleSheet, View, Image } from "react-native";
import SearchBar from "components/search/SearchBar";
import LogOutButton from "components/buttons/LogOutButton";
import NavBar from "../components/navbar/navbar";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <NavBar />
      <SearchBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#F7EBE1",
  },
});