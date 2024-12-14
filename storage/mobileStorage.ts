import * as SecureStore from 'expo-secure-store';

export const setItem = async (key: string, value: string) => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.error(`Error al almacenar el valor para la clave ${key}:`, error);
  }
};

// Función para obtener un ítem desde SecureStore
export const getItem = async (key: string): Promise<string | null> => {
  try {
    const value = await SecureStore.getItemAsync(key);
    if (!value) {
      console.warn(`No se encontró ningún valor para la clave ${key}`);
    }
    return value;
  } catch (error) {
    console.error(`Error al obtener el valor para la clave ${key}:`, error);
    return null;
  }
};

// Función para eliminar un ítem desde SecureStore
export const removeItem = async (key: string) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error(`Error al eliminar el valor para la clave ${key}:`, error);
  }
};