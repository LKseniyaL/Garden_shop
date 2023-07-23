import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    list: [],
    status: ''
};

export const fetchProductDescription = createAsyncThunk(
    'product/fetchProductDescription',
    async (id) => {
        const response = await fetch(`http://localhost:3333/products/${id}`)
        const data = await response.json();
        return data;
    }
)

const productDescriptionSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchProductDescription.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchProductDescription.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.list = action.payload;
        })
        .addCase(fetchProductDescription.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        })
    }
});

export default productDescriptionSlice.reducer;