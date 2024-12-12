import { IReview } from "../../../shared/interfaces/IReview";
import { Review } from "../models/Review.model";

export const createReviewService = async (reviewData: Partial<IReview>) => {
    try {
      const review = new Review(reviewData);
      return await review.save();
    } catch (error) {
      throw new Error('Error al crear la reseña');
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