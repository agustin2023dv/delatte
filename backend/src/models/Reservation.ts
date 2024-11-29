import mongoose, { Schema } from 'mongoose';
import { IReservation } from '../../../shared/interfaces/IReservation';

const ReservaSchema: Schema = new Schema<IReservation>({
  dia: { type: Date, required: true }, // Día de la reserva
  horario: { type: String, required: true, match: /^([01]\d|2[0-3]):([0-5]\d)$/ }, // Horario en formato HH:mm
  restaurante: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true }, // Referencia al restaurante
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Referencia al cliente
  numAdultos: { type: Number, required: true, min: 1, default: 1 }, // Número de adultos en la reserva
  numNinos: { type: Number, min: 0, default: 0 }, // Número de niños menores de 10 años
  cancelada: { type: Boolean, default: false }, // Indica si la reserva fue cancelada
  pasada: { type: Boolean, default: false } // Indica si la reserva es pasada
});

// Índices para optimización de consultas
ReservaSchema.index({ restaurante: 1 });
ReservaSchema.index({ cliente: 1 });
ReservaSchema.index({ dia: 1 });

// Middleware para actualizar automáticamente el estado de "pasada"
ReservaSchema.pre('save', function (next) {
  const now = new Date();
  if (this.dia instanceof Date) {
    this.pasada = this.dia < now;
  }
  next();
});

const Reservation = mongoose.model<IReservation>('Reservation', ReservaSchema, 'reservas');
export default Reservation;

