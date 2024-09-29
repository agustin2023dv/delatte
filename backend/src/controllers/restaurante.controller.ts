import { Request, Response } from 'express';
import {
  getRestaurantDetailsService,
  getRestaurantsByManagerIdService,
  registerRestaurantService,
  updateRestaurantService
} from '../services/restaurant.service';
import { registerManagerService } from '../services/user.service';
import { hashPasswordService } from '../services/auth.service';

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