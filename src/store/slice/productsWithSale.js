import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    list:[],
    status: 'loading'
};

export const fetchSaleProducts = createAsyncThunk(
    'sale/fetchSaleProducts',
    async () => {
        const response = await fetch('http://localhost:3333/products/all');
        const data = await response.json();
        const discountedProducts = data.filter(sale => sale.discont_price !== null);
        const productsWithShowItem = discountedProducts.map(product => {
            return { ...product, show_item: true };
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

 const productsWithSale = createSlice({
    name: 'sale',
    initialState,
    reducers:{
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
      
              return { ...item, newPrice, show_item: showItem };
            });
          },
        },
    extraReducers: (builder) => {
        builder
        .addCase(fetchSaleProducts.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchSaleProducts.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.list = action.payload;
        })
        .addCase(fetchSaleProducts.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        })
    }
});
export const { sortProducts, filterItems } = productsWithSale.actions;
export default productsWithSale.reducer;