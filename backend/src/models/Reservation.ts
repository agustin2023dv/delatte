import mongoose, { Schema } from 'mongoose';
import { IReservation } from '../interfaces/IReservation';

const ReservaSchema: Schema = new Schema<IReservation>({
  dia: { type: Date, required: true }, // Día de la reserva
  horario: { type: String, required: true }, // Horario de la reserva
  restaurante: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true }, // Referencia al restaurante
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Referencia al cliente que hace la reserva
  numAdultos: { type: Number, required: true }, // Número de adultos en la reserva
  numNinos: { type: Number, required: true }, // Número de niños menores de 10 años en la reserva
});

const Reservation = mongoose.model<IReservation>('Reservation', ReservaSchema, 'reservations'); // Crear el modelo de reserva basado en el esquema
export default Reservation;
