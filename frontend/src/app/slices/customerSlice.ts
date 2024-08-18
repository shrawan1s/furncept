import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type CustomerState = {
    customers: any[];
    loading: boolean;
    error: string | null;
}

const initialState: CustomerState = {
    customers: [],
    loading: false,
    error: null,
};

export const fetchCustomers = createAsyncThunk(
    'customers/fetchCustomers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/getcustomer');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const createCustomer = createAsyncThunk(
    'customers/createCustomer',
    async (customerData, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/createcustomer', customerData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateCustomer = createAsyncThunk(
    'customers/updateCustomer',
    async ({ id, customerData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`/api/updatecustomer/${id}`, customerData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteCustomer = createAsyncThunk(
    'customers/deleteCustomer',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`/api/deletecustomer/${id}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCustomers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.customers = action.payload;
            })
            .addCase(fetchCustomers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(createCustomer.fulfilled, (state, action) => {
                state.customers.push(action.payload);
            })
            .addCase(updateCustomer.fulfilled, (state, action) => {
                const index = state.customers.findIndex((customer) => customer._id === action.payload._id);
                if (index !== -1) {
                    state.customers[index] = action.payload;
                }
            })
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                state.customers = state.customers.filter((customer) => customer._id !== action.meta.arg);
            });
    },
});

export default customerSlice.reducer;
