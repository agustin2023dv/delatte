import React from "react";
import { View, StyleSheet, Button, Alert, Platform, Text, TextInput, TouchableOpacity } from "react-native";
import { Modal, Searchbar } from "react-native-paper";
import * as Location from "expo-location";
import { IRestaurant } from "shared/interfaces/IRestaurant";
import { getNearbyRestaurantsService, searchRestaurantsService } from "services/restaurant.service";
import RestaurantsList from "components/restaurant/RestaurantList";
import { Ionicons } from "@expo/vector-icons";


const SearchBar = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [results, setResults] = React.useState<IRestaurant[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [showNoResultsMessage, setShowNoResultsMessage] = React.useState(false);
  const debounceTimeout = React.useRef<NodeJS.Timeout | null>(null);

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(async () => {
      if (query.length > 0) {
        setLoading(true);
        try {
          const searchResults = await searchRestaurantsService(query);
          setResults(searchResults);
          setShowNoResultsMessage(searchResults.length === 0);
        } catch (error) {
          console.error("Error al realizar la búsqueda:", error);
          Alert.alert("Error", "No se pudieron buscar restaurantes.");
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
        setShowNoResultsMessage(false);
      }
    }, 300);
  };

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  return (
    <View style={styles.container}>
      {/* Texto principal */}
      <Text style={styles.mainText}>Buscando dónde tomar tu cafecito hoy?</Text>

      {/* Subtítulo */}
      <Text style={styles.subText}>Te ayudamos a encontrar el lugar perfecto ;)</Text>

      {/* Searchbar con botón */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar cafeterías"
          placeholderTextColor="#FFFFFF"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="search" size={20} color="#6B4226" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    alignItems: "center", // Centra los elementos horizontalmente
    padding: 50,
    backgroundColor: "#F7EBE1",
  },
  mainText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#6B4226",
    fontFamily: "Montserrat-Bold",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 50,
  },
  subText: {
    fontSize: 16,
    color: "#6B4226",
    fontFamily: "Montserrat-Regular",
    textAlign: "center",
    marginBottom: 50,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6B4226",
    borderRadius: 20,
    width: "50%",
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 50,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#FFFFFF",
    fontFamily: "Montserrat-Regular",
  },
  searchButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 10,
    marginLeft: 10,
  },
});