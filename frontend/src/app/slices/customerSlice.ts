// store/customerSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Customer, CustomerInput, CreateCustomerOutput, UpdateCustomerOutput, DeleteCustomerOutput } from '../../utility/Customer';
import { initialState } from "../../utility/Customer"
import {
    createCustomer as apiCreateCustomer,
    getAllCustomers as apiGetAllCustomers,
    updateCustomer as apiUpdateCustomer,
    deleteCustomer as apiDeleteCustomer,
    handleError,
} from '../../api/customer';
import { toast } from 'react-toastify';

// Async actions
export const createCustomer = createAsyncThunk(
    'customer/create',
    async (data: CustomerInput, { rejectWithValue }) => {
        try {
            const response: CreateCustomerOutput = await apiCreateCustomer(data);
            return {
                customer: response.customer,
                message: response.message,
            }
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

export const getAllCustomers = createAsyncThunk(
    'customer/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const customers: Customer[] = await apiGetAllCustomers();
            return customers;
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

export const updateCustomer = createAsyncThunk(
    'customer/update',
    async ({ id, data }: { id: number; data: CustomerInput }, { rejectWithValue }) => {
        try {
            const response: UpdateCustomerOutput = await apiUpdateCustomer(id, data);
            return {
                customer: response.customer,
                message: response.message,
                id
            };
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

export const deleteCustomer = createAsyncThunk(
    'customer/delete',
    async (id: number, { rejectWithValue }) => {
        try {
            const response: DeleteCustomerOutput = await apiDeleteCustomer(id);
            return {
                message: response.message,
                id
            };
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// Create slice
const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Create customer
            .addCase(createCustomer.fulfilled, (state, action) => {
                state.customers.push(action.payload.customer);
                toast.success(action.payload.message);
            })
            .addCase(createCustomer.rejected, (state, action) => {
                state.message = action.payload as string;
                toast.error(action.payload as string);
            })

            // Get all customers
            .addCase(getAllCustomers.fulfilled, (state, action) => {
                state.customers = action.payload;
            })
            .addCase(getAllCustomers.rejected, (state, action) => {
                state.message = action.payload as string;
                toast.error(action.payload as string);
            })

            // Update customer
            .addCase(updateCustomer.fulfilled, (state, action) => {
                const updatedCustomers = action.payload.customer;
                if (updatedCustomers) {
                    state.customers = state.customers.map(customer =>
                        customer.id === updatedCustomers.id ? updatedCustomers : customer
                    );
                }
                state.message = action.payload.message;
                toast.success(action.payload.message);
            })
            .addCase(updateCustomer.rejected, (state, action) => {
                state.message = action.payload as string;
                toast.error(action.payload as string);
            })

            // Delete customer
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                state.customers = state.customers.filter(customer => customer.id !== action.payload.id);
                toast.success(action.payload.message);
            })
            .addCase(deleteCustomer.rejected, (state, action) => {
                state.message = action.payload as string;
                toast.error(action.payload as string);
            });
    },
});

// Export reducer
export default customerSlice.reducer;
