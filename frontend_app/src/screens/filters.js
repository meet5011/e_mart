import {Grid, ListItem, ListItemButton, ListItemIcon,Rating } from "@mui/material";
import { useState } from "react";
import Button from '@mui/joy/Button';
import {useDispatch} from "react-redux"
import { filterByRate } from "../slices/dataSlice";
import Paper from '@mui/material/Paper';
import { styled } from "@mui/material/styles";
import RangeSlider from "../components/slider";


function Filter() {

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


  const [checkedIndex,setCheckedIndex] = useState([]);
 
  const dispatch = useDispatch();

  const handleCheck = (e,index) =>{
    const{checked} = e.target;
    console.log(checked);
    //console.log(e.target.checked);
   if(!checked){
   const filtered = checkedIndex.filter((s)=>{
       return s.rating !== (5-index);
    })
    setCheckedIndex(filtered);
    
   }else{
    checkedIndex.push({rating:5-index});
    
   }
  
   
   
  }

  const handleApply = () =>{
   
      dispatch(filterByRate(checkedIndex));
   
    
  }
 
    return (
     
      <div>
    <Item>FILTERS</Item>
  
    {[5,4,3,2,1].map((s,index)=>{

        return <Grid container >
      
        <ListItem
        disablePadding
      >
        <ListItemButton role={undefined} dense>
          <ListItemIcon>
            <input
              edge="end"
              //checked={checkedIndex.includes(index)}
              type="checkbox"
              //tabIndex={-1}
             // disableRipple
             // inputProps={{ 'aria-labelledby': 1 }}
              key={index}
              onChange={(e)=>handleCheck(e,index)}
            />
          </ListItemIcon>
          {/* <ListItemText  primary={`Line item + 1}`} /> */}
          <Rating key={index} defaultValue={5-index} readOnly />
        </ListItemButton>
        
      </ListItem>
      </Grid>
    })} 
    <Grid style={{display:"flex",justifyContent:"center",scrollBehavior:"unset"}}>
    <Button onClick={handleApply} size="lg" style={{position:"absolute",bottom:"5px"}} variant="solid">APPLY</Button>
    </Grid>
    <Grid>
    <RangeSlider />
    </Grid>
    
   
    </div> );
}

export default Filter;