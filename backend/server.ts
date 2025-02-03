import 'dotenv/config';
import 'module-alias/register';
import express, { Request, Response, NextFunction } from 'express';
import profileRoutes from './src/routes/profile.routes';
import restaurantRoutes from './src/routes/restaurante.routes';
import reservationRoutes from './src/routes/reserva.routes';
import favoritesRoutes from './src/routes/favorites.routes';
import addressesRoutes from './src/routes/addresses.routes';
import reviewRoutes from './src/routes/resena.routes';
import authRoutes from './src/routes/auth.routes';
import { connectDB } from './db';
import cors from 'cors';
import path from 'path';

const app = express();
const port = process.env.SERVER_PORT || 8081; // Usa un puerto dinámico si está disponible

// Conectar a la base de datos
connectDB();

// Mostrar las variables de entorno del servicio SMTP para depuración (solo en desarrollo)
if (process.env.NODE_ENV !== 'production') {
  console.log({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE,
    user: process.env.SMTP_USER,
  });
}


const corsOptions = {
  origin: ['http://localhost:8082', 'http://192.168.1.24:8082'], // Permitir solicitudes desde el frontend
  methods: 'GET,POST,PUT,DELETE', // Métodos permitidos
  credentials: true, 
};

app.get('/', (req: Request, res: Response) => {
  res.send('Servidor funcionando correctamente.');
});

// Middlewares globales
app.use(cors(corsOptions)); // Habilitar CORS para aceptar solicitudes desde otros dominios


app.use(express.json()); // Permitir recibir solicitudes en formato JSON

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Definir las rutas
app.use('/api/profile', profileRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/restaurantes', restaurantRoutes);
app.use('/api/reservas', reservationRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/addresses', addressesRoutes);

// Middleware para manejar errores globales con tipado
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});


// Iniciar el servidor
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
