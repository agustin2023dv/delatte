import mongoose, { Schema } from 'mongoose';
import { IReservation } from '../../../shared/interfaces/IReservation';

const ReservaSchema: Schema = new Schema<IReservation>({
  dia: { type: Date, required: true }, // Día de la reserva
  horario: { type: String, required: true }, // Horario de la reserva
  restaurante: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true }, // Referencia al restaurante
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Referencia al cliente que hace la reserva
  numAdultos: { type: Number, required: true, default:1}, // Número de adultos en la reserva
  numNinos: { type: Number, default:0 }, // Número de niños menores de 10 años en la reserva
  cancelada: { type: Boolean, default: false }, // Estado de cancelación
  pasada: {type:Boolean, default:false}
});

const Reservation = mongoose.model<IReservation>('Reservation', ReservaSchema, 'reservations');
export default Reservation;
