    import { createSlice } from "@reduxjs/toolkit";

    // const write = (data) => {
    //     localStorage.setItem('basket', JSON.stringify(data));
    // };

    // const read = () => {
    //     return JSON.parse(localStorage.getItem('basket'));
    // };

    // const initialState = read() ?? { list: [] };

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
                // write(state);
            },
            removeItem: (state, action) => {
                state.list = state.list.filter(({id}) => id !== action.payload);
                // write(state);
            },
            productInc: (state, action) => {
                const target = state.list.find(({id}) => id === action.payload);
                if(target.basketCount){
                    target.basketCount++
                }
                // write(state);
            },
            product_dec: (state, action) => {
                const target = state.list.find(({id}) => id === action.payload);
                if(target.basketCount > 1){
                    target.basketCount--
                }else{
                    state.list = state.list.filter(({id}) => id !== action.payload);
                }
                // write(state);
            }
        }
    });

    export const { addItem, removeItem, productInc, product_dec } = basketSlice.actions;
    export default basketSlice.reducer;