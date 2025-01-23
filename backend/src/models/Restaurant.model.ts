import mongoose, { Schema } from "mongoose";
import { IRestaurant } from "../../../shared/interfaces/IRestaurant";

const RestaurantSchema = new Schema<IRestaurant>({
  nombre: { type: String, required: true },
  direccion: { type: String, required: true },
  localidad: { type: String, default: "Montevideo" },
  pais: { type: String, default: "Uruguay" },
  codigoPostal: { type: String, required: true },
  telefono: { type: String, default: "No se agregó ningún teléfono" },
  emailContacto: { type: String, match: /.+\@.+\..+/ },
  logo: { type: String, default: "Logo restaurante" },
  descripcion: { type: String, default: "No hay descripción" },
  galeriaFotos: [{ type: String, default: [] }],
  calificacion: { type: Number, default: 1, min: 1, max: 5 },
  horarios: [
    {
      dia: { type: String, enum: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"], required: true },
      horaApertura: { type: String, required: true },
      horaCierre: { type: String, required: true },
    },
  ],
  capacidadMesas: [
    {
      cantidad: { type: Number, default: 1 },
      personasPorMesa: { type: Number, default: 2 },
    },
  ],
  menus: [
    {
      tipo: { type: String, enum: ["Comida", "Bebidas", "Postres"], required: true },
      items: [
        {
          nombre: { type: String, required: true },
          descripcion: { type: String, required: true },
          precio: { type: Number, required: true },
        },
      ],
    },
  ],
  managerPrincipal: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  coManagers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
  estaAbierto: { type: Boolean, default: true },
  ultimaActualizacion: { type: Date, default: Date.now },
  ubicacion: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  tags: [{ type: String }],
});

// Índice geoespacial para `ubicacion`
RestaurantSchema.index({ ubicacion: "2dsphere" });

RestaurantSchema.index({ localidad: 1 });
RestaurantSchema.index({ calificacion: -1 });
RestaurantSchema.index({ estaAbierto: 1 });

const Restaurant = mongoose.model<IRestaurant>('Restaurant', RestaurantSchema, 'restaurantes'); 
export default Restaurant;
