import { createAsyncThunk, createSlice, current, nanoid } from "@reduxjs/toolkit";

const dataSlice = createSlice({
    name:"products",
    initialState:{
       products:{
        product:[],
        isLoading:true,
        filteredProducts:[],
        filterByRating:[]
       },
        
    },
    reducers:{
        filter:(state,action)=>{
            console.log(action.payload);
           state.products.product = state.products.filteredProducts.filter((s)=>{
            return s.title.toLowerCase().includes(action.payload.toLowerCase());
           })
        },
        filterByRate :(state,action)=>{
            console.log(action.payload);
        action.payload.map((s)=>{
            console.log(s);
            if(s.length !==0){
                state.products.product = state.products.filterByRating.filter((item)=>{
                    
                     return Math.round(item.rating.rate) === s.rating
                 })  
            }else{
                state.products.product = state.products.filterByRating; 
                return state.products.product;
            }
            
        })
           
            
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