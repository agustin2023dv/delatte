import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { EmailOptions } from '../../../shared/interfaces/IEmailOptions';

dotenv.config();

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Usar STARTTLS en lugar de una conexión SSL directa
  auth: {
    user: 'agustin.fernandez02@davinci.edu.ar', // Usuario de autenticación para el servidor SMTP
    pass: 'xvblqcgniocqztmz', // Contraseña de autenticación para el servidor SMTP
  },
});

// Verificar si la configuración del transporter es correcta
transporter.verify(function (error, success) {
  if (error) {
    console.error('Error al configurar el transporter de Nodemailer:', error);
  } else {
    console.log('El transporter de Nodemailer está listo para enviar correos');
  }
});

export const sendEmail = async (options: EmailOptions) => {
  // Configurar los detalles del correo electrónico
  const mailOptions = {
    from: options.from || `"Soporte" <${process.env.SMTP_USER}>`, // Usar el remitente proporcionado o el configurado por defecto
    to: options.to, // Destinatario del correo
    subject: options.subject, // Asunto del correo
    text: options.text, // Cuerpo del correo en texto plano
    html: options.html, // Cuerpo del correo en formato HTML
  };

  try {
    const info = await transporter.sendMail(mailOptions); // Enviar el correo electrónico
    console.log('Correo enviado: %s', info.messageId);
    return info; // Devolver información del correo enviado
  } catch (error) {
    console.error('Error al enviar correo:', error);
    throw error; // Lanzar error si falla el envío del correo
  }
};
