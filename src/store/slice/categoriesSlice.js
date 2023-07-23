    import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

    const initialState = {
        list: []
    };

    export const fetchCategories = createAsyncThunk(
        'categories/fetchCategories',
        async () => {
            const response = await fetch('http://localhost:3333/categories/all');
            const data = response.json();
            return data;
        }
    );

    export const categoriesSlice = createSlice({
        name: 'categories',
        initialState,
        reducers: {

        },
        extraReducers: (builder) => {
            builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.list = action.payload.slice(0, 4);
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            })
        },
    });

    export default categoriesSlice.reducer;