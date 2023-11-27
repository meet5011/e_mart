import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
const dataSlice = createSlice({
  name: "products",
  initialState: {
    products: {
      product: [],
      isLoading: true,
      filteredProducts: [],
      //filterByRating: [],
      filters: {
        text: [],
        rate: [],
        price: [],
        category:[]
      },
      categories: [],
    },
  },
  reducers: {
    searchFilter: (state, action) => {
     // action.payload.length > 0 ?
      state.products.product = state.products.filteredProducts.filter((s) => {
        return s.category.toLowerCase().includes(action.payload.toLowerCase()) ||
        s.title.toLowerCase().includes(action.payload.toLowerCase());
        ;
      })
      //state.products.product = state.products.filteredProducts;
    },
    filterApply:(state,action)=>{
     // console.log("apply");
      let selectedFilters = action.payload;
     // console.log(selectedFilters);
      const rate = (a)=>{
        if(selectedFilters.rate.length > 0){
          console.log("yes rate");
          return a.filter((s,i)=>selectedFilters.rate.includes(Math.round(s.rating.rate)));
        }else{
          return a;
        }
      }

      const price = (a)=>{
        if(selectedFilters.price.length > 0){
          return a.filter((s,i)=>selectedFilters.price[0] < s.price && s.price < selectedFilters.price[1]);
        }
        else{
          return a;
        }
      }

      const category = (a) =>{
        if(selectedFilters.category.length > 0){
          return a.filter((s,i)=>selectedFilters.category.includes(s.category));
        }
        else{
          return a;
        }
      }

      
       
        let a = state.products.filteredProducts;
        a= rate(a);
        a= price(a);
        a= category(a);
        state.products.product = a;
        
     

    },
    sorting:(state,action)=>{
     
      if(action.payload === "lowest"){
        state.products.product = state.products.product.sort((a,b)=>a.price-b.price)
       }
      if(action.payload === "highest"){
        state.products.product = state.products.product.sort((a,b)=>b.price-a.price)
       }
      if(action.payload === "a-z"){
        state.products.product = state.products.product.sort((a,b)=>a.title.localeCompare(b.title))
       }
      if(action.payload === "z-a"){
        state.products.product = state.products.product.sort((a,b)=>b.title.localeCompare(a.title))
       }
    },
    categoryFilter:(state,action)=>{
       // console.log(action.payload);
        state.products.product = state.products.product.filter((item)=>{
            return action.payload.includes(item.category);
        })
    },
    noFilter: (state, action) => {
      state.products.product = state.products.filteredProducts;
    },
    loading:(state,action)=>{
      if(action.payload.length > 0){
        state.products.isLoading = false;
      }else{
        state.products.isLoading = true;
      }
    }
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

export const { searchFilter,filterApply,categoryFilter,noFilter,sorting,loading } = dataSlice.actions;
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
