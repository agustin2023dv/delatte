import { IRestaurant } from "shared/interfaces/IRestaurant";
import { Restaurant } from "../models/Restaurant";
import { registerManagerService } from "./user.service";
import mongoose from 'mongoose';

//* Servicio para obtener el restaurante del manager
export const getRestauranteIdByManagerService = async (managerId: string) => {
  try {
    const restaurante = await Restaurant.findOne({ managers: managerId });
    return restaurante?._id;
  } catch (error) {
    throw new Error('Error al obtener el restaurante del manager');
  }
};

//* Servicio para crear un nuevo restaurante
export const createRestaurantService = async (restaurantData: IRestaurant, managerId: mongoose.Types.ObjectId) => {
  try {
    const newRestaurant = new Restaurant({
      ...restaurantData,
      managers: [managerId], // Relación del restaurante con el manager
    });

    return await newRestaurant.save();
  } catch (error) {
    throw new Error('Error al crear el restaurante');
  }
};

//** Servicio para obtener los detalles de un restaurante por ID
export const getRestaurantByIdService = async (id: string) => {
  try {
    const restaurant = await Restaurant.findById(id).populate('managers');
    return restaurant;
  } catch (error) {
    throw new Error('Error al obtener el restaurante');
  }
};

//** Servicio para actualizar un restaurante por ID
export const updateRestaurantService = async (id: string, updateData: Partial<IRestaurant>) => {
  try {
    return await Restaurant.findByIdAndUpdate(id, updateData, { new: true });
  } catch (error) {
    throw new Error('Error al actualizar el restaurante');
  }
};

//** Servicio para crear restaurante y manager en una transacción
export const createRestaurantAndManagerService = async (restaurantData: IRestaurant, managerData: any) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Reutilizamos el servicio de registro de manager
    const savedManager = await registerManagerService(managerData);

    // Crear el restaurante con el manager
    const newRestaurant = new Restaurant({
      ...restaurantData,
      managers: [savedManager._id],
    });

    const savedRestaurant = await newRestaurant.save({ session });

    await session.commitTransaction();
    session.endSession();

    return { savedRestaurant, savedManager };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new Error('Error al crear restaurante y manager');
  }
};
