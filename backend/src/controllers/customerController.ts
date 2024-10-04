import { Request, Response } from 'express';
import Customer from '../model/customer';
import PackingData from '../model/packingData';

// Create a new customer
export const createCustomer = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body;
        const customer = await Customer.create({ name, email });
        res.status(201).json({ message: 'Customer created successfully', customer });
    } catch (error: any) {
        const message = error?.errors?.[0]?.message;
        res.status(500).json({ message });
    }
};

// Get a single customer by ID
export const getCustomer = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const customer = await Customer.findByPk(id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(customer);
    } catch (error: any) {
        const message = error?.errors?.[0]?.message || 'Failed to fetch customer';
        res.status(500).json({ message });
    }
};

// Get all customers
export const getAllCustomers = async (req: Request, res: Response) => {
    try {
        const customers = await Customer.findAll();
        res.status(200).json(customers);
    } catch (error: any) {
        const message = error?.errors?.[0]?.message || 'Failed to fetch customers';
        res.status(500).json({ message });
    }
};

// Update a customer by ID
export const updateCustomer = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const [updated] = await Customer.update(req.body, {
            where: { id },
        });
        if (updated) {
            const updatedCustomer = await Customer.findByPk(id);
            res.status(200).json({ message: 'Customer updated successfully', customer: updatedCustomer });
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    } catch (error: any) {
        const message = error?.errors?.[0]?.message || 'Failed to update customer';
        res.status(500).json({ message });
    }
};

// Delete a customer by ID
export const deleteCustomer = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        // Check if the customer has associated packing data
        const packingDataCount = await PackingData.count({
            where: { customerId: id },
        });

        if (packingDataCount > 0) {
            // If packing data exists, prevent deletion and send an error message
            return res.status(400).json({ message: 'Cannot delete customer. They have associated packing data.' });
        }

        // Proceed to delete the customer
        const deleted = await Customer.destroy({
            where: { id },
        });

        if (deleted) {
            return res.status(200).json({ message: 'Customer deleted successfully' });
        } else {
            return res.status(404).json({ message: 'Customer not found' });
        }
    } catch (error: any) {
        const message = error?.errors?.[0]?.message || 'Failed to delete customer';
        return res.status(500).json({ message });
    }
};
