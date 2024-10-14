import { IRestaurant } from "shared/interfaces/IRestaurant";
import { Restaurant } from "../models/Restaurant";
import { findUserByEmailService} from "./user.service";

//* Servicio para obtener el restaurante del manager
export const getRestauranteIdByManagerService = async (managerId: string) => {
  try {
    const restaurante = await Restaurant.findOne({ managers: managerId });
    return restaurante?._id;
  } catch (error) {
    throw new Error('Error al obtener el restaurante del manager');
  }
};

//** Servicio para actualizar un restaurante por ID
export const updateRestaurantService = async (id: string, newRestaurantData: Partial<IRestaurant>) => {
  try {
    return await Restaurant.findByIdAndUpdate(id, newRestaurantData, { new: true });
  } catch (error) {
    throw new Error('Error al actualizar el restaurante');
  }
};

//** Servicio para crear restaurante
export const registerRestaurantService = async(restaurantData:Partial<IRestaurant>)=>{

  const email = restaurantData.emailContacto;

  if(email){
    const existingUser = await findUserByEmailService(email);
    console.log(existingUser);
    try{
    
      const newRestaurant = new Restaurant({
      ...restaurantData,
      nombre:restaurantData.nombre,
      emailContacto: restaurantData.emailContacto,
      direccion: restaurantData.direccion,
      managers: existingUser?.id     });
  
      const savedRestaurant = await newRestaurant.save();
      console.log('Restaurant guardado:', savedRestaurant);
      return savedRestaurant;
  }
  catch(error){
    console.error('Error al guardar el restaurant:', error);
       throw error; 
  }
  }
  else{
    console.log("no existe usuario con ese correo");
  }
  
}


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

    if (!restaurant.menuComida || !restaurant.menuBebidas || !restaurant.menuPostres) {
      throw new Error('Algunos menús del restaurante no se pudieron encontrar');
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