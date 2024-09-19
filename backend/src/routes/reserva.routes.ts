import express from 'express';
import { createReservationController, getUserReservationsController, getReservationByIdController } from '../controllers/reserva.controller';
import {authMiddleware} from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/reservas', authMiddleware, createReservationController);
router.get('/reservas/:userId', authMiddleware, getUserReservationsController);
router.get('/reservas/detalle/:id', authMiddleware, getReservationByIdController);

export default router;
