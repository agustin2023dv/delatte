import { Request, Response } from 'express';
import {
  getAllRestaurantsService,
  getRestaurantDetailsService,
  getRestaurantsByManagerIdService,
  registerRestaurantService,
  searchRestaurantsService,
  updateRestaurantService
} from '../services/restaurant.service';
import { registerManagerService } from '../services/user.service';
import { hashPasswordService } from '../services/auth.service';
//import  {validateSearchQuery}  from 'shared/utils/search.validation';

//* Controlador para crear un nuevo restaurante y manager
export const registerRestaurantAndManagerController = async (req: Request, res: Response) => {
  try {
    console.log('Datos recibidos en el controlador:', req.body); 
    const restaurantData = req.body.restaurant;
    const managerData = req.body.manager;

    // Hashear la contraseña del usuario
    const hashedPassword = await hashPasswordService(req.body.manager.password);
    req.body.manager.password = hashedPassword;
    console.log('Restaurant details: ', restaurantData);
    console.log('Manager: ', managerData);
    
    const savedManager=  await registerManagerService(managerData);
    const savedRestaurant= await registerRestaurantService(restaurantData);
    
    return res.status(201).json({ savedRestaurant, savedManager });
  } catch (error) {
    return res.status(500).json({ message: 'ERROR xxx', error: error instanceof Error ? error.message : 'Error desconocido' });
  }
};

//* Controlador para obtener TODOS los restaurantes
export const getAllRestaurantsController = async (req: Request, res:Response)=>{
  try {
    const restaurants = await getAllRestaurantsService();
    if (!restaurants || restaurants.length === 0) { // Comprobar si no hay restaurantes
      return res.status(404).json({ message: 'No se encontraron restaurantes' });
    }
    return res.status(200).json(restaurants);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener restaurantes', error });
  }
}

//* Controlador para obtener los detalles de un restaurante
export const getRestaurantByIdController = async (req: Request, res: Response) => {
  try {
    const restaurant = await getRestaurantDetailsService(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurante no encontrado' });
    }
    return res.status(200).json(restaurant);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener el restaurante', error });
  }
};

//* Controlador para actualizar un restaurante
export const updateRestaurantController = async (req: Request, res: Response) => {
  try {
    const updatedRestaurant = await updateRestaurantService(req.params.id, req.body);
    if (!updatedRestaurant) {
      return res.status(404).json({ message: 'Restaurante no encontrado' });
    }
    return res.status(200).json(updatedRestaurant);
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar el restaurante', error });
  }
};

//*Controlador para obtener restaurantes a cargo de un manager
export const getRestaurantsByManagerIdController = async (req: Request, res: Response) => {
  try {
    const managerId = req.params.managerId;
    const restaurants = await getRestaurantsByManagerIdService(managerId);
    
    if (!restaurants) {
      return res.status(404).json({ message: 'No se encontraron restaurantes para este manager' });
    }

    return res.status(200).json(restaurants);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener los restaurantes', error });
  }
};


export const getSearchResultsController = async (req: Request, res: Response) => {
  try {
      const query = req.query.q as string;

      // Llama a la función de validación
      if (!query /*|| !validateSearchQuery(query)*/) {
          return res.status(400).json({ message: 'Parámetro de búsqueda no válido' });
      }

      const results = await searchRestaurantsService(query);
      res.json(results);
  } catch (error) {
      console.error('Error en la búsqueda:', error);
      res.status(500).json({ message: 'Error en la búsqueda', error });
  }
};
