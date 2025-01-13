import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';

import { IRestaurant } from 'shared/interfaces/IRestaurant';
import { searchRestaurantsService } from 'services/restaurant.service';
import RestaurantsList from 'components/restaurant/RestaurantList';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [results, setResults] = React.useState<IRestaurant[]>([]); 
  const [loading, setLoading] = React.useState(false);
  const debounceTimeout = React.useRef<NodeJS.Timeout | null>(null);

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);


    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Configurar un nuevo temporizador (300ms debounce)
    debounceTimeout.current = setTimeout(async () => {
      if (query.length > 0) {
        setLoading(true);
        try {
          const searchResults = await searchRestaurantsService(query);

          // Filtrar y asegurar que los resultados sean de tipo `IRestaurant`
          const filteredResults = searchResults.filter(
            (result: { _id: any; nombre: any; direccion: any; }): result is IRestaurant =>
              !!result._id && !!result.nombre && !!result.direccion
          );

          setResults(filteredResults);
        } catch (error) {
          console.error('Error al realizar la búsqueda:', error);
        } finally {
          setLoading(false);
        }
      } else {
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
      <RestaurantsList restaurants={results}  />
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
