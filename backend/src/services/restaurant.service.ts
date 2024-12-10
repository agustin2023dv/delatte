import { IRestaurant } from "shared/interfaces/IRestaurant";
import { findUserByEmailService} from "./user.service";
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
  const email = restaurantData.emailContacto;

  if (email) {
      const existingUser = await findUserByEmailService(email);
      console.log(existingUser);

      try {
          const direccionCompleta = `${restaurantData.direccion}, Montevideo, ${restaurantData.codigoPostal || ''}, Uruguay`;
          console.log(direccionCompleta);

          let latitude: number | undefined;
          let longitude: number | undefined;

          try {
              const coordenadas = await getCoordinatesFromAddress(direccionCompleta);
              console.log(coordenadas);
              if (coordenadas) {
                  latitude = coordenadas.latitude;
                  longitude = coordenadas.longitude;
              } else {
                  throw new Error("No se encontraron coordenadas para la dirección proporcionada.");
              }
          } catch (error) {
              console.error('Error al obtener coordenadas:', error);
              throw new Error('Restaurante no encontrado');
          }

          const newRestaurant = new Restaurant({
              ...restaurantData,
              nombre: restaurantData.nombre,
              emailContacto: restaurantData.emailContacto,
              direccion: restaurantData.direccion,
              codigoPostal: restaurantData.codigoPostal,
              latitud: latitude,
              longitud: longitude,
              managers: existingUser?.id
          });

          const savedRestaurant = await newRestaurant.save();
          console.log('Restaurant guardado:', savedRestaurant);
          return savedRestaurant;
      } catch (error) {
          console.error('Error al guardar el restaurant:', error);
          throw error;
      }
  } else {
      console.log("No existe usuario con ese correo");
  }
};

//*
export const searchRestaurantsService = async (query: string) => {
  return Restaurant.find({ nombre: { $regex: query, $options: 'i' } })
    .catch(error => {
      console.error('Error en la búsqueda:', error);
      throw error;
    });
};



// ** Servicio para obtener todos los detalles de un restaurante por ID
export const getRestaurantDetailsService = async (restaurantId: string) => {
  try {
    const restaurant = await Restaurant.findById(restaurantId)
      .populate('managers')
      .populate('menuComida')
      .populate('menuBebidas')
      .populate('menuPostres');

    if (!restaurant) {
      throw new Error('Restaurante no encontrado');
    }

    return restaurant;
  } catch (error) {
    throw new Error('Error al obtener los detalles del restaurante');
  }
};

//*
export const getRestaurantsByManagerIdService = async (managerId: string) => {
  try {
    const restaurants = await Restaurant.find({ managers: managerId }).populate('managers'); // Esto buscará todos los restaurantes donde el manager está en el array de managers
    return restaurants;
  } catch (error) {
    throw new Error('Error al obtener los restaurantes del manager');
  }
};