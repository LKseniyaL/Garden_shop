    import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

    const initialState = {
        list: [],
        status: 'loading'
    };

    export const fetchInCategoriesSlice = createAsyncThunk(
        'category/fetchInCategoriesSlice',
        async (category) => {
            const respons = await fetch(`http://localhost:3333/categories/${category}`);
            const data = await respons.json();
            const categoryDate = data.data;
            const productsWithShowItem = categoryDate.map(product => {
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

    const categoriesItemSlice = createSlice({
        name: 'category',
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
            filterItems(state, action){
                const { minValue, maxValue } = action.payload;
                console.log('min', minValue)
                console.log('max', maxValue)

                state.list = state.list.map((item) => {
                    const newPrice = calculateNewPrice(item.price, item.discont_price);
                    const showItem = calculateShowItem(item, minValue, maxValue);

                    return {...item, newPrice, show_item: showItem};
                });
            }
        },
        extraReducers: (builder) => {
            builder
            .addCase(fetchInCategoriesSlice.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchInCategoriesSlice.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.list = action.payload;
            })
            .addCase(fetchInCategoriesSlice.rejected, (state, action) => {
                state.list = 'rejected';
                state.error = action.payload;
            })
        }
    })
    export const { sortProducts, showDiscount, filterItems } = categoriesItemSlice.actions;
    export default categoriesItemSlice.reducer;