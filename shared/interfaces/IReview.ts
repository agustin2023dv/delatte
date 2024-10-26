import { Document, ObjectId } from 'mongoose';

export interface IReview extends Document {
    restaurante: ObjectId; // Relación con el restaurante reseñado
    usuario: ObjectId; // Relación con el usuario que hizo la reseña
    calificacion: number; // Calificación del restaurante, p. ej. del 1 al 5
    comentario: string; // Comentario de la reseña
    fecha: Date; // Fecha en la que se hizo la reseña
    ultimaActualizacion?: Date; // Fecha de última actualización si la reseña fue editada
  }

  export interface IReviewProps {
    restaurantId: string;
    isManager: boolean; 
  }