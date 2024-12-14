
// A MEJORAR --> SE DEBERIA ENCRIPTAR
export const setItem = (key: string, value: string) => {
  sessionStorage.setItem(key, value);
};

export const getItem = (key: string): string | null => {
  return sessionStorage.getItem(key);
};

export const removeItem = (key: string) => {
  sessionStorage.removeItem(key);
};
