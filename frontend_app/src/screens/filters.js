import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Rating,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterApply } from "../slices/dataSlice";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import RangeSlider from "../components/slider";

function Filter() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  // const filters = useSelector((state)=>state.data.products.filters)
  const [filters, setFilters] = useState(
    useSelector((state) => state.data.products.filters)
  );
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.data.products.categories);
  //console.log(categories, "categories");

  const handelValue = (data) => {
    // console.log(data);
    setFilters({ ...filters, price: data.value });
  };

  let props = {
    data: handelValue,
  };

  const handleRate = (e, item) => {
    if (e.target.checked) {
      console.log(filters.rate);
      //console.log("yes");
      //console.log(filters.rating.length == 0);
      !filters.rate
        ? setFilters({
            ...filters,
            rate: [...[], item],
            //price:[...filters.price]
          })
        : //filters.rate.push(item);
          setFilters({
            ...filters,
            rate: [...filters.rate, item],
            //price:[...filters.price]
          });
    } else {
      console.log("no");
      setFilters({
        ...filters,
        rate: [...filters.rate].filter((s, i) => {
          return s !== item;
        }),
      });
    }
  };

  const handleCategory = (e, item) => {
    console.log(filters.category);
    if (e.target.checked) {
      !filters.category
        ? setFilters({
            ...filters,
            category: [...[], item],
          })
        : setFilters({ ...filters, category: [...filters.category, item] });
    } else {
      setFilters({
        ...filters,
        category: [...filters.category].filter((s, i) => {
          return s !== item;
        }),
      });
    }
  };

  useEffect(() => {
    dispatch(filterApply(filters)); //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

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
                      onChange={(e) => handleRate(e, s)}
                    />
                  </ListItemIcon>
                  {/* <ListItemText  primary={`Line item + 1}`} /> */}
                  <Rating key={index} defaultValue={5 - index} readOnly />
                </ListItemButton>
              </ListItem>
            </Grid>
          );
        })}
        {/* <Grid
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
        </Grid> */}
        <Grid>
          <RangeSlider {...props} />
        </Grid>

        <Grid>
          {categories.map((item, index) => {
            return (
              <>
                <ListItem style={{ cursor: "pointer" }} dense>
                  <ListItemIcon>
                    <input
                      onClick={(e) => handleCategory(e, item)}
                      id="category"
                      type="checkbox"
                    />
                  </ListItemIcon>
                  {item.toUpperCase()}
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
