import { Document, ObjectId } from 'mongoose';

export interface IRestaurant extends Document {
  _id: ObjectId | string; // ID del restaurante
  nombre: string; // Nombre del restaurante
  direccion: string; // Dirección del restaurante
  pais: string;
  localidad: string; // Localidad donde se encuentra el restaurante
  codigoPostal: string;
  telefonos: string[];  // Lista de teléfonos de contacto
  emailContacto: string; // Email de contacto del restaurante
  logo: string; // URL de la imagen del logo
  galeriaFotos: string[]; // URLs de las imágenes de la galería
  calificacion: number;
  horarios: { // Lista de horarios de apertura y cierre por día
    dia: string;
    horaApertura: string;
    horaCierre: string;
  }[];
  capacidadMesas: { // Capacidad del restaurante en términos de mesas y personas por mesa
    cantidad: number;
    personasPorMesa: number;
  }[];
  menuComida: ObjectId[];  // IDs de los menús de comida relacionados
  menuBebidas: ObjectId[];  // IDs de los menús de bebidas relacionados
  menuPostres: ObjectId[];  // IDs de los menús de postres relacionados
  managers: ObjectId[]; // Managers del restaurante. Usuarios con rol {manager}
  estaAbierto: boolean;
  ultimaActualizacion: Date;
  longitud:number;
  latitud:number;
}
