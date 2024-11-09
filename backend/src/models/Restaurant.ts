import mongoose, { Schema } from 'mongoose';
import { IRestaurant } from '../../../shared/interfaces/IRestaurant';

const RestaurantSchema = new Schema<IRestaurant>({
  nombre: { type: String }, // Nombre del restaurante
  direccion: { type: String }, // Dirección del restaurante (calle y altura)
  localidad: { type: String, default: 'Montevideo' }, // Localidad o ciudad del restaurante
  pais:{type: String, default: 'Uruguay'},
  codigoPostal: { type: String, required: true }, // Código postal
  telefonos: [{ type: String, default: [] }], // Lista de teléfonos de contacto del restaurante
  emailContacto: { type: String }, // Correo electrónico de contacto
  logo: { type: String , default:'Logo restaurante' }, // URL de la imagen del logo
  galeriaFotos: [{ type: String , default: [] }], // Array de URLs de la galería de fotos
  calificacion: { type: Number, default: 1, min: 1, max: 5 },
  horarios: [{ // Lista de horarios de apertura y cierre por día
    dia: { type: String },
    horaApertura: { type: String },
    horaCierre: { type: String }
  }],
  capacidadMesas: [{ // Capacidad del restaurante, definido por mesas y personas por mesa
    cantidad: { type: Number, default: 1 },
    personasPorMesa: { type: Number, default: 2 }
  }],
  menuComida: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu', default: [] }],  // Relación con el modelo de menú de comidas
  menuBebidas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu', default: [] }], // Relación con el modelo de menú de bebidas
  menuPostres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu', default: [] }],  // Relación con el modelo de menú de postres
  managers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }], // Relación con el modelo de User para los managers
  estaAbierto: { type: Boolean, default: true }, // Indica si el restaurante está operando o no
  ultimaActualizacion: { type: Date, default: Date.now }, // Fecha de la última actualización de datos
  latitud: { type: Number, default: 1}, // Coordenada de latitud
  longitud: { type: Number, default:1 } // Coordenada de longitud
});

export const Restaurant = mongoose.model<IRestaurant>('Restaurant', RestaurantSchema, "restaurantes"); // Crear el modelo de restaurante basado en el esquema
