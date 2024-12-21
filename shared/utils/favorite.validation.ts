
import User from "backend/models/User.model";
import mongoose from "mongoose";


export const validateUserAndRestaurant = async (userId: string, restaurantId: string) => {
    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
        throw new Error('ID de restaurante no válido');
    }
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    return user;
};
