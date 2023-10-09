import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Rating,
} from "@mui/material";
import {useState } from "react";
import Button from "@mui/joy/Button";
import { useDispatch, useSelector } from "react-redux";
import { categoryFilter, filterByRate, noFilter } from "../slices/dataSlice";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import RangeSlider from "../components/slider";
import ListItemText from "@mui/material/ListItemText";

function Filter() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const [checkedIndex, setCheckedIndex] = useState([]);
  const [value, setValue] = useState([]);
  const [selectCategoryIndex, setSelectCategoryIndex] = useState([]);

  const categories = useSelector((state) => state.data.products.categories);
  //console.log(categories, "categories");

  const handelValue = (data) => {
    // console.log(data);
    setValue(data.value);
    if (checkedIndex.length !== 0) {
      checkedIndex[0].price = value;
      setCheckedIndex(checkedIndex);
     // console.log(checkedIndex,"not empty");
      
    } else {
     // checkedIndex.push({ price: data.value });
      setCheckedIndex([...checkedIndex,{price:data.value}]);
     // console.log(checkedIndex,"empty");
    }
    // console.log(checkedIndex);
  };

  let props = {
    data: handelValue,
  };

  const dispatch = useDispatch();

  const handleCheck = (e, index) => {
    const { checked } = e.target;
    if (!checked) {
      const filtered = checkedIndex.filter((s) => {
        return s.rating !== 5 - index;
      });
      setCheckedIndex(filtered);
    } else{
     setCheckedIndex([...checkedIndex,{rating:5-index}])
    }
  };

  const handleApply = () => {
    console.log(checkedIndex);
    if (checkedIndex.length === 0) {
      dispatch(noFilter(checkedIndex));
    }
    if (selectCategoryIndex.length !== 0) {
      dispatch(categoryFilter(selectCategoryIndex));
    } else if (checkedIndex.length !== 0) {
      dispatch(filterByRate(checkedIndex));
    }
  };

  const handleColor = (index) => {
    // setSelectCategoryIndex((prevState)=>(

    //   {
    //     ...selectCategoryIndex,
    //     [index] :!prevState[index]
    //   }

    // )

    // )
    if (!selectCategoryIndex.includes(categories[index].toLowerCase())) {
      setSelectCategoryIndex([...selectCategoryIndex, categories[index]]);
    } else {
      setSelectCategoryIndex(
        selectCategoryIndex.filter((item) => {
          return item !== categories[index].toLowerCase();
        })
      );
    }
  };

  return (
    <div style={{ marginTop: "65px" }}>
      <Item>FILTERS</Item>
      <div style={{ paddingLeft: "0px" }}>
        {[5, 4, 3, 2, 1].map((s, index) => {
          return (
            <Grid container>
              <ListItem disablePadding>
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
                      onChange={(e) => handleCheck(e, index)}
                    />
                  </ListItemIcon>
                  {/* <ListItemText  primary={`Line item + 1}`} /> */}
                  <Rating key={index} defaultValue={5 - index} readOnly />
                </ListItemButton>
              </ListItem>
            </Grid>
          );
        })}
        <Grid
          style={{
            display: "flex",
            justifyContent: "center",
            scrollBehavior: "unset",
          }}
        >
          <Button
            onClick={handleApply}
            size="lg"
            style={{ position: "absolute", bottom: "5px" }}
            variant="solid"
          >
            APPLY
          </Button>
        </Grid>
        <Grid>
          <RangeSlider {...props} />
        </Grid>

        <Grid>
          {categories.map((item, index) => {
            return (
              <>
                <ListItem style={{ cursor: "pointer" }} dense>
                  <ListItemText
                    onClick={() => handleColor(index)}
                    id="category"
                    primary={item.toUpperCase()}
                    style={
                      selectCategoryIndex.includes(categories[index])
                        ? { color: "blue" }
                        : { color: "black" }
                    }
                  />
                </ListItem>
              </>
            );
          })}
        </Grid>
      </div>
    </div>
  );
}

export default Filter;
