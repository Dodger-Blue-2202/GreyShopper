/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

//Material UI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Button, CardActionArea, CardActions } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddBox from "@mui/icons-material/AddBox";
import IndeterminateCheckBox from "@mui/icons-material/IndeterminateCheckBox";
import { DeleteForever } from "@mui/icons-material";

//Redux Imports
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, addToCart } from "../store";

const NewCartItem = (props) => {
  const dispatch = useDispatch();

  const { order, product } = props;
  const { imageUrl, id, name, price } = product;

  const [quantity, setQuantity] = useState(1);

  //Update Order Quantity in Database
  useEffect(() => {
    if (quantity > 0 && quantity !== order.quantity) {
      dispatch(addToCart(product, quantity));
    }
  }, [quantity]);

  return (
    <Card
      sx={{
        width: "80vw",
        height: "15vw",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <CardActionArea href={`/products/${id}`} sx={{ width: "30vw" }}>
        <CardMedia
          component="img"
          height="100%"
          width="30%"
          image={imageUrl}
          alt={name}
        />
      </CardActionArea>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <CardContent width="30vw" justifyContent="center" sx={{ margin: "3%" }}>
          <Box
            justifyContent="space-between"
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              justifySelf="start"
            >
              {name}
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              justifySelf="end"
            >
              ${price}
            </Typography>
          </Box>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
            width: "30%",
            justifyContent: "end",
          }}
        >
          <Box
            sx={{
              justifySelf: "end",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton
              aria-label="add-one"
              onClick={() => setQuantity(quantity + 1)}
            >
              <AddBox />
            </IconButton>
            <Typography variant="h6" component="div">
              {quantity}
            </Typography>
            <IconButton
              aria-label="remove-one"
              disabled={quantity <= 1}
              onClick={() => setQuantity(quantity - 1)}
            >
              <IndeterminateCheckBox />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              height: "100%",
              margin: "5%",
            }}
          >
            <IconButton
              aria-label="remove"
              onClick={() => dispatch(removeFromCart(product))}
            >
              <DeleteForever />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default NewCartItem;
