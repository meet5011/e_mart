import PrimarySearchAppBar from "../components/app_bar";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ResponsiveGrid from "../components/grid";
import Product from "../components/grid";
import YouTube from "../components/skeleton";
import { Button, Skeleton } from "@mui/material";
import Paper from '@mui/material/Paper';
import Filter from "./filters";

export default function Home(){

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
   

    return(
        <>
        <PrimarySearchAppBar style={{position:"fixed"}} />
        <Grid container >
        <Grid xs={2} >
        
         {/* <Item style={{backgroundColor:"whitesmoke"}}><Button color="primary">FILTERS</Button></Item> */}
         <Filter />
        </Grid>
        <Grid xs={10}>
          <Item>
            <ResponsiveGrid />
          </Item>
        </Grid>
      </Grid>
       
        </>
    )
}