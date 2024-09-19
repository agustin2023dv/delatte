import { Document, ObjectId } from 'mongoose';

export interface IReservation extends Document {
  dia: Date; // Día de la reserva
  horario: string; // Horario de la reserva
  restaurante: ObjectId; // ID del restaurante
  cliente: ObjectId; // ID del usuario que realiza la reserva
  numAdultos: number; // Número de adultos
  numNinos: number; // Número de niños menores de 10 años
}
