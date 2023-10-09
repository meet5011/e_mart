import Box from '@mui/joy/Box';
import Slider from '@mui/joy/Slider';
import * as React from 'react';

function valueText(value) {
  return `${value}°C`;
}

export default function RangeSlider(props) {
  const [value, setValue] = React.useState([0, 0]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.data({value:newValue});
  };

 

  return (
    
    <Box sx={{ width: 170 }} ml={3}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
       value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
       // getAriaValueText={valueText}
        max={1000}
        //scale={()=>scale(1000)}
      />
     
    </Box>
  );
}
