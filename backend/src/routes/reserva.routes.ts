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
import { validateReservationData } from '../middlewares/reservation.middleware'; 
const router = express.Router();

// Route para CREAR una reserva (solo clientes)
router.post(
  '/create-reservation',
  authMiddleware, // Verificar que el usuario esté autenticado
  roleMiddleware(['customer']), // Verificar que el rol sea 'customer'
  validateReservationData, // Validar los datos de la reserva
  createReservationController // Controlador que crea la reserva
);

// Route para ver reservas propias (clientes y managers)
router.get(
  '/bookings',
  authMiddleware,
  roleMiddleware(['customer', 'manager']),
  getUserReservationsController
);

// Route para CANCELAR una reserva (pueden cancelar tanto el cliente como el manager)
router.put(
  '/cancelar/:id',
  authMiddleware,
  cancelReservationController
);

// Route para MODIFICAR una reserva (clientes y managers pueden modificar las reservas)
router.put(
  '/modificar/:id',
  authMiddleware,
  roleMiddleware(['customer', 'manager']),
  validateReservationData, // Validar los datos antes de modificar la reserva
  updateReservationController
);

// Route para TRAER TODAS las reservas (solo superadmins)
router.get(
  '/all-reservations',
  authMiddleware,
  roleMiddleware(['superadmin']),
  getAllReservationsController
);

// Route para BUSCAR una reserva por ID (clientes, managers y superadmins pueden buscar)
router.get(
  '/:id',
  authMiddleware,
  getReservationByIdController
);

export default router;
