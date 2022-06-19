/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";

//Material UI Imports
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

//Redux Imports
import { fetchProducts } from "../store/productsReducer";
import NewSingleProductCard from "./NewSingleProductCard";
import { useDispatch, useSelector } from "react-redux";

const NewAllProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
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
                  <NewSingleProductCard product={product} />
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

export default NewAllProducts;
