import { Request, Response, NextFunction } from 'express';

// Función de validación para la creación de un restaurante
export const validateRestaurantCreation = (req: Request, res: Response, next: NextFunction) => {
  const { nombre, direccion } = req.body;

  // Validaciones mínimas para creación
  if (!nombre || typeof nombre !== 'string' || nombre.length < 3) {
    return res.status(400).json({ message: 'El nombre es obligatorio y debe tener al menos 3 caracteres.' });
  }

  if (!direccion || typeof direccion !== 'string') {
    return res.status(400).json({ message: 'La dirección es obligatoria y debe ser una cadena de texto.' });
  }

  next();
};

// Función de validación para la actualización de un restaurante
export const validateRestaurantUpdate = (req: Request, res: Response, next: NextFunction) => {
  const { 
    nombre, 
    direccion, 
    localidad, 
    telefonos, 
    emailContacto, 
    logo, 
    galeriaFotos, 
    horarios, 
    capacidadMesas, 
    estaAbierto, 
    ultimaActualizacion 
  } = req.body;

  // Validaciones opcionales
  if (nombre && (typeof nombre !== 'string' || nombre.length < 3)) {
    return res.status(400).json({ message: 'El nombre debe ser una cadena de texto con al menos 3 caracteres.' });
  }

  if (direccion && typeof direccion !== 'string') {
    return res.status(400).json({ message: 'La dirección debe ser una cadena de texto.' });
  }

  if (localidad && typeof localidad !== 'string') {
    return res.status(400).json({ message: 'La localidad debe ser una cadena de texto.' });
  }

  if (telefonos && (!Array.isArray(telefonos) || telefonos.some(t => typeof t !== 'string'))) {
    return res.status(400).json({ message: 'Los teléfonos deben ser un array de cadenas de texto.' });
  }

  if (emailContacto && (!Array.isArray(emailContacto) || emailContacto.some(e => typeof e !== 'string' || !e.includes('@')))) {
    return res.status(400).json({ message: 'Los emails de contacto deben ser un array de direcciones de correo válidas.' });
  }

  if (logo && typeof logo !== 'string') {
    return res.status(400).json({ message: 'El logo debe ser una cadena de texto.' });
  }

  if (galeriaFotos && (!Array.isArray(galeriaFotos) || galeriaFotos.some(f => typeof f !== 'string'))) {
    return res.status(400).json({ message: 'La galería de fotos debe ser un array de cadenas de texto.' });
  }

  if (horarios && (!Array.isArray(horarios) || horarios.some(h => 
    typeof h !== 'object' || 
    typeof h.dia !== 'string' || 
    typeof h.horaApertura !== 'string' || 
    typeof h.horaCierre !== 'string'
  ))) {
    return res.status(400).json({ message: 'Los horarios deben ser un array de objetos con los campos "dia", "horaApertura" y "horaCierre" como cadenas de texto.' });
  }

  if (capacidadMesas && (!Array.isArray(capacidadMesas) || capacidadMesas.some(c => 
    typeof c !== 'object' || 
    typeof c.cantidad !== 'number' || 
    typeof c.personasPorMesa !== 'number'
  ))) {
    return res.status(400).json({ message: 'La capacidad de mesas debe ser un array de objetos con "cantidad" y "personasPorMesa" como números.' });
  }

  if (estaAbierto !== undefined && typeof estaAbierto !== 'boolean') {
    return res.status(400).json({ message: 'El campo "estaAbierto" debe ser un valor booleano.' });
  }

  if (ultimaActualizacion && isNaN(Date.parse(ultimaActualizacion))) {
    return res.status(400).json({ message: 'La última actualización debe ser una fecha válida.' });
  }

  next();
};
