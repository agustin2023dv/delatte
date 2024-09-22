import { Document, ObjectId } from 'mongoose';

export interface IMenu extends Document {
  nombre: string; // Nombre del menú (ej. "Comida", "Bebidas")
  items: { // Lista de ítems dentro del menú
    nombre: string; // Nombre del ítem (ej. "Pizza", "Refresco")
    descripcion: string; // Descripción del ítem
    precio: number; // Precio del ítem
  }[];
}
