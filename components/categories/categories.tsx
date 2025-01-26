import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";

const categories = [
  { id: 1, title: "Pastelería", image: require("../../assets/images/pasteleria.png") },
  { id: 2, title: "Cafetería", image: require("../../assets/images/cafeteria.png") },
  { id: 3, title: "Vegano", image: require("../../assets/images/vegano.png") },
  { id: 4, title: "Brunch", image: require("../../assets/images/brunch.png") },
  { id: 5, title: "Saludable", image: require("../../assets/images/saludable.png") },
];

const Categories = () => {
  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <TouchableOpacity key={category.id} style={styles.categoryCard}>
          <Image source={category.image} style={styles.categoryImage} />
          <View style={styles.textContainer}>
            <Text style={styles.categoryText}>{category.title}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly", 
    paddingHorizontal: 5, 
    marginTop: 20, // espaciado superior
  },
  categoryCard: {
    width: 150, 
    height: 150,
    backgroundColor: "#271207",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 2, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  categoryImage: {
    width: 145, 
    height: 145,
    borderRadius: 6,
  },
  textContainer: {
    position: "absolute",
    bottom: 60, // baja el texto a la posición correcta
    width: "80%",
    backgroundColor: "#F7EBE1",
    borderRadius: 8,
    paddingVertical: 4,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#271207",
  },
  categoryText: {
    fontSize: 12,
    color: "#6B4226",
    fontFamily: "Montserrat-Bold",
    textAlign: "center",
  },
});

export default Categories;
