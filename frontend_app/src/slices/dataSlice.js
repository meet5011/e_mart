import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const dataSlice = createSlice({
    name:"products",
    initialState:{
       products:{
        product:[],
        isLoading:true,
        filteredProducts:[],
        filterByRating:[],
        filters:{
            text:false,
            rating:false
        }
       },
        
    },
    reducers:{
        filter:(state,action)=>{
            
           state.products.product = state.products.filteredProducts.filter((s)=>{
            return s.title.toLowerCase().includes(action.payload.toLowerCase());
           })
        },
        filterByRate :(state,action)=>{
           // console.log(action.payload);
           // console.log(action.payload);
        let rating = action.payload.map((s)=>{
            return s.rating;
        })
      if(action.payload.length === 0){
        state.products.product = state.products.filterByRating;
         
      }else{
        state.products.product = state.products.filteredProducts.filter((item)=>{
            return  rating.includes(Math.round(item.rating.rate));
          })
      }
    
        
            
        }
    },
    extraReducers:(builder)=>{
       builder.addCase(fetchData.fulfilled,(state,action)=>{
        
        state.products.product=action.payload;
        state.products.filteredProducts = action.payload;
        state.products.filterByRating = action.payload;
        state.products.isLoading = false;
       })
       builder.addCase(fetchData.pending,(state,action)=>{
        state.products.isLoading = true
       })
    }

})

export const {filter,filterByRate} = dataSlice.actions;
export default dataSlice.reducer;

export const fetchData = createAsyncThunk(
    "products",
    async()=>{
        return  fetch("https://fakestoreapi.com/products").then((data=>data.json()))
.catch((err)=>console.log(err));        
    }
    
)