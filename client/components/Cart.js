/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";

//Material UI Imports
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

//Redux Imports
import { useDispatch, useSelector } from "react-redux";
import NewCartItem from "./CartItem";
import { fetchOrders, checkOut } from "../store";

const NewCartPage = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);
  console.log("orders", orders);
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
          {orders.length
            ? orders.map((order, index) => (
                <Grid item key={index}>
                  <NewCartItem order={order} product={order.product} />
                </Grid>
              ))
            : Array(3)
                .fill(1)
                .map((skel, index) => (
                  <Grid item key={`${index}`}>
                    <Skeleton
                      variant="rectangular"
                      width={"80vw"}
                      height={"15vw"}
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
