import { Request, Response } from 'express';
import Customer from '../model/customer';

// Create a new customer
export const createCustomer = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body;
        const customer = new Customer({
            name,
            email,
            packingData: [], // Initialize packingData as an empty array
        });
        await customer.save();
        res.status(201).json(customer);
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to create customer', error });
    }
};

// Get a customer
export const getCustomers = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const customers = await Customer.findById(id).select("-_id");
        res.status(200).json(customers);
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to fetch customers', error });
    }
};

// Get all customer
export const getAllCustomers = async (req: Request, res: Response) => {
    try {
        const customers = await Customer.find().select("-_id");
        res.status(200).json(customers);
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to fetch customers', error });
    }
};

// Update a customer
export const updateCustomer = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedCustomer = await Customer.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );
        if (!updatedCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(updatedCustomer);
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to update customer', error });
    }
};

// Delete a customer
export const deleteCustomer = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedCustomer = await Customer.findByIdAndDelete(id);
        if (!deletedCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to delete customer', error });
    }
};
