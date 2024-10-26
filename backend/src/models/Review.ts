import mongoose, { Schema } from 'mongoose';
import { IReview } from 'shared/interfaces/IReview';

const ReviewSchema = new Schema<IReview>({
    restaurante: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    usuario: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    calificacion: { type: Number, min: 1, max: 5, required: true }, 
    comentario: { type: String, required: true },
    fecha: { type: Date, default: Date.now },
    ultimaActualizacion: { type: Date }
  });

  export const Review = mongoose.model<IReview>('Review', ReviewSchema, 'resenas');