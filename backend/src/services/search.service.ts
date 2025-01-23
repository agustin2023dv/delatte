import Restaurant from "backend/models/Restaurant.model";

// Obtener lugares cercanos usando coordenadas y un radio
export const getPlacesNearbyService = async (lat: number, lng: number, radius: number) => {
  try {
    const nearbyRestaurants = await Restaurant.find({
      ubicacion: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat], 
          },
          $maxDistance: radius, 
          $minDistance: 0       
            },
      },
    });

    console.log(nearbyRestaurants.length);
    return nearbyRestaurants;
  } catch (error) {
    console.error("Error al buscar lugares cercanos en MongoDB:", error);
    throw new Error("No se pudo obtener la lista de restaurantes cercanos.");
  }
};


export const getRestaurantByNameService = async (query: string) => {
  return Restaurant.find({ nombre: { $regex: query, $options: 'i' } })
    .catch(error => {
      console.error('Error en la búsqueda:', error);
      throw error;
    });
};

