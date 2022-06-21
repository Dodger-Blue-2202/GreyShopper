/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";

//Material UI Imports
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

//Redux Imports
import { fetchProducts } from "../store/productsReducer";
import { fetchOrders } from "../store";
import { useDispatch, useSelector } from "react-redux";

import ProductCard from "./ProductCard";

const AllProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const orders = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchOrders());
  }, []);

  console.log("products is", products, products.length);

  return (
    <Container maxWidth={false}>
      <Box
        sx={{
          width: "100%",
          maxWidth: "100%",
          marginTop: "10vh",
          marginBottom: "10vh",
        }}
      >
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ width: "100%" }}
        >
          {products.length
            ? products.map((product, index) => (
                <Grid item key={index}>
                  <ProductCard product={product} orders={orders} />
                </Grid>
              ))
            : Array(12)
                .fill(1)
                .map((skel, index) => (
                  <Grid item key={`${skel}${index}`}>
                    <Skeleton
                      variant="rectangular"
                      width={"20rem"}
                      height={"25rem"}
                      animation="wave"
                      sx={{ borderRadius: 3 }}
                    />
                  </Grid>
                ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default AllProducts;
