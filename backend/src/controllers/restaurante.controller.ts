import { Request, Response } from 'express';
import {
  addPhotoToGalleryService,
  checkUserRoleInRestaurantService,
  getAllRestaurantsService,
  getGalleryPhotosService,
  getRestaurantDetailsService,
  getRestaurantsByManagerIdService,
  registerRestaurantService,
  removePhotoFromGalleryService,
  searchRestaurantsService,
  updateRestaurantService
} from '../services/restaurant.service';
import { registerManagerService } from '../services/user.service';
import { hashPasswordService } from '../services/auth.service';

//* Controlador para crear un nuevo restaurante y manager
export const registerRestaurantAndManagerController = async (req: Request, res: Response) => {
  try {
    console.log('Datos recibidos en el controlador:', req.body);

    const { restaurant: restaurantData, manager: managerData } = req.body;

    // Hashear la contraseña del usuario
    const hashedPassword = await hashPasswordService(managerData.password);
    managerData.password = hashedPassword;

    console.log('Restaurant details: ', restaurantData);
    console.log('Manager: ', managerData);

    // Guardar el manager
    const savedManager = await registerManagerService(managerData);

    // Asociar el manager principal al restaurante
    restaurantData.managerPrincipal = savedManager._id;

    // Guardar el restaurante
    const savedRestaurant = await registerRestaurantService(restaurantData);

    return res.status(201).json({ savedRestaurant, savedManager });
  } catch (error) {
    console.error('Error en el controlador:', error);
    return res.status(500).json({
      message: 'Error al registrar el restaurante y manager',
      error: error instanceof Error ? error.message : 'Error desconocido',
    });
  }
};

//* Controlador para obtener TODOS los restaurantes
export const getAllRestaurantsController = async (req: Request, res:Response)=>{
  try {
    const restaurants = await getAllRestaurantsService();
    if (!restaurants || restaurants.length === 0) { 
      return res.status(404).json({ message: 'No se encontraron restaurantes' });
    }
    return res.status(200).json(restaurants);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener restaurantes', error });
  }
}

//* Controlador para obtener los detalles de un restaurante
export const getRestaurantByIdController = async (req: Request, res: Response) => {
  try {
    const restaurant = await getRestaurantDetailsService(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurante no encontrado' });
    }
    return res.status(200).json(restaurant);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener el restaurante', error });
  }
};

//* Controlador para actualizar un restaurante
export const updateRestaurantController = async (req: Request, res: Response) => {
  try {
    const updatedRestaurant = await updateRestaurantService(req.params.id, req.body);
    if (!updatedRestaurant) {
      return res.status(404).json({ message: 'Restaurante no encontrado' });
    }
    return res.status(200).json(updatedRestaurant);
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar el restaurante', error });
  }
};

//*Controlador para obtener restaurantes a cargo de un manager
export const getRestaurantsByManagerIdController = async (req: Request, res: Response) => {
  try {
    const restaurants = await getRestaurantsByManagerIdService(req.params.userId);
    
    if (!restaurants) {
      return res.status(404).json({ message: 'No se encontraron restaurantes para este manager' });
    }

    return res.status(200).json(restaurants);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener los restaurantes', error });
  }
};

export const checkManagerRoleController = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = req.params;
    const userId = (req as any).user.id; 
    const isManager = await checkUserRoleInRestaurantService(restaurantId, userId);

    
    return res.status(200).json({ isManager });
  } catch (error) {
    console.error('Error verificando rol:', error);
    if (error === 'Restaurante no encontrado') {
      return res.status(404).json({ message: error });
    }
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};




export const getSearchResultsController = async (req: Request, res: Response) => {
  try {
      const query = req.query.q as string;

      // Llama a la función de validación
      if (!query /*|| !validateSearchQuery(query)*/) {
          return res.status(400).json({ message: 'Parámetro de búsqueda no válido' });
      }

      const results = await searchRestaurantsService(query);
      res.json(results);
  } catch (error) {
      console.error('Error en la búsqueda:', error);
      res.status(500).json({ message: 'Error en la búsqueda', error });
  }
};


// Obtener las fotos de la galería de un restaurante
export const getGalleryPhotosController = async (req: Request, res: Response) => {
  try {
    const { id: restaurantId } = req.params;
    const photos = await getGalleryPhotosService(restaurantId);
    return res.status(200).json({ success: true, photos });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

// Agregar una foto a la galería de un restaurante
export const addPhotoToGalleryController = async (req: Request, res: Response) => {
  try {
    const { id: restaurantId } = req.params;

    // Verificar si el archivo fue subido
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No se subió ninguna foto" });
    }

    const photoUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    const updatedGallery = await addPhotoToGalleryService(restaurantId, photoUrl);

    return res.status(200).json({ success: true, gallery: updatedGallery });
  } catch (error) {
    console.error("Error al agregar la foto:", error);
    return res.status(500).json({ success: false, message: "Error al agregar la foto a la galería" });
  }
};

// Eliminar una foto de la galería de un restaurante
export const removePhotoFromGalleryController = async (req: Request, res: Response) => {
  try {
    const { id: restaurantId } = req.params;
    const { photoUrl } = req.body;

    if (!photoUrl) {
      return res.status(400).json({ success: false, message: "URL de la foto es requerida" });
    }

    const updatedGallery = await removePhotoFromGalleryService(restaurantId, photoUrl);
    return res.status(200).json({ success: true, gallery: updatedGallery });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};