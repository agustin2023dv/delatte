import { Request, Response } from "express";
import {
  getUserAddressesService,
  addAddressService,
  removeAddressService,
} from "../services/address.service";

export const getUserAddressesController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    if (!userId) {
      return res.status(400).json({ message: "Usuario no autenticado" });
    }
    const addresses = await getUserAddressesService(userId);
    res.json(addresses);
  } catch (error: unknown) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const addAddressController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    if (!userId) {
      return res.status(400).json({ message: "Usuario no autenticado" });
    }

    const { address } = req.body;
    if (!address) {
      return res.status(400).json({ message: "La dirección es requerida" });
    }

    const updatedAddresses = await addAddressService(userId, address);
    res.status(201).json(updatedAddresses);
  } catch (error: unknown) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const removeAddressController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    if (!userId) {
      return res.status(400).json({ message: "Usuario no autenticado" });
    }

    const { address } = req.body;
    if (!address) {
      return res.status(400).json({ message: "La dirección es requerida" });
    }

    const updatedAddresses = await removeAddressService(userId, address);
    res.status(200).json(updatedAddresses);
  } catch (error: unknown) {
    res.status(500).json({ message: (error as Error).message });
  }
};
