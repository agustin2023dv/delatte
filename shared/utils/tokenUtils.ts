import Token from '../../backend/src/models/token.model';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET ;

// **Función para generar un token**
export const generateToken = async (userId: mongoose.Types.ObjectId, expiresIn: string = '24h') => {
    if(SECRET_KEY){
        try{
            const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn });

            // Almacenar el token en la base de datos
            await new Token({ userId, token }).save();
          
            return token;
        }catch (error) {
            throw new Error('Token inválido o expirado');
          }
        
    }
  
};

// **Función para verificar un token**
export const verifyToken = async (token: string) => {
    if(SECRET_KEY){
    try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (error) {
    throw new Error('Token inválido o expirado');
  }}
};

// **Función para invalidar un token**
export const invalidateToken = async (token: string) => {
  await Token.deleteOne({ token });
};

// **Función para decodificar un token (sin verificar)**
export const decodeToken = (token: string) => {
  return jwt.decode(token);
};