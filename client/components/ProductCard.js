/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

//Material UI Imports
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  Backdrop,
  Box,
  Modal,
  Fade,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

//Redux Imports
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchOrders } from "../store";

import { useHistory } from "react-router-dom";

const ProductCard = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const { product } = props;
  const { name, imageUrl, id, description, price } = product;

  const [quantity, setQuantity] = useState(0);
  const orders = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  useEffect(() => {
    let order = orders.filter((ord) => ord.productId === product.id);
    if (order.length) {
      setQuantity(order[0].quantity);
    }
  }, [orders]);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "60vw",
              height: "60vh",
              p: 3,
            }}
          >
            <Card
              sx={{
                width: "100%",
                height: "100%",
              }}
            >
              <Grid item sx={{ height: "80%", width: "96%", margin: "2%" }}>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  sx={{ height: "100%", width: "100%" }}
                >
                  <Grid item sx={{ height: "100%", width: "50%" }}>
                    <Card sx={{ width: "100%", height: "100%" }}>
                      <CardMedia
                        component="img"
                        height={"100%"}
                        image={imageUrl}
                        alt={name}
                      />
                    </Card>
                  </Grid>
                  <Grid item sx={{ height: "100%", width: "45%" }}>
                    <Grid
                      container
                      direction="column"
                      justifyContent="space-between"
                      sx={{ height: "100%", width: "100%" }}
                    >
                      <Grid
                        item
                        sx={{
                          height: "15%",
                          width: "100%",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "end",
                        }}
                      >
                        <Button
                          size="small"
                          color="primary"
                          onClick={handleClose}
                        >
                          <CloseIcon />
                        </Button>
                      </Grid>
                      <Grid item sx={{ height: "15%", width: "100%" }}>
                        <Grid
                          container
                          direction="row"
                          justifyContent="space-between"
                          sx={{ height: "100%", width: "100%" }}
                        >
                          <Grid item>
                            <Typography variant="h4" gutterBottom>
                              {name}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="h4" gutterBottom>
                              ${price}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item sx={{ height: "40%", width: "100%" }}>
                        <Typography variant="h5" gutterBottom>
                          {description}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <CardActions sx={{ width: "100%" }}>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  sx={{ width: "100%" }}
                >
                  <Grid item>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => {
                        handleClose();
                        history.push(`/products/${id}`);
                      }}
                    >
                      Full Details
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => {
                        setQuantity(quantity + 1);
                        dispatch(addToCart(product, quantity + 1));
                      }}
                    >
                      <AddShoppingCartIcon />
                    </Button>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Box>
        </Fade>
      </Modal>
      <Card sx={{ width: "20rem", height: "25rem" }}>
        <CardActionArea
          onClick={() => history.push(`/products/${id}`)}
          sx={{ height: "87%" }}
        >
          <CardMedia
            component="img"
            height={"80%"}
            image={imageUrl}
            alt={name}
          />
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
              <Button size="small" color="primary" onClick={handleOpen}>
                <SearchIcon />
              </Button>
            </Grid>
            <Grid item>
              <Button
                size="small"
                color="primary"
                onClick={() => {
                  setQuantity(quantity + 1);
                  dispatch(addToCart(product, quantity + 1));
                }}
              >
                <AddShoppingCartIcon />
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </>
  );
};

export default ProductCard;
