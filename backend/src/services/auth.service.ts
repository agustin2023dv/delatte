import bcrypt from 'bcrypt';

const saltRounds = 10; // Número de rondas para generar el salt

export const hashPassword = async (password: string): Promise<string> => {
  // Hashear la contraseña utilizando bcrypt con el número de rondas de salt
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword; // Devolver la contraseña hasheada
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  // Comparar la contraseña proporcionada con la almacenada hasheada
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch; // Devolver si la comparación fue exitosa o no
};
