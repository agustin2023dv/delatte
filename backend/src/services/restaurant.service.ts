import { IRestaurant } from "../../../shared/interfaces/IRestaurant";
import { getCoordinatesFromAddress } from "./distance-matrix.service";
import Restaurant from "../models/Restaurant.model";


//* Servicio para obtener el restaurante del manager
export const getRestauranteIdByManagerService = async (managerId: string) => {
  try {
    const restaurante = await Restaurant.findOne({ managers: managerId });
    return restaurante?._id;
  } catch (error) {
    throw new Error('Error al obtener el restaurante del manager');
  }
};

//* Servicio para obtener TODOS los restaurantes
export const getAllRestaurantsService = async()=>{
  try {
    const restaurantes = await Restaurant.find();
      return restaurantes;

  } catch (error) {
    throw new Error('Error al obtener restaurantes');
  }
}

//** Servicio para actualizar un restaurante por ID
export const updateRestaurantService = async (id: string, newRestaurantData: Partial<IRestaurant>) => {
  try {
    return await Restaurant.findByIdAndUpdate(id, newRestaurantData, { new: true });
  } catch (error) {
    throw new Error('Error al actualizar el restaurante');
  }
};

//** Servicio para crear restaurante
export const registerRestaurantService = async (restaurantData: Partial<IRestaurant>) => {
  try {
    const direccionCompleta = `${restaurantData.direccion}, Montevideo, ${restaurantData.codigoPostal || ''}, Uruguay`;
    console.log("Dirección completa:", direccionCompleta);

    let latitude: number | undefined;
    let longitude: number | undefined;

    // Obtener coordenadas a partir de la dirección
    try {
      const coordenadas = await getCoordinatesFromAddress(direccionCompleta);
      console.log("Coordenadas obtenidas:", coordenadas);
      if (coordenadas) {
        latitude = coordenadas.latitude;
        longitude = coordenadas.longitude;
      } else {
        throw new Error("No se encontraron coordenadas para la dirección proporcionada.");
      }
    } catch (error) {
      console.error('Error al obtener coordenadas:', error);
      throw new Error('Error al obtener coordenadas para el restaurante.');
    }

    // Crear el restaurante con el manager principal asignado y ubicacion en formato GeoJSON
    const newRestaurant = new Restaurant({
      ...restaurantData,
      ubicacion: {
        type: "Point",
        coordinates: [longitude!, latitude!], // [longitud, latitud] formato GeoJSON
      },
    });

    const savedRestaurant = await newRestaurant.save();
    console.log('Restaurante guardado:', savedRestaurant);
    return savedRestaurant;
  } catch (error) {
    console.error('Error al guardar el restaurante:', error);
    throw error;
  }
};


// ** Servicio para obtener todos los detalles de un restaurante por ID
export const getRestaurantDetailsService = async (restaurantId: string) => {
  try {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      throw new Error('Restaurante no encontrado');
    }

    return restaurant;
  } catch (error) {
    throw new Error('Error al obtener los detalles del restaurante');
  }
};


//*
export const getRestaurantsByManagerIdService = async (id: string) => {
  try {
    const restaurants = await Restaurant.find({
         managerPrincipal: id
    });
    return restaurants;
  } catch (error) {
    throw new Error('Error al obtener los restaurantes del manager');
  }
};



// Obtener las fotos de la galería de un restaurante
export const getGalleryPhotosService = async (restaurantId: string) => {
  try {
    const restaurant = await Restaurant.findById(restaurantId).select("galeriaFotos");
    if (!restaurant) {
      throw new Error("Restaurante no encontrado");
    }
    return restaurant.galeriaFotos;
  } catch (error) {
    throw new Error("Error al obtener las fotos de la galería");
  }
};

// Agregar una foto a la galería de un restaurante
export const addPhotoToGalleryService = async (restaurantId: string, photoUrl: string) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      { $push: { galeriaFotos: photoUrl } },
      { new: true }
    );

    if (!restaurant) {
      throw new Error("Restaurante no encontrado");
    }

    return restaurant.galeriaFotos;
  } catch (error) {
    throw new Error("Error al agregar la foto a la galería");
  }
};

// Eliminar una foto de la galería de un restaurante
export const removePhotoFromGalleryService = async (restaurantId: string, photoUrl: string) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      { $pull: { galeriaFotos: photoUrl } },
      { new: true }
    );
    if (!restaurant) {
      throw new Error("Restaurante no encontrado");
    }
    return restaurant.galeriaFotos;
  } catch (error) {
    throw new Error("Error al eliminar la foto de la galería");
  }
};


// Servicio para verificar si el usuario es manager o co-manager de un restaurante
export const checkUserRoleInRestaurantService = async (restaurantId: string, userId: string): Promise<boolean> => {
  try {
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      throw new Error('Restaurante no encontrado');
    }

    // Verificar si el usuario es manager principal o co-manager
    return (
      restaurant.managerPrincipal?.toString() === userId ||
      restaurant.coManagers.some((manager) => manager.toString() === userId)
    );
  } catch (error) {
    console.error('Error en el servicio checkUserRoleInRestaurant:', error);
    throw error;
  }
};