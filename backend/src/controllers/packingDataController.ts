import { Request, Response } from 'express';
import mongoose from 'mongoose';
import PackingData from '../model/packingData';
import Customer from '../model/customer';

// Add packing data to a customer
export const createPackingData = async (req: Request, res: Response) => {
    try {
        const { customerId, packingData } = req.body;

        // Create a new packing data instance
        const newPackingData = new PackingData({
            ...packingData,
            customer: new mongoose.Types.ObjectId(customerId) // Ensure customerId is an ObjectId
        });

        await newPackingData.save();

        // Find the customer and update their packingData array
        const customerData = await Customer.findById(customerId);

        if (customerData) {
            // Add the new PackingData's ID to the customer's packingData array
            customerData.packingData.push(newPackingData._id as mongoose.Types.ObjectId);
            await customerData.save();  // Save the updated customer
            return res.status(201).json(newPackingData);
        } else {
            return res.status(404).json({ message: 'Customer not found' });
        }
    } catch (error: any) {
        console.error('Error in createPackingData:', error); // Improved error logging
        return res.status(500).json({ message: 'Failed to add packing data', error: error.message });
    }
};

// Get all packing data for a specific customer
export const getPackingData = async (req: Request, res: Response) => {
    try {
        const { customerId } = req.params;

        // Fetch all packing data for the given customer
        const packingData = await PackingData.find({ customer: customerId });

        if (!packingData.length) {
            return res.status(404).json({ message: 'No packing data found for this customer' });
        }

        res.status(200).json(packingData);
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to fetch packing data', error: error.message });
    }
};

// Update packing data
export const updatePackingData = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedPackingData = await PackingData.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );

        if (!updatedPackingData) {
            return res.status(404).json({ message: 'Packing data not found' });
        }

        res.status(200).json(updatedPackingData);
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to update packing data', error: error.message });
    }
};

// Delete packing data
export const deletePackingData = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedPackingData = await PackingData.findByIdAndDelete(id);

        if (!deletedPackingData) {
            return res.status(404).json({ message: 'Packing data not found' });
        }

        res.status(200).json({ message: 'Packing data deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to delete packing data', error: error.message });
    }
};
