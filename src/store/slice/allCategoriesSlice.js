import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    list:[{}]
};

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async () => {
        const response = await fetch('http://localhost:3333/categories/all');
        const data = await response.json();
        return data;
    }
);

export const allCategoriesSlice = createSlice({
 name: 'categories',
 initialState,
 reducers: {},
 extraReducers: (builder) => {
    builder
    .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
    })
    .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.list = action.payload;
    })
    .addCase(fetchCategories.rejected, (state, action) => {
        state.atatus = 'rejected';
        state.error = action.payload;
    })
 }
});

export default allCategoriesSlice.reducer;