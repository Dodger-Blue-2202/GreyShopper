import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import { useSelector, useDispatch } from "react-redux";

import { fetchProducts } from "../store/productReducer";
import NewSingleProduct from "./NewSingleProduct";

export default function AllProducts() {
  const dispatch = useDispatch();
  let products = useSelector((state) => state.products);
  const skelArray = new Array(12);

  useEffect(() => {
    dispatch(fetchProducts());
    products = useSelector((state) => state.products);
  }, []);

  return (
    <Container sx={{ height: "100vh" }}>
      <Paper sx={{ width: "100%", maxWidth: "100%" }}>
        <Grid container spacing={3}>
          {products && products.length
            ? products.map((product, index) => (
                <Grid item>
                  <NewSingleProduct key={index} product={product} />
                </Grid>
              ))
            : skelArray.map((skel, index) => (
                <Grid item key={index}>
                  <Skeleton variant="rectangular" width="100%" height="100%" />
                </Grid>
              ))}
          {products.map((product, index) => (
            <Grid item key={index}>
              <NewSingleProduct product={product} />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
}
