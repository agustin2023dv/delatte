import express from 'express';
import { 
  createReservationController, 
  cancelReservationController, 
  updateReservationController, 
  getAllReservationsController, 
  getReservationByIdController, 
  getUserReservationsController 
} from '../controllers/reserva.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';
import { checkDisponibilidadMiddleware, validateReservationData } from '../middlewares/reservation.middleware'; 

const router = express.Router();

// Crear una reserva (solo clientes)
router.post(
  '/create-reservation',
  authMiddleware, // Verificar autenticación
  roleMiddleware(['customer']), // Solo clientes pueden crear
  validateReservationData, // Validar datos básicos
  checkDisponibilidadMiddleware, // Validar disponibilidad
  createReservationController // Crear la reserva
);

// Ver reservas propias (clientes y managers)
router.get(
  '/bookings',
  authMiddleware,
  roleMiddleware(['customer', 'manager']),
  getUserReservationsController
);

// Cancelar una reserva (clientes y managers)
router.put(
  '/cancelar/:id',
  roleMiddleware(['customer', 'manager']),
  authMiddleware,
  cancelReservationController
);

// Modificar una reserva (clientes y managers)
router.put(
  '/modificar/:id',
  authMiddleware,
  
  validateReservationData, // Validar datos antes de actualizar
  updateReservationController
);

// Traer todas las reservas (solo superadmins)
router.get(
  '/all-reservations',
  authMiddleware,
  roleMiddleware(['superadmin']),
  getAllReservationsController
);

// Buscar una reserva por ID (clientes, managers y superadmins)
router.get(
  '/:id',
  authMiddleware,
  getReservationByIdController
);

export default router;
