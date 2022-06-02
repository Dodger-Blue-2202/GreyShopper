import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout, logoutCart } from "../store";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import { styled, alpha } from "@mui/material/styles";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LoginOutlined from "@mui/icons-material/LoginOutlined";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

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

  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const dispatch = useDispatch();

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
                href="/"
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
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center"> All Products</Typography>
                  </MenuItem>
                  {isLoggedIn ? (
                    <MenuItem
                      onClick={() => {
                        handleCloseNavMenu();
                        handleClick();
                      }}
                    >
                      Log Out
                    </MenuItem>
                  ) : (
                    <MenuItem
                      component={Link}
                      to="/login"
                      onClick={handleCloseNavMenu}
                    >
                      Sign In
                    </MenuItem>
                  )}
                </Menu>
              </Box>
              <Button
                size="medium"
                href="/"
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
                    onClick={handleCloseNavMenu}
                    size="medium"
                    sx={{ my: 2, color: "white" }}
                  >
                    All Products
                  </Button>
                </Grid>
                {/* <Grid item>
                  <TextField
                    fullWidth
                    label="Search"
                    color="secondary"
                    startAdornment={
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    }
                    sx={{ my: 1, display: { xs: "none", md: "flex" } }}
                  />
                </Grid> */}
                {/* <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search> */}
                {/* <Box sx={{ flexGrow: 1 }} /> */}
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
                          href="/login"
                          sx={{ my: 2, color: "white" }}
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
                          onClick={handleClick}
                          size="medium"
                          sx={{ my: 2, color: "white" }}
                        >
                          Log Out
                        </Button>
                      </Grid>
                    )}
                    <Grid item>
                      <Button
                        aria-label="cart"
                        href="/cart"
                        sx={{ my: 2, color: "white" }}
                      >
                        <ShoppingCartOutlinedIcon />
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Button
                aria-label="cart"
                href="/cart"
                sx={{
                  my: 2,
                  color: "white",
                  display: { xs: "flex", md: "none" },
                }}
              >
                <ShoppingCartOutlinedIcon />
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  );
}
