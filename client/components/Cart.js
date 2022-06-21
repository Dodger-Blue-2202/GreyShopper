/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

//Material UI Imports
import {
  Container,
  Box,
  Grid,
  Skeleton,
  Card,
  Typography,
  Button,
} from "@mui/material";

//Redux Imports
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../store";

//Child Imports
import NewCartItem from "./CartItem";

const NewCartPage = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.cart);
  const [quantity, setQuantity] = useState(
    orders.reduce((total, order) => total + order.quantity, 0)
  );
  const [price, setPrice] = useState(
    orders.reduce((total, order) => total + order.total_price, 0)
  );

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  useEffect(() => {
    setQuantity(orders.reduce((total, order) => total + order.quantity, 0));
    setPrice(orders.reduce((total, order) => total + order.total_price, 0));
  }, [orders]);

  return (
    <Container maxWidth="100vw">
      <Box
        sx={{
          width: "100%",
          height: "100%",
          maxWidth: "100%",
          marginTop: "10vh",
          marginBottom: "10vh",
        }}
      >
        <Grid
          container
          direction="row"
          spacing={2}
          justifyContent="space-between"
          sx={{ width: "98vw" }}
        >
          <Grid item sx={{ height: "100%", width: "60%" }}>
            <Grid
              container
              direction="column"
              spacing={2}
              justifyContent="start"
              sx={{ height: "100%", width: "100%" }}
            >
              {orders.length
                ? orders.map((order, index) => (
                    <Grid
                      item
                      key={index}
                      sx={{ width: "100%", height: "25%" }}
                    >
                      <NewCartItem order={order} product={order.product} />
                    </Grid>
                  ))
                : Array(3)
                    .fill(1)
                    .map((skel, index) => (
                      <Grid item key={`${index}`}>
                        <Skeleton
                          variant="rectangular"
                          width="55vw"
                          height="20vh"
                          animation="wave"
                          sx={{ borderRadius: 3 }}
                        />
                      </Grid>
                    ))}
            </Grid>
          </Grid>
          <Grid item sx={{ height: "50vh", width: "37%" }}>
            {orders.length ? (
              <Card sx={{ width: "100%", height: "100%" }}>
                <Grid
                  container
                  direction="column"
                  justifyContent="space-around"
                  alignItems="center"
                  sx={{ width: "100%", height: "100%" }}
                >
                  <Grid item>
                    <Button variant="contained" size="large" href="/checkout">
                      Continue to Checkout
                    </Button>
                  </Grid>
                  <Grid item sx={{ width: "90%" }}>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Typography variant="h5" gutterBottom>
                          Total Items:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="h5" gutterBottom>
                          {quantity}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item sx={{ width: "90%" }}>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Typography variant="h5" gutterBottom>
                          Subtotal:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="h5" gutterBottom>
                          ${price}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            ) : (
              <Skeleton
                variant="rectangular"
                width={"100%"}
                height={"100%"}
                animation="wave"
                sx={{ borderRadius: 3 }}
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default NewCartPage;

// class Cart extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   componentDidMount() {
//     this.props.fetchOrders();
//   }

//   handleSubmit(e) {
//     e.preventDefault();
//     this.props.checkOut(this.props.order);
//   }

//   render() {
//     const { handleSubmit } = this;
//     return (
//       <div className="cart-component">
//         {this.props.orders
//           ? this.props.orders.map((order) => (
//               <CartItem
//                 key={order.productId}
//                 product={order.product}
//                 order={order}
//               />
//             ))
//           : ""}
//         <button type="button" className="submit-order" onClick={handleSubmit}>
//           Submit Order
//         </button>
//       </div>
//     );
//   }
// }

// const mapState = (state) => {
//   return {
//     orders: state.cart,
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     fetchOrders: () => dispatch(fetchOrders()),
//     checkOut: (order) => dispatch(checkOut(order)),
//   };
// };

// export default connect(mapState, mapDispatch)(Cart);
