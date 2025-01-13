import React, { useState, useEffect } from "react";
import { Button, Image, View, Alert, StyleSheet, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { deletePhotoFromGalleryService, addPhotoToGalleryService } from "../../services/restaurant.service";

interface ImageManagerProps {
  restaurantId: string;
  initialImages?: string[]; // URLs iniciales de las imágenes
  onImagesUpdated: (newImages: string[]) => void; // Callback para notificar cambios
}

export const ImageManager: React.FC<ImageManagerProps> = ({
  restaurantId,
  initialImages = [],
  onImagesUpdated,
}) => {
  const [images, setImages] = useState<string[]>(initialImages);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Se necesitan permisos para acceder a la galería.");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setLoading(true);

        const { uri } = result.assets[0];
        if (Platform.OS === "web") {
          const file = result.assets[0] as unknown as File;
          const uploadedImageUrl = await addPhotoToGalleryService(restaurantId, file);
          const updatedImages = [...images, uploadedImageUrl];
          setImages(updatedImages);
          onImagesUpdated(updatedImages);
          Alert.alert("Éxito", "Foto agregada correctamente.");
          return;
        }

        const response = await fetch(uri);
        const blob = await response.blob();
        const fileName = uri.split("/").pop();
        const type = `image/${fileName?.split(".").pop()}`;
        const file = new File([blob], fileName || "photo.jpg", { type });

        const uploadedImageUrl = await addPhotoToGalleryService(restaurantId, file);
        const updatedImages = [...images, uploadedImageUrl];

        setImages(updatedImages);
        onImagesUpdated(updatedImages);
        Alert.alert("Éxito", "Foto agregada correctamente.");
      }
    } catch (error) {
      console.error("Error al seleccionar y subir la imagen:", error);
      Alert.alert("Error", "No se pudo subir la imagen.");
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (imageUrl: string) => {
    try {
      setLoading(true);
      await deletePhotoFromGalleryService(restaurantId, imageUrl);
      const updatedImages = images.filter((image) => image !== imageUrl);
      setImages(updatedImages);
      onImagesUpdated(updatedImages);
      Alert.alert("Éxito", "Foto eliminada correctamente.");
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
      Alert.alert("Error", "No se pudo eliminar la imagen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Button title={loading ? "Cargando..." : "Subir Imagen"} onPress={pickImage} />
      {images.map((image, index) => (
        <View key={index} style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          <Button title="Eliminar" color="red" onPress={() => deleteImage(image)} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  image: {
    width: "100%",
    height: 150,
    marginRight: 10,
  },
});
