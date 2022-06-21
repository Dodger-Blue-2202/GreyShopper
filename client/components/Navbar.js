/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";

import PropTypes from "prop-types";

//Material UI Imports
import {
  AppBar,
  Grid,
  Toolbar,
  CssBaseline,
  useScrollTrigger,
  Box,
  Container,
  IconButton,
  Menu,
  Button,
  MenuItem,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LoginOutlined from "@mui/icons-material/LoginOutlined";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import SettingsIcon from "@mui/icons-material/Settings";

//Redux Imports
import { useSelector, useDispatch } from "react-redux";
import { logout, logoutCart, fetchOrders } from "../store";

import { useHistory } from "react-router-dom";

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function Navbar(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const quantity = useSelector((state) => state.cart.length);
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  const handleClick = () => {
    dispatch(logout());
    dispatch(logoutCart());
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Button
                size="medium"
                sx={{
                  mr: 2,
                  color: "white",
                  fontWeight: 700,
                  display: { xs: "none", md: "flex" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontSize: "1.3rem",
                }}
                disableRipple
                onClick={() => history.push("/")}
              >
                GreyShopper
              </Button>
              <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      handleCloseNavMenu();
                      history.push("/products");
                    }}
                  >
                    <Button
                      size="medium"
                      onClick={() => {
                        handleCloseNavMenu();
                        history.push("/products");
                      }}
                      disableRipple
                    >
                      All Products
                    </Button>
                  </MenuItem>
                  {isLoggedIn ? (
                    <MenuItem>
                      <Button
                        size="medium"
                        startIcon={<LogoutOutlined />}
                        onClick={() => {
                          handleCloseNavMenu();
                          handleClick();
                          history.push("/");
                        }}
                      >
                        Sign Out
                      </Button>
                    </MenuItem>
                  ) : (
                    <MenuItem>
                      <Button
                        startIcon={<LoginOutlined />}
                        size="medium"
                        disableRipple
                        onClick={() => {
                          handleCloseNavMenu();
                          history.push("/signin");
                        }}
                      >
                        Sign In
                      </Button>
                    </MenuItem>
                  )}
                </Menu>
              </Box>
              <Button
                size="medium"
                sx={{
                  mr: 5,
                  color: "white",
                  fontWeight: 700,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontSize: "1.3rem",
                }}
                disableRipple
                onClick={() => history.push("/")}
              >
                GS
              </Button>
              <Grid
                container
                justifyContent="space-between"
                direction="row"
                spacing={1}
                sx={{
                  width: "100%",
                  display: { xs: "none", md: "flex" },
                }}
              >
                <Grid item>
                  <Button
                    onClick={() => {
                      handleCloseNavMenu();
                      history.push("/products");
                    }}
                    size="medium"
                    sx={{ my: 2, color: "white" }}
                  >
                    All Products
                  </Button>
                </Grid>
                <Grid item sx={{ flexGrow: 1 }}>
                  <Grid
                    container
                    justifyContent="end"
                    direction="row"
                    spacing={1}
                    sx={{ width: "100%", flexGrow: 1 }}
                  >
                    {!isLoggedIn ? (
                      <Grid item>
                        <Button
                          variant="contained"
                          color="secondary"
                          startIcon={<LoginOutlined />}
                          size="medium"
                          sx={{ my: 2, color: "black" }}
                          onClick={() => {
                            history.push("/signin");
                          }}
                        >
                          Sign In
                        </Button>
                      </Grid>
                    ) : (
                      <Grid item>
                        <Button
                          variant="contained"
                          color="secondary"
                          endIcon={<LogoutOutlined />}
                          onClick={() => {
                            handleClick();
                            history.push("/");
                          }}
                          size="medium"
                          sx={{ my: 2, color: "black" }}
                        >
                          Sign Out
                        </Button>
                      </Grid>
                    )}
                    <Grid item>
                      {isLoggedIn ? (
                        <Button
                          aria-label="cart"
                          sx={{
                            my: 2,
                            color: "white",
                          }}
                          onClick={() => {
                            history.push("/cart");
                            dispatch(fetchOrders());
                          }}
                        >
                          <Badge badgeContent={quantity} color="secondary">
                            <ShoppingCartOutlinedIcon />
                          </Badge>
                        </Button>
                      ) : (
                        ""
                      )}
                      {/* {isAdmin ? (
                        <Button
                          aria-label="admin-settings"
                          sx={{
                            my: 2,
                            color: "white",
                          }}
                          onClick={() => history.push("/users")}
                        >
                          <SettingsIcon />
                        </Button>
                      ) : (
                        <Button
                          aria-label="cart"
                          sx={{
                            my: 2,
                            color: "white",
                          }}
                          onClick={() => {
                            history.push("/cart");
                            dispatch(fetchOrders());
                          }}
                        >
                          <Badge badgeContent={quantity} color="secondary">
                            <ShoppingCartOutlinedIcon />
                          </Badge>
                        </Button>
                      )} */}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {isLoggedIn ? (
                <Button
                  aria-label="cart"
                  sx={{
                    my: 2,
                    color: "white",
                    display: { xs: "flex", md: "none" },
                  }}
                  onClick={() => {
                    history.push("/cart");
                    dispatch(fetchOrders());
                  }}
                >
                  <Badge badgeContent={quantity} color="secondary">
                    <ShoppingCartOutlinedIcon />
                  </Badge>
                </Button>
              ) : (
                ""
              )}
              {/* {isAdmin ? (
                <Button
                  aria-label="admin-settings"
                  sx={{
                    my: 2,
                    color: "white",
                    display: { xs: "flex", md: "none" },
                  }}
                  onClick={() => history.push("/users")}
                >
                  <SettingsIcon />
                </Button>
              ) : (
                <Button
                  aria-label="cart"
                  sx={{
                    my: 2,
                    color: "white",
                    display: { xs: "flex", md: "none" },
                  }}
                  onClick={() => {
                    history.push("/cart");
                    dispatch(fetchOrders());
                  }}
                >
                  <Badge badgeContent={quantity} color="secondary">
                    <ShoppingCartOutlinedIcon />
                  </Badge>
                </Button>
              )} */}
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  );
}
