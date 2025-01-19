import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

// Configurar dotenv con el path correcto
dotenv.config({ path: path.resolve(__dirname, '../backend/.env') });

console.log('MONGODB_URI desde .env:', process.env.MONGODB_URI);

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  console.error('No se ha proporcionado la URI de MongoDB en las variables de entorno');
  process.exit(1); // Terminar la ejecución si no se proporciona la URI de MongoDB
}

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI); // Intentar conectarse a MongoDB
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error conectándose a MongoDB:', error);
    process.exit(1); // Terminar la ejecución si ocurre un error en la conexión
  }
};
