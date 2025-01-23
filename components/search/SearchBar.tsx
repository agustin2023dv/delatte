import * as React from 'react';
import { View, StyleSheet, Button, Alert, Platform, Text } from 'react-native';
import { Modal, Searchbar } from 'react-native-paper'; // Asegúrate de que Modal esté bien importado
import * as Location from 'expo-location'; 
import { IRestaurant } from 'shared/interfaces/IRestaurant';
import { getNearbyRestaurantsService, searchRestaurantsService } from 'services/restaurant.service';
import RestaurantsList from 'components/restaurant/RestaurantList';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [results, setResults] = React.useState<IRestaurant[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [showNoResultsMessage, setShowNoResultsMessage] = React.useState(false); // Estado para el mensaje de "Sin resultados"
  const debounceTimeout = React.useRef<NodeJS.Timeout | null>(null);

  // Función para buscar restaurantes por texto
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
          setShowNoResultsMessage(searchResults.length === 0); // Actualiza el estado si no hay resultados
        } catch (error) {
          console.error('Error al realizar la búsqueda:', error);
          Alert.alert('Error', 'No se pudieron buscar restaurantes.');
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
        setShowNoResultsMessage(false); // No mostrar mensaje si no hay query
      }
    }, 300); // 300 ms de debounce
  };

  // Función para buscar restaurantes cercanos
  const onSearchNearby = async () => {
    setLoading(true);
    setShowNoResultsMessage(false); // Reinicia el mensaje antes de buscar
    try {
      let latitude: number;
      let longitude: number;

      if (Platform.OS === 'web') {
        if (!navigator.geolocation) {
          Alert.alert('Error', 'La geolocalización no está soportada por este navegador.');
          setLoading(false);
          return;
        }

        navigator.geolocation.getCurrentPosition(
          (position) => {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            searchRestaurantsNearby(latitude, longitude);
          },
          (error) => {
            console.error('Error al obtener la ubicación:', error);
            Alert.alert('Error', 'No se pudo obtener la ubicación.');
            setLoading(false);
          }
        );
      } else {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permiso denegado', 'Se requiere acceso a la ubicación para buscar restaurantes cercanos.');
          setLoading(false);
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        latitude = location.coords.latitude;
        longitude = location.coords.longitude;
        searchRestaurantsNearby(latitude, longitude);
      }
    } catch (error) {
      console.error('Error al buscar restaurantes cercanos:', error);
      Alert.alert('Error', 'No se pudieron buscar restaurantes cercanos.');
      setLoading(false);
    }
  };

  const searchRestaurantsNearby = async (lat: number, lng: number) => {
    try {
      const nearbyResults = await getNearbyRestaurantsService(lat, lng, 4000); // Radio de 4kms
      setResults(nearbyResults);
      setShowNoResultsMessage(nearbyResults.length === 0); // Actualiza el estado si no hay resultados
    } catch (error) {
      console.error('Error al buscar restaurantes cercanos:', error);
      Alert.alert('Error', 'No se pudieron buscar restaurantes cercanos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Buscar"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchBar}
      />
      <Button title="Buscar cerca mío" onPress={onSearchNearby} disabled={loading} />
      
      {/* Mostrar mensaje si no hay resultados en un modal */}
      <Modal visible={showNoResultsMessage} onDismiss={() => setShowNoResultsMessage(false)} contentContainerStyle={styles.modalContainer}>
        <Text style={styles.modalText}>Lo siento, no hay resultados para la búsqueda realizada.</Text>
        <Button title="Cerrar" onPress={() => setShowNoResultsMessage(false)} />
      </Modal>

      {/* Lista de restaurantes */}
      {results.length > 0 && <RestaurantsList restaurants={results} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    marginBottom: 10,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default SearchBar;
