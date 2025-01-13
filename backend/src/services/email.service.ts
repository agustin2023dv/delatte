import { EmailOptions } from '../../../shared/interfaces/IEmailOptions';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { google } from 'googleapis';

dotenv.config();

// Configuración de OAuth2
const OAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URI
);


OAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});


export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
port: 587,
secure: false,
  auth: {
    type: 'OAuth2',
    user: process.env.SMTP_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    accessToken: async () => {
      try {
        const { token } = await OAuth2Client.getAccessToken();
        return token || '';
      } catch (error) {
        console.error('Error al obtener el token de acceso:', error);
        throw new Error('Error al obtener el token de acceso');
      }
    },
  },
}as nodemailer.TransportOptions);


// Verificar si la configuración del transporter es correcta
transporter.verify((error, success) => {
  if (error) {
    console.error('Error al configurar el transporter de Nodemailer:', error);
  } else {
    console.log('El transporter de Nodemailer está listo para enviar correos');
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
