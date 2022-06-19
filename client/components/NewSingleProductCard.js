/* eslint-disable no-unused-vars */
import React from "react";

//Material UI Imports
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Button, CardActionArea, CardActions } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import SearchIcon from "@mui/icons-material/Search";

//Redux Imports
import { useDispatch } from "react-redux";
import { addToCart } from "../store";

const NewSingleProductCard = (props) => {
  const { product } = props;
  const { id, imageUrl, name, price } = product;

  const dispatch = useDispatch();

  return (
    <Card sx={{ width: "20rem", height: "25rem" }}>
      <CardActionArea href={`/products/${id}`}>
        <CardMedia component="img" height={"30%"} image={imageUrl} alt={name} />
        <CardContent>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                justifySelf="start"
              >
                {name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                justifySelf="end"
              >
                ${price}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          sx={{ width: "100%" }}
        >
          <Grid item>
            <Button size="small" color="primary">
              <SearchIcon />
            </Button>
          </Grid>
          <Grid item>
            <Button
              size="small"
              color="primary"
              onClick={() => dispatch(addToCart(product, 1))}
            >
              <AddShoppingCartIcon />
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default NewSingleProductCard;
