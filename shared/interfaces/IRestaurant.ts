import { Document, ObjectId } from 'mongoose';

export interface IRestaurant extends Document {
  _id: ObjectId | string; // ID del restaurante
  nombre: string; // Nombre del restaurante
  direccion: string; // Dirección del restaurante
  pais: string; // País donde se encuentra el restaurante
  localidad: string; // Localidad donde se encuentra el restaurante
  codigoPostal: string; // Código postal
  telefonos: string[]; // Lista de teléfonos de contacto
  emailContacto: string; // Email de contacto del restaurante
  logo: string; // URL de la imagen del logo
  descripcion: string;
  galeriaFotos: string[]; // URLs de las imágenes de la galería
  calificacion: number; // Calificación del restaurante (1-5)
  horarios: { // Lista de horarios de apertura y cierre por día
    dia: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo'; // Día de la semana
    horaApertura: string; // Hora de apertura
    horaCierre: string; // Hora de cierre
  }[];
  capacidadMesas: { // Capacidad del restaurante en términos de mesas y personas por mesa
    cantidad: number; // Cantidad de mesas
    personasPorMesa: number; // Número de personas por mesa
  }[];
  menus: { // Menús relacionados (unificados en un solo atributo)
    tipo: 'Comida' | 'Bebidas' | 'Postres'; // Tipo de menú
    menuId: ObjectId; // ID del menú relacionado
  }[];
  managerPrincipal: ObjectId; // ID del manager principal
  coManagers: ObjectId[]; // IDs de los co-managers del restaurante
  estaAbierto: boolean; // Indica si el restaurante está operando
  ultimaActualizacion: Date; // Fecha de la última actualización de datos
  latitud: number; // Coordenada de latitud
  longitud: number; // Coordenada de longitud
  tags?: string[]; // Etiquetas opcionales para filtros avanzados
}
