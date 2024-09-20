import { Request, Response } from 'express';
import PackingData from '../model/packingData';

// Add packing data to a customer
export const createPackingData = async (req: Request, res: Response) => {
    try {
        const { customerId, packingData } = req.body;

        // Create a new packing data instance
        const newPackingData = await PackingData.create({
            ...packingData,
            customerId,
        });

        return res.status(201).json(newPackingData);
    } catch (error: any) {
        return res.status(500).json({ message: 'Failed to add packing data', error: error.message });
    }
};

// Get all packing data for a specific customer
export const getPackingData = async (req: Request, res: Response) => {
    try {
        const { customerId } = req.params;

        const packingData = await PackingData.findAll({ where: { customerId } });

        res.status(200).json(packingData);
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to fetch packing data', error: error.message });
    }
};

// Update packing data
export const updatePackingData = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await PackingData.update(req.body, {
            where: { id },
        });

        res.status(200).json({ message: 'Packing data updated successfully' });
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to update packing data', error: error.message });
    }
};

// Delete packing data
export const deletePackingData = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await PackingData.destroy({
            where: { id },
        });

        res.status(200).json({ message: 'Packing data deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to delete packing data', error: error.message });
    }
};
