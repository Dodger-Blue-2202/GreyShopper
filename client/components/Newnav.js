import React from "react";
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
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LoginOutlined from "@mui/icons-material/LoginOutlined";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import Badge from "@mui/material/Badge";

import { useSelector, useDispatch } from "react-redux";
import { logout, logoutCart } from "../store";

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
                  <MenuItem onClick={handleCloseNavMenu} href="/products">
                    <Button
                      size="medium"
                      href="/products"
                      onClick={handleCloseNavMenu}
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
                        href="/"
                        onClick={() => {
                          handleCloseNavMenu();
                          handleClick();
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
                        href="/signin"
                        onClick={handleCloseNavMenu}
                      >
                        Sign In
                      </Button>
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
                    href="/products"
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
                          href="/signin"
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
                          href="/"
                          onClick={handleClick}
                          size="medium"
                          sx={{ my: 2, color: "white" }}
                        >
                          Sign Out
                        </Button>
                      </Grid>
                    )}
                    <Grid item>
                      {isAdmin ? (
                        <Button
                          aria-label="admin-settings"
                          href="/users"
                          sx={{
                            my: 2,
                            color: "white",
                          }}
                        >
                          <SettingsIcon />
                        </Button>
                      ) : (
                        <Button
                          aria-label="cart"
                          href="/cart"
                          sx={{
                            my: 2,
                            color: "white",
                          }}
                        >
                          <Badge badgeContent={4} color="secondary">
                            <ShoppingCartOutlinedIcon />
                          </Badge>
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {isAdmin ? (
                <Button
                  aria-label="admin-settings"
                  href="/users"
                  sx={{
                    my: 2,
                    color: "white",
                    display: { xs: "flex", md: "none" },
                  }}
                >
                  <SettingsIcon />
                </Button>
              ) : (
                <Button
                  aria-label="cart"
                  href="/cart"
                  sx={{
                    my: 2,
                    color: "white",
                    display: { xs: "flex", md: "none" },
                  }}
                >
                  <Badge badgeContent={4} color="secondary">
                    <ShoppingCartOutlinedIcon />
                  </Badge>
                </Button>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  );
}
