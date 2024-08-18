import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type PackingDataState = {
    packingData: any[];
    loading: boolean;
    error: string | null;
}

const initialState: PackingDataState = {
    packingData: [],
    loading: false,
    error: null,
};

export const fetchPackingData = createAsyncThunk(
    'packingData/fetchPackingData',
    async (customerId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/getdata?customerId=${customerId}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const createPackingData = createAsyncThunk(
    'packingData/createPackingData',
    async (packingData, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/createdata', packingData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updatePackingData = createAsyncThunk(
    'packingData/updatePackingData',
    async ({ id, packingData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`/api/updatedata/${id}`, packingData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deletePackingData = createAsyncThunk(
    'packingData/deletePackingData',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`/api/deletedata/${id}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

const packingDataSlice = createSlice({
    name: 'packingData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPackingData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPackingData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.packingData = action.payload;
            })
            .addCase(fetchPackingData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(createPackingData.fulfilled, (state, action) => {
                state.packingData.push(action.payload);
            })
            .addCase(updatePackingData.fulfilled, (state, action) => {
                const index = state.packingData.findIndex((data) => data._id === action.payload._id);
                if (index !== -1) {
                    state.packingData[index] = action.payload;
                }
            })
            .addCase(deletePackingData.fulfilled, (state, action) => {
                state.packingData = state.packingData.filter((data) => data._id !== action.meta.arg);
            });
    },
});

export default packingDataSlice.reducer;
