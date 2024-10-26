import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import sanitizeHtml from 'sanitize-html';

// Middleware de validación para la creación de reviews
export const validateReview = [
  // Validación y sanitización de la calificación
  body('calificacion')
    .isInt({ min: 1, max: 5 })
    .withMessage('La calificación debe ser un número entero entre 1 y 5')
    .toInt(), // Convertir a número entero

  // Validación y sanitización del comentario
  body('comentario')
    .isString()
    .trim() // Eliminar espacios en blanco al inicio y final
    .escape() // Escapar caracteres especiales para evitar inyección de código
    .customSanitizer((value) => sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} })) // Sanitizar para eliminar HTML potencialmente peligroso
    .isLength({ min: 5 })
    .withMessage('El comentario debe tener al menos 5 caracteres'),

  // Verificación del restaurante (viene de la URL)
  (req: Request, res: Response, next: NextFunction) => {
    const restaurantId = req.params.restauranteId; // ID del restaurante desde la URL
    if (!restaurantId || !restaurantId.match(/^[0-9a-fA-F]{24}$/)) { // Verificar si es un ObjectId válido
      return res.status(400).json({ message: 'El ID del restaurante es inválido' });
    }
    next();
  },


  // Manejo de los errores de validación
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];


export const validateReviewUpdate = [
    body('calificacion')
      .optional()
      .isInt({ min: 1, max: 5 })
      .withMessage('La calificación debe ser un número entero entre 1 y 5')
      .toInt(),
  
    body('comentario')
      .optional()
      .isString()
      .trim()
      .escape()
      .isLength({ min: 5 })
      .withMessage('El comentario debe tener al menos 5 caracteres'),
  
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
  