import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SelectedAddress({ address }: { address: string }) {
  const navigation = useNavigation();



  return (
    <>
      <TouchableOpacity style={styles.container} >
        <Text style={styles.addressText}>{address || "Seleccionar dirección"}</Text>
      </TouchableOpacity>
    </>
    
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    margin: 10,
  },
  addressText: {
    fontSize: 16,
    color: "#333",
  },
});
