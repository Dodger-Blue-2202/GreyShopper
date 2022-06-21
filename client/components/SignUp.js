/* eslint-disable no-unused-vars */
import * as React from "react";

//Material UI Imports
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

//Redux Imports
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "../store";

import { useHistory } from "react-router-dom";

export default function SignUp() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const error = useSelector((state) => state.auth.error);

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const password = data.get("password");
    const formName = "signup";
    const email = data.get("email");
    dispatch(authenticate(username, password, formName, email, cart));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="center ">
            <Grid item>
              <Link variant="body2" onClick={() => history.push("/signin")}>
                {"Already have an account? Sign In."}
              </Link>
            </Grid>
          </Grid>
        </Box>
        {error && error.response && <div> {error.response.data} </div>}
      </Box>
    </Container>
  );
}
