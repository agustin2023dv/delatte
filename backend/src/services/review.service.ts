import mongoose from "mongoose";
import { IReview } from "../../../shared/interfaces/IReview";
import { Review } from "../models/Review.model";
import Restaurant from "../models/Restaurant.model";


export const createReviewService = async (
  userId: string, // ID del usuario autenticado
  reviewData: { restaurante: string; calificacion: number; comentario: string }
) => {
  try {
    const { restaurante, calificacion, comentario } = reviewData;

    // Validar campos requeridos
    if (!restaurante || !calificacion || !comentario) {
      throw new Error("Todos los campos requeridos deben ser proporcionados.");
    }

    // Validar si el restaurante existe
    const restauranteExistente = await Restaurant.findById(restaurante);
    if (!restauranteExistente) {
      throw new Error("El restaurante no existe.");
    }

    // Crear la reseña con ObjectId
    const review = new Review({
      restaurante: new mongoose.Types.ObjectId(restaurante),
      usuario: new mongoose.Types.ObjectId(userId), // Asociar al usuario autenticado
      calificacion,
      comentario,
      fecha: new Date(),
    });

    return await review.save(); // Guardar la reseña en la base de datos
  } catch (error) {
    console.error("Error en createReviewService:", error);
    throw new Error("Error al crear la reseña");
  }
};

  
  export const getReviewsByRestaurantService = async (restaurantId: string) => {
    try {
      return await Review.find({ restaurante: restaurantId }).populate('usuario');
    } catch (error) {
      throw new Error('Error al obtener las reseñas del restaurante');
    }
  };
  
  export const updateReviewService = async (reviewId: string, reviewData: Partial<IReview>) => {
    try {
      return await Review.findByIdAndUpdate(reviewId, reviewData, { new: true });
    } catch (error) {
      throw new Error('Error al actualizar la reseña');
    }
  };
  
  export const deleteReviewService = async (reviewId: string) => {
    try {
      return await Review.findByIdAndDelete(reviewId);
    } catch (error) {
      throw new Error('Error al eliminar la reseña');
    }
  };