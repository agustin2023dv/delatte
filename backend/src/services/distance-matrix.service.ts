import axios from 'axios';


const API_KEY = 'RY04slFBRNkONTJKGjDGHhtrtTSOWnvIUI1pVhdbIohUwxdA3z1O76d0OCgMzQ4Z';

const BASE_URL = 'https://api.distancematrix.ai/maps/api/geocode/json';

export const getCoordinatesFromAddress = async (address: string): Promise<{ latitude: number; longitude: number } | null> => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                address,
                key: API_KEY
            }
        });

        const data = response.data;
        console.log("API Response:", data); 

        // Verifica que `data.result` existe y tiene al menos un elemento
        if (data && data.result && data.result.length > 0) {
            const latitude = data.result[0].geometry.location.lat;
            const longitude = data.result[0].geometry.location.lng;
            return { latitude, longitude };
        } else {
            console.error("No se encontraron coordenadas para esta dirección:", data.status);
            throw new Error("No se pudieron obtener coordenadas para la dirección proporcionada.");
        }
    } catch (error) {
        console.error("Error al obtener las coordenadas:", error);
        throw error;
    }
};

