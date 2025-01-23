import { EmailOptions } from '../../../shared/interfaces/IEmailOptions';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

console.log('SMTP_HOST:', process.env.SMTP_HOST);
console.log('SMTP_PORT:', process.env.SMTP_PORT);
console.log('SMTP_USER:', process.env.SMTP_USER);
console.log('SMTP_PASSWORD:', process.env.SMTP_PASSWORD);


// Configurar el transporter de Nodemailer con contraseña de aplicación
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD, // Contraseña de aplicación generada
  },
});

// Verificar si la configuración del transporter es correcta
transporter.verify((error, success) => {
  if (error) {
    console.error('Error al configurar el transporter de Nodemailer:', error);
  } else {
    console.log('El transporter de Nodemailer está listo para enviar correos', success);
  }
});

export const sendEmailService = async (options: EmailOptions) => {
  const mailOptions = {
    from: options.from || `"Soporte" <${process.env.SMTP_USER}>`,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error al enviar correo:', error);
    throw error;
  }
};

export const sendVerificationEmailService = async (nombre: string, email: string, emailToken: string) => {
  const verificationLink = `http://localhost:8081/api/users/verify-email?token=${emailToken}`;

  try {
    await sendEmailService({
      to: email,
      subject: 'Verifica tu email',
      text: `Hola ${nombre},\n\nPor favor verifica tu cuenta haciendo clic en el siguiente enlace: ${verificationLink}`,
      html: `<h1>Hola ${nombre}!</h1><p>Por favor verifica tu cuenta haciendo clic en el siguiente enlace:</p><a href="${verificationLink}">Verificar Email</a>`,
    });
  } catch (error) {
    console.error('Error al enviar el correo de verificación:', error);
    throw new Error('Error al enviar el correo de verificación');
  }
};
