import { Document, ObjectId } from 'mongoose';

export interface IReservation extends Document {
  _id: ObjectId | string ; // ID de la reserva
  dia: Date; // Día de la reserva
  horario: string; // Horario de la reserva
  restaurante: ObjectId; // ID del restaurante
  cliente: ObjectId; // ID del usuario que realiza la reserva
  numAdultos: number; // Número de adultos
  numNinos: number; // Número de niños menores de 10 años
  cancelada: boolean; // Indica si la reserva ha sido cancelada
  pasada: boolean // Indica si la reserva es pasada o futura
}
