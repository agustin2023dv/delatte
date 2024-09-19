import express, { Request, Response } from 'express';
import usuarioRoutes from './src/routes/usuario.routes';
import { connectDB } from './db';
import cors from 'cors';

const app = express();
const port = 8081;

connectDB(); // Conectar a la base de datos

// Mostrar las variables de entorno del servicio SMTP para depuración
console.log({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE,
  user: process.env.SMTP_USER,
});

app.use(cors()); // Habilitar CORS para aceptar solicitudes desde otros dominios

app.use(express.json()); // Permitir recibir solicitudes en formato JSON

app.use('/api/users', usuarioRoutes); // Usar las rutas definidas para usuarios bajo el endpoint /api/users

app.listen(port, () => {
  // Confirmar que el servidor está corriendo y en qué puerto
  console.log(`App listening on port ${port}`);
});
