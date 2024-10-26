import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { IReview } from "shared/interfaces/IReview";

const API_URL = 'http://localhost:8081/api/reviews';
  
  // Servicio para crear una review
  export const createReviewService = async (reviewData: Partial<IReview>) => {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.post(`${API_URL}/restaurants/${reviewData.restaurante}/reviews`, reviewData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
  

  