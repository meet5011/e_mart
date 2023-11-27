import * as React from 'react';
import Grid from '@mui/joy/Grid';
import {useDispatch, useSelector} from "react-redux";
import { fetchData, sorting } from '../slices/dataSlice';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Rating from '@mui/material/Rating';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import AspectRatio from '@mui/joy/AspectRatio';
import { ListItemIcon, Skeleton } from '@mui/material';




export default function ResponsiveGrid() {
    const data = useSelector((state)=>state.data.products);

    
    const dispatch = useDispatch();

    React.useEffect(()=>{
      
  dispatch(fetchData()) // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]) 
   

  const handleSort = (e) =>{
      console.log(e.target.value);
      dispatch(sorting(e.target.value));
      
    }

  return (
    <>
    
    <Grid  style={{display:"flex",justifyContent:"space-between"}} >
    <Grid>Results: {data.product.length}</Grid>
    <Grid >
      Sort By: 
            <ListItemIcon>
             <form action='#'>
              <label htmlFor='sort by'></label>
              <select onClick={(e)=>handleSort(e)}>
                <option value="lowest">Price - (low-high)</option>
                <option value="highest">Price - (high-low)</option>
                <option value="a-z">A-z</option>
                <option value="z-a">Z-A</option>
                {/* <option>Price - (highest)</option> */}
              </select>
             </form>
        
            </ListItemIcon>
           
            </Grid>     
    </Grid>
    
    <Grid
      container
      spacing={{ xs: 0, md: 1 }}
      //columns={{ xs: 2, sm: 6, md: 12 }}
     sx={{ flexGrow: 1 }}
     
    >
      
    
     
        {data.product.map((s,index)=>(
       <>
     {data.isLoading  ? 
     //<div>Loading...</div>
     <Skeleton count={2} variant='square' animation="wave"width="300px" height={500} sx={{mx:"7px",my:"2px"}} />
      :
    <>
      
     <Grid md={3}  display="flex">
      
       <Card sx={{ width: 350, minHeight:"500px", maxHeight:"540px", mx:"5px" }} >
         <div style={{display:"flex", justifyContent:"center",textAlign:"justify",height:"100vh"}}>
           <div style={{color:"black",fontWeight:"500"}}>{s.title} </div>
           
         </div>
         <Typography fontSize="" fontWeight="lg">
           views: {s.rating.count}
             </Typography>
         <AspectRatio ratio="8/7" objectFit="fill" style={{transform:"scale(0.7)"}}>
           <img
             src={s.image}
             //srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2"
             alt=""
             width="auto"
             loading='lazy'
             
           />
          </AspectRatio>
          <FavoriteSharpIcon color="transperent" fontSize='large' />
          <Rating name="half-rating" value={Math.round(s.rating.rate)}  readOnly precision={0.5} />
    
          
          <CardContent orientation="horizontal">
           <div >
           
          
          
           <Typography fontSize="lg" fontWeight="lg" >
              ${s.price}
             </Typography>
             
           </div>
           
            
           
          </CardContent>
       </Card>
       </Grid> 
     </>  
      }
       </>
      
     ))}     
       
   
    </Grid>
    </>
  );
}
