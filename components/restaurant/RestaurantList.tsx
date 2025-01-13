import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { IRestaurant } from "../../shared/interfaces/IRestaurant";
import { RestaurantCard } from "./RestaurantCard";
import { RestaurantDetails } from "./RestaurantDetails";

interface RestaurantListProps {
  restaurants: IRestaurant[];
  onEditPress?: (restaurant: IRestaurant) => void;
}

const RestaurantsList: React.FC<RestaurantListProps> = ({
  restaurants,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(null);

  const handleDetailsPress = (restaurant: IRestaurant) => {
    setSelectedRestaurantId(restaurant._id?.toString() || null);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedRestaurantId(null);
  };

  return (
    <View>
      <FlatList
        data={restaurants}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <RestaurantCard
              restaurant={item}
              onDetailsPress={handleDetailsPress}
            />
          </View>
        )}
        keyExtractor={(item) => item._id?.toString() || ""}
        numColumns={2}
        contentContainerStyle={styles.container}
      />

      {selectedRestaurantId && (
        <RestaurantDetails
          restaurantId={selectedRestaurantId}
          visible={modalVisible}
          onClose={handleCloseModal}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  item: {
    flex: 1,
    margin: 5,
  },
});

export default RestaurantsList;