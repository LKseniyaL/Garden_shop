import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    list: []
};

export const fetchSaleMainItemSlice = createAsyncThunk(
    'sale/fetchSaleMainItemSlice',
    async () => {
        const response = await fetch('http://localhost:3333/products/all');
        const data = await response.json();
        const discountedProducts = data.filter(sale => sale.discont_price !== null);
        return discountedProducts;
    }
)

export const saleMainItemSlice = createSlice({
    name: 'sale',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchSaleMainItemSlice.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchSaleMainItemSlice.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.list = action.payload.slice(0, 3);
        })
        .addCase(fetchSaleMainItemSlice.rejected, (state, action) => {
            state.status = 'rejected';
            state.erroe = action.payload;
        })
    }
});

export default saleMainItemSlice.reducer;