export const validateSearchQuery = (query: string): boolean => {
    // Verifica que la consulta no esté vacía y que solo contenga letras, números y espacios
    const isValid = /^[a-zA-Z0-9\s]+$/.test(query);
    return isValid;
};