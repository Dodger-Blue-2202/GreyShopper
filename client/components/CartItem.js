/* eslint-disable no-unused-vars */
import React, { useState } from "react";

//Material UI Imports
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddBox from "@mui/icons-material/AddBox";
import IndeterminateCheckBox from "@mui/icons-material/IndeterminateCheckBox";
import { DeleteForever } from "@mui/icons-material";

//Redux Imports
import { useDispatch } from "react-redux";
import { removeFromCart, addToCart } from "../store";

const NewCartItem = (props) => {
  const dispatch = useDispatch();

  const { order, product } = props;
  const { imageUrl, id, name, price } = product;
  const [quantity, setQuantity] = useState(order.quantity);

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <CardActionArea href={`/products/${id}`} sx={{ width: "30%" }}>
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
        <CardContent width="30%" sx={{ margin: "3%" }}>
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
              onClick={() => {
                setQuantity(quantity + 1);
                dispatch(addToCart(product, quantity + 1));
              }}
            >
              <AddBox />
            </IconButton>
            <Typography variant="h6" component="div">
              {quantity}
            </Typography>
            <IconButton
              aria-label="remove-one"
              disabled={quantity <= 1}
              onClick={() => {
                setQuantity(quantity - 1);
                dispatch(addToCart(product, quantity - 1));
              }}
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
