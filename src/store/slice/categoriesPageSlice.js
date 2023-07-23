import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    list:[{}]
};

export const fetchCategory = createAsyncThunk(
    'categories/fetchCategory',
    async () => {
        const response = await fetch('http://localhost:3333/categories/all');
        const data = await response.json();
        return data;
    }
);

export const categoriesPageSlice = createSlice({
 name: 'categories',
 initialState,
 reducers: {},
 extraReducers: (builder) => {
    builder
    .addCase(fetchCategory.pending, (state) => {
        state.status = 'loading';
    })
    .addCase(fetchCategory.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.list = action.payload;
    })
    .addCase(fetchCategory.rejected, (state, action) => {
        state.atatus = 'rejected';
        state.error = action.payload;
    })
 }
});

export default categoriesPageSlice.reducer;