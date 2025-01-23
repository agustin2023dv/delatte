import React, { useState, useEffect} from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { IRestaurant } from "../../../shared/interfaces/IRestaurant";
import RestaurantsList from "../../../components/restaurant/RestaurantList";
import { getRestaurantsByManagerIdService } from "services/restaurant.service";
import {useAuth} from 'hooks/useAuth';

const ManagerRestaurantsTab: React.FC = () => {
  const {id} = useAuth();
  console.log("user id:", id);
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; 
  
    const fetchRestaurants = async () => {
      try {
        if (id) {
          const response = await getRestaurantsByManagerIdService(id);
          if (isMounted) {
            setRestaurants(response);
          }
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
  
    fetchRestaurants();
  
    return () => {
      isMounted = false; 
    };
  }, [id]); 



  return (
    <SafeAreaView style={styles.container}>
      
      <RestaurantsList  
        restaurants={restaurants}
      />
   
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default ManagerRestaurantsTab;
