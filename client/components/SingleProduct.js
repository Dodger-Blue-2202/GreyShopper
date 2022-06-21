/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";

//Material UI Imports
import {
  Container,
  Box,
  Card,
  CardMedia,
  Typography,
  Grid,
  Skeleton,
  Button,
} from "@mui/material";

//Redux Imports
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../store/productReducer";
import { deleteProduct, putProduct, addToCart } from "../store";

import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, []);

  return (
    <Container maxWidth={false}>
      <Box
        sx={{
          width: "100%",
          height: "80vh",
          maxWidth: "100%",
          marginTop: "5vh",
          marginBottom: "5vh",
        }}
      >
        <Grid
          container
          spacing={2}
          justifyContent="space-around"
          sx={{ width: "100%", height: "100%" }}
        >
          <Grid
            item
            width="40%"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {product.name ? (
              <Card sx={{ width: "80%", height: "80%" }}>
                <CardMedia
                  component="img"
                  height={"100%"}
                  image={product.imageUrl}
                  alt={product.name}
                />
              </Card>
            ) : (
              <Skeleton
                variant="rectangular"
                width="80%"
                height="80%"
                animation="wave"
                sx={{ borderRadius: 3 }}
              />
            )}
          </Grid>
          <Grid
            item
            width="40%"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="start"
              direction="column"
              sx={{ width: "100%", height: "100%" }}
            >
              <Grid
                item
                width="100%"
                height="20%"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {product.name ? (
                  <Typography variant="h4" gutterBottom>
                    {product.name}
                  </Typography>
                ) : (
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="50%"
                    animation="wave"
                    sx={{ borderRadius: 3 }}
                  />
                )}
              </Grid>
              <Grid
                item
                width="100%"
                height="20%"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {product.name ? (
                  <Typography variant="h5" gutterBottom>
                    ${product.price}
                  </Typography>
                ) : (
                  <Skeleton
                    variant="rectangular"
                    width="50%"
                    height="50%"
                    animation="wave"
                    sx={{ borderRadius: 3 }}
                  />
                )}
              </Grid>
              <Grid
                item
                width="100%"
                height="20%"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {product.name ? (
                  <Typography variant="h6" gutterBottom>
                    {product.description}
                  </Typography>
                ) : (
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="75%"
                    animation="wave"
                    sx={{ borderRadius: 3 }}
                  />
                )}
              </Grid>
              <Grid
                item
                width="100%"
                height="20%"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {product.name ? (
                  <Button
                    size="large"
                    variant="contained"
                    onClick={() => dispatch(addToCart(product, 1))}
                  >
                    Add to Cart
                  </Button>
                ) : (
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="50%"
                    animation="wave"
                    sx={{ borderRadius: 3 }}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SingleProduct;
// export class SingleProduct extends React.Component {
//   componentDidMount() {
//     this.props.fetchSingleProduct(this.props.match.params.id);
//   }
//   render() {
//     let product = this.props.product;
//     if (product === undefined) {
//       product = "";
//     }
//     const deleteButton = () => {
//       console.log(this.props.match.params.id);
//       return (
//         <button
//           type="button"
//           className="btn btn-danger"
//           onClick={() => this.props.deleteProduct(this.props.match.params.id)}
//         >
//           Delete
//         </button>
//       );
//     };
//     const editButton = () => (
//       <Link to={`/edit/${product.id}`}>
//         <button type="button" className="btn btn-success">
//           Edit
//         </button>
//       </Link>
//     );

//     const addCartHandler = (product, event) => {
//       event.preventDefault();
//       this.props.addToCart(product, event.target.quantity.value);
//     };
//     const qtyOptions = (qty) => {
//       let options = [];
//       for (let i = 0; i <= qty; i++) {
//         options.push(<option key={i}>{i}</option>);
//       }
//       return options;
//     };
//     const defaultQty = (product) => {
//       let item = this.props.cart.filter((order) => {
//         return order.product.id === product.id;
//       })[0];
//       if (item) {
//         return item.quantity;
//       } else {
//         0;
//       }
//     };
//     return (
//       <div className="product">
//         <div className="container-fluid" key={product.id}>
//           <div className="row align-items-start">
//             <Link to={`/products`}>
//               <img className="product-image" src={product.imageUrl} />
//             </Link>
//           </div>
//           <div className="row align-items-center">
//             <h4>Name: {product.name}</h4>
//             <h4>Price: ${product.price}</h4>
//             <h4>Description: {product.description}</h4>
//             <h4>Quantity: {product.stock}</h4>
//           </div>
//           <div className="addToCartButton">
//             {this.props.isAdmin ? editButton() : null}
//             {/* <button type="button" className="btn btn-primary">
// 							Add to cart
// 						</button> */}
//             {/*    {this.props.isAdmin ?  deleteButton()  : null} */}
//             <form onSubmit={(e) => addCartHandler(product, e)}>
//               <label for="quantity">Amount to add</label>
//               <select
//                 id="quantity"
//                 name="quantity"
//                 defaultValue={defaultQty(product)}
//               >
//                 {qtyOptions(product.stock)}
//               </select>
//               <button type="submit" className="btn btn-primary">
//                 Add to cart
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// const mapState = (state) => ({
//   product: state.product,
//   isAdmin: state.auth.isAdmin,
//   cart: state.cart,
// });

// const mapDispatch = (dispatch) => {
//   return {
//     fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
//     deleteProduct: (id) => dispatch(deleteProduct(id)),
//     editProduct: () => dispatch(putProduct()),
//     addToCart: (product, qty) => {
//       dispatch(addToCart(product, qty));
//     },
//   };
// };

// export default connect(mapState, mapDispatch)(SingleProduct);
