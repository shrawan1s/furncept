import { Request, Response } from 'express';
import Customer from '../model/customer';

// Create a new customer
export const createCustomer = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body;
        const customer = await Customer.create({
            name,
            email
        });
        res.status(201).json(customer);
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to create customer', error: error.errors[0].message });
    }
};

// Get a customer
export const getCustomer = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const customer = await Customer.findByPk(id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(customer);
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to fetch customer', error: error.errors[0].message });
    }
};

// Get all customers
export const getAllCustomers = async (req: Request, res: Response) => {
    try {
        const customers = await Customer.findAll();
        res.status(200).json(customers);
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to fetch customers', error: error.errors[0].message });
    }
};

// Update a customer
export const updateCustomer = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const updated = await Customer.update(req.body, {
            where: { id },
        });
        res.status(200).json(updated);
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to update customer', error: error.errors[0].message });
    }
};

// Delete a customer
export const deleteCustomer = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deleted = await Customer.destroy({
            where: { id },
        });
        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to delete customer', error: error.errors[0].message });
    }
};
