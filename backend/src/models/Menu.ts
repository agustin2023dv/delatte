import mongoose, { Schema } from 'mongoose';
import { IMenu } from '../../../shared/interfaces/IMenu';

const MenuSchema = new Schema<IMenu>({
  nombre: { type: String, required: true }, // Nombre del menú (ej. "Comida", "Bebidas")
  items: [{ // Lista de ítems en el menú
    nombre: { type: String, required: true }, // Nombre del ítem en el menú
    descripcion: { type: String }, // Descripción del ítem (opcional)
    precio: { type: Number, required: true } // Precio del ítem
  }]
});

export const Menu = mongoose.model<IMenu>('Menu', MenuSchema, 'menus'); // Crear el modelo de menú basado en el esquema
