import mongoose, { Schema } from 'mongoose';
import { IReview } from 'shared/interfaces/IReview';

const ReviewSchema = new Schema<IReview>({
  restaurante: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  usuario: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  calificacion: { type: Number, min: 1, max: 5, required: true }, 
  comentario: { type: String, required: true, maxlength: 500 }, // Limita el texto a 500 caracteres
  fecha: { type: Date, default: Date.now },
  ultimaActualizacion: { type: Date }
});

// Índices para optimizar búsquedas
ReviewSchema.index({ restaurante: 1 });
ReviewSchema.index({ usuario: 1 });

// Middleware para actualizar "ultimaActualizacion"
ReviewSchema.pre('save', function(next) {
  this.ultimaActualizacion = new Date();
  next();
});

export const Review = mongoose.model<IReview>('Review', ReviewSchema, 'resenas');
