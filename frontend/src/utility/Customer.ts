// Define the input type for creating/updating a customer
export type CustomerInput = {
    name: string;
    email?: string;
};

// Define the customer data structure
export type Customer = {
    id: number;
    name: string;
    email?: string;
    createdAt: string;
    updatedAt: string;
};

// Output type for creating a customer
export type CreateCustomerOutput = {
    message: string;
    customer: Customer;
};

// Output type for getting a customer
export type GetCustomerOutput = Customer;

// Output type for getting all customers
export type GetAllCustomersOutput = Customer[];

// Output type for updating a customer
export type UpdateCustomerOutput = {
    customer: Customer;
    message: string;
};

// Output type for deleting a customer
export type DeleteCustomerOutput = {
    message: string;
};

export type CustomerState = {
    customers: Customer[];
    message: string;
}

export const initialState: CustomerState = {
    customers: [],
    message: ""
};