import mongoose, { Schema } from 'mongoose';
import { IReservation } from '../../../shared/interfaces/IReservation';

const ReservaSchema: Schema = new Schema<IReservation>({
  restaurante: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true }, // Referencia al restaurante
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Referencia al usuario que realiza la reserva
  fecha: { type: Date, required: true }, // Fecha completa de la reserva
  horario: { type: String, required: true, match: /^([01]\d|2[0-3]):([0-5]\d)$/ }, // Horario en formato HH:mm
  numAdultos: { type: Number, required: true, min: 1, default: 1 }, // Número de adultos
  numNinos: { type: Number, min: 0, default: 0 }, // Número de niños menores de 10 años
  pedidosEspeciales: { type: String, maxlength: 500 }, // Nota opcional del usuario
  estado: { type: String, enum: ["Pendiente", "Confirmada", "Cancelada"], default: "Pendiente" }, // Estado de la reserva
  fechaCreacion: { type: Date, default: Date.now }, // Fecha de creación
});

// Índices para optimización de consultas
ReservaSchema.index({ restaurante: 1 });
ReservaSchema.index({ usuario: 1 });
ReservaSchema.index({ fecha: 1 });

// Middleware para actualizar automáticamente el estado de "pasada"
ReservaSchema.pre('save', function (next) {
  const now = new Date();
  if (this.fecha instanceof Date) {
    this.estado = this.fecha < now ? "Cancelada" : this.estado; // Actualiza si ya pasó
  }
  next();
});

const Reservation = mongoose.model<IReservation>('Reservation', ReservaSchema, 'reservas');
export default Reservation;
