import { Rating } from "@mui/material";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "products",
  initialState: {
    products: {
      product: [],
      isLoading: true,
      filteredProducts: [],
      filterByRating: [],
      filters: {
        text: false,
        rating: false,
        price: false,
      },
      categories: [],
    },
  },
  reducers: {
    searchFilter: (state, action) => {
      state.products.product = state.products.filteredProducts.filter((s) => {
        return s.title.toLowerCase().includes(action.payload.toLowerCase());
      });
    },
    filterByRate: (state, action) => {
       console.log(action.payload);
      //console.log(action.payload);
      let PRICE = action.payload[0].hasOwnProperty("price");
      let RATINGS = action.payload[0].hasOwnProperty("rating");
      let both = action.payload.length >= 2 && PRICE;
    //  console.log(RATINGS, "ratings");
      let rating = action.payload.map((s) => {
        
          return s.rating;
      
        
      });
      if (RATINGS || PRICE) {
        if (RATINGS) {
          console.log("rate");
          state.products.filters.rating = true;
          state.products.product = state.products.filteredProducts.filter(
            (item) => {
              return rating.includes(Math.round(item.rating.rate));
            }
          );
        }
        if (PRICE) {
          state.products.filters.price = true;
        console.log("price");
          state.products.product = state.products.filteredProducts.filter(
            (item) => {
              return (
                action.payload[0].price[1] >
                item.price >
                action.payload[0].price[0]
              );
            }
          );
        }
      if (RATINGS && PRICE) {
        state.products.filters.price = true;
        state.products.filters.rating = true;
        const a = state.products.product.filter((item) => {
          return action.payload[0].price[1] > item.price > action.payload[0].price[0];
        });
       // console.log(current(state));
        state.products.product = a.filter((item) => {
          console.log("hi");
          return rating.includes(Math.round(item.rating.rate));
        });

        
      }
    }
  }
,
    categoryFilter:(state,action)=>{
       // console.log(action.payload);
        state.products.product = state.products.product.filter((item)=>{
            return action.payload.includes(item.category);
        })
    },
    noFilter: (state, action) => {
      state.products.product = state.products.filteredProducts;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.products.product = action.payload;
      state.products.filteredProducts = action.payload;
      state.products.filterByRating = action.payload;
      state.products.isLoading = false;
      state.products.categories = getCategories(action.payload);
    });
    builder.addCase(fetchData.pending, (state, action) => {
      state.products.isLoading = true;
    });
  },
});

export const { searchFilter, filterByRate,categoryFilter,noFilter } = dataSlice.actions;
export default dataSlice.reducer;

export const fetchData = createAsyncThunk("products", async () => {
  return fetch("https://fakestoreapi.com/products")
    .then((data) => data.json())
    .catch((err) => console.log(err));
});

const getCategories = (data) => {
  let nDa = data.map((item) => {
    return item.category;
  });

  return [...new Set(nDa)];
};
