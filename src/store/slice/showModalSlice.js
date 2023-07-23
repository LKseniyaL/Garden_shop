import { createSlice } from '@reduxjs/toolkit';

const  initialState = {
    list:[{showModal: false}]
}

export const showModalSlice = createSlice({
    name: 'showModalName',
    initialState,
    reducers: {
        setShowModal: (state, action) => {
            state.list[0].showModal = action.payload;
        },
    },
});

export const { setShowModal } = showModalSlice.actions;
export default showModalSlice.reducer;