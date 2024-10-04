import axios from 'axios';
import { Customer, CustomerInput, CreateCustomerOutput, UpdateCustomerOutput } from '../utility/Customer';

// Base API URL
const BASE_CUSTOMER_URL = import.meta.env.VITE_BASE_CUSTOMER_URL;

// Axios instance
const api = axios.create({
    baseURL: BASE_CUSTOMER_URL,
});

// Create a new customer
export const createCustomer = async (data: CustomerInput): Promise<CreateCustomerOutput> => {
    try {
        const response = await api.post<CreateCustomerOutput>('/createcustomer', data);
        return response.data;
    } catch (error) {
        throw new Error(handleError(error));
    }
};

// Get all customers
export const getAllCustomers = async (): Promise<Customer[]> => {
    try {
        const response = await api.get<Customer[]>('/getallcustomers');
        return response.data;
    } catch (error) {
        throw new Error(handleError(error));
    }
};

// Update a customer by ID
export const updateCustomer = async (id: number, data: CustomerInput): Promise<UpdateCustomerOutput> => {
    try {
        const response = await api.put<UpdateCustomerOutput>(`/updatecustomer/${id}`, data);
        return response.data;
    } catch (error) {
        throw new Error(handleError(error));
    }
};

// Delete a customer by ID
export const deleteCustomer = async (id: number): Promise<{ message: string }> => {
    try {
        const response = await api.delete<{ message: string }>(`/deletecustomer/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(handleError(error));
    }
};

export const handleError = (error: any): string => {
    if (error.response) {
        // The request was made and the server responded with a status code
        return error.response.data.message || 'An error occurred';
    } else if (error.request) {
        // The request was made but no response was received
        return 'No response received from the server';
    } else {
        // Something happened in setting up the request that triggered an Error
        return error.message || 'An unexpected error occurred';
    }
};
