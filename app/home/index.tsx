import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import SearchBar from "components/search/SearchBar";
import NavBar from "components/navbar/navbar";
import Categories from "components/categories/categories";
export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <NavBar />
      <SearchBar />
      <Categories />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#F7EBE1",
  },
});
