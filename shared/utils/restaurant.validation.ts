import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

// Validación mínima para la creación del restaurante (solo nombre y dirección)
const restaurantCreationSchema = Joi.object({
  nombre: Joi.string().min(3).required(),
  direccion: Joi.string().required(),
});

// Validación completa para la actualización del restaurante (todos los campos posibles)
const restaurantUpdateSchema = Joi.object({
  nombre: Joi.string().min(3).optional(),
  direccion: Joi.string().optional(),
  localidad: Joi.string().optional(),
  telefonos: Joi.array().items(Joi.string()).optional(),
  emailContacto: Joi.array().items(Joi.string().email()).optional(),
  logo: Joi.string().optional(),
  galeriaFotos: Joi.array().items(Joi.string()).optional(),
  horarios: Joi.array().items(
    Joi.object({
      dia: Joi.string().required(),
      horaApertura: Joi.string().required(),
      horaCierre: Joi.string().required(),
    })
  ).optional(),
  capacidadMesas: Joi.array().items(
    Joi.object({
      cantidad: Joi.number().required(),
      personasPorMesa: Joi.number().required(),
    })
  ).optional(),
  estaAbierto: Joi.boolean().optional(),
  ultimaActualizacion: Joi.date().optional(),
});

// Middleware de validación para la creación de un restaurante
export const validateRestaurantCreation = (req: Request, res: Response, next: NextFunction) => {
  const { error } = restaurantCreationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

// Middleware de validación para la actualización de un restaurante
export const validateRestaurantUpdate = (req: Request, res: Response, next: NextFunction) => {
  const { error } = restaurantUpdateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
