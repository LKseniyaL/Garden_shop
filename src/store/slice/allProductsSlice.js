import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    list:[],
    status: 'loading',
    visibleProducts: 8,
};

export const fetchProduct = createAsyncThunk(
    'products/fetchProduct',
    async () => {
        const respons = await fetch('http://localhost:3333/products/all');
        const data = await respons.json();
        const productsWithShowItem = data.map(product => {
            return {...product, show_item: true};
        });
        return productsWithShowItem;
    }
);

const calculateNewPrice = (price, discont_price) => {
    return discont_price ? (price - (price * discont_price / 100)).toFixed(2) : price;
};

const calculateShowItem = (item, minValue, maxValue) => {
    const newPrice = calculateNewPrice(item.price, item.discont_price);
    return newPrice >= minValue && newPrice <= maxValue;
};

const allProductsSlice = createSlice({
    name: 'products',
    initialState,
    reducers:{
        showMoreProducts(state, action){
            state.visibleProducts = action.payload;
        },
        showDiscount(state, action) {
            const showItemValue = action.payload ? true : false;
            if (action.payload) {
              state.list.forEach(item => {
                if (item.discont_price !== null) {
                  item.show_item = showItemValue;
                } else {
                  item.show_item = false;
                }
              });
            } else {
              state.list.forEach(item => {
                item.show_item = true;
              });
            }
          },
        sortProducts(state, action) {
            if (action.payload === 'title') {
              state.list.sort((a, b) => a[action.payload].localeCompare(b[action.payload]));
            } else if (action.payload === 'price') {
              state.list.sort((a, b) => {
                const aNewPrice = calculateNewPrice(a.price, a.discont_price);
                const bNewPrice = calculateNewPrice(b.price, b.discont_price);
                return aNewPrice - bNewPrice;
              });
            }
          },
        filterItems(state, action) {
            const { minValue, maxValue } = action.payload;
            
            state.list = state.list.map((item) => {
             const newPrice = calculateNewPrice(item.price, item.discont_price);
             const showItem = calculateShowItem(item, minValue, maxValue);

             return { ...item, newPrice, show_item: showItem};
        });
    }
},
    extraReducers: (builder) => {
        builder
        .addCase(fetchProduct.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchProduct.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.list = action.payload;
        })
        .addCase(fetchProduct.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        })
    }
});

export const { showMoreProducts, showDiscount, filterItems, sortProducts } = allProductsSlice.actions;
export default allProductsSlice.reducer;