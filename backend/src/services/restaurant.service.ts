import { Restaurant } from "../models/Restaurant";

// Servicio para obtener el restaurante del manager
export const getRestauranteIdByManager = async (managerId: string) => {
    // Lógica para obtener el restaurante donde trabaja el manager
    const restaurante = await Restaurant.findOne({ manager: managerId });
    return restaurante?._id;
  };