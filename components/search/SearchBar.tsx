import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { searchRestaurantsService } from '@/app/services/restaurant.service';
import { RestaurantList } from 'components/restaurant/RestaurantList';
import { IRestaurant } from 'shared/interfaces/IRestaurant';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [results, setResults] = React.useState<Partial<IRestaurant>[]>([]);
  const [loading, setLoading] = React.useState(false);
  const debounceTimeout = React.useRef<NodeJS.Timeout | null>(null);

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);

    // Limpiar el temporizador previo si existe (debounce)
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Configurar un nuevo temporizador (300ms debounce)
    debounceTimeout.current = setTimeout(async () => {
      if (query.length > 0) { // Realizar la búsqueda solo si el usuario ha ingresado algo
        setLoading(true);
        try {
          const searchResults = await searchRestaurantsService(query);
          setResults(searchResults);
        } catch (error) {
          console.error('Error al realizar la búsqueda:', error);
        } finally {
          setLoading(false);
        }
      } else {
        // Si el query está vacío, limpiar los resultados
        setResults([]);
      }
    }, 250);
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Buscar"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <RestaurantList restaurants={results} loading={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default SearchBar;
