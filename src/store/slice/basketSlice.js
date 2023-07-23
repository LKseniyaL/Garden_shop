import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: []
};

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers:{
        addItem:(state, action) => {
            const target = state.list.find(({id}) => id === action.payload)
            if(target){
                target.basketCount++
            }else{
                state.list.push({id: action.payload, basketCount: 1});
            }
        },
        removeItem: (state, action) => {
            state.list = state.list.filter(({id}) => id !== action.payload);
        },
        productInc: (state, action) => {
            const target = state.list.find(({id}) => id === action.payload);
            if(target.basketCount){
                target.basketCount++
            }
        },
        product_dec: (state, action) => {
            const target = state.list.find(({id}) => id === action.payload);
            if(target.basketCount > 1){
                target.basketCount--
            }else{
                state.list = state.list.filter(({id}) => id !== action.payload);
            }
        }
    }
});

export const { addItem, removeItem, productInc, product_dec } = basketSlice.actions;
export default basketSlice.reducer;