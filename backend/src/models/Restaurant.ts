import mongoose, { Schema } from 'mongoose';
import { IRestaurant } from '../../../shared/interfaces/IRestaurant';

const RestaurantSchema = new Schema<IRestaurant>({
  nombre: { type: String, required: true }, // Nombre del restaurante
  direccion: { type: String, required: true }, // Dirección del restaurante
  localidad: { type: String, required: true }, // Localidad o ciudad del restaurante
  telefonos: [{ type: String, required: true }], // Lista de teléfonos de contacto del restaurante
  emailContacto: { type: String, required: true }, // Correo electrónico de contacto
  horarios: [{ // Lista de horarios de apertura y cierre por día
    dia: { type: String, required: true },
    horaApertura: { type: String, required: true },
    horaCierre: { type: String, required: true }
  }],
  capacidadMesas: [{ // Capacidad del restaurante, definido por mesas y personas por mesa
    cantidad: { type: Number, required: true },
    personasPorMesa: { type: Number, required: true }
  }],
  menuComida: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }],  // Relación con el modelo de menú de comidas
  menuBebidas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }], // Relación con el modelo de menú de bebidas
  menuPostres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }],  // Relación con el modelo de menú de postres
  managers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Relación con el modelo de User para los managers
});

export const Restaurant = mongoose.model<IRestaurant>('Restaurant', RestaurantSchema, "restaurantes"); // Crear el modelo de restaurante basado en el esquema
