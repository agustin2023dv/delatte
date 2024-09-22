export interface EmailOptions {
  from?: string; // Remitente opcional del correo, si no se proporciona se usa el valor por defecto
  to: string; // Destinatario del correo
  subject: string; // Asunto del correo
  text?: string; // Cuerpo del correo en texto plano (opcional)
  html?: string; // Cuerpo del correo en formato HTML (opcional)
}
