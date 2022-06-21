/* eslint-disable no-unused-vars */
import React from "react";

//Material UI Imports
import { Container, Box, Grid, Card, Typography, Button } from "@mui/material";

import { useDispatch } from "react-redux";

import { authenticate } from "../store";

const Home = () => {
  const dispatch = useDispatch();

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "90vw",
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            width: "80%",
            height: "80%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            container
            spacing={2}
            direction="column"
            justifyContent="space-around"
            alignItems="center"
            sx={{ width: "95%", height: "100%" }}
          >
            <Grid item>
              <Typography variant="h4" gutterBottom>
                Welcome to GreyShopper!
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5" gutterBottom>
                This is the place to get everything from black to white,
                non-inclusive.
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5" gutterBottom>
                This site was designed with React and Material UI, and uses
                Redux for state management. Feel free to create your own
                account, or sign in with a demo account to go through the
                checkout process (this won't actually require any info to be
                entered).
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={() => {
                  dispatch(
                    authenticate("DEMO", "DEMO", "login", "demo@demo.com", [])
                  );
                }}
              >
                Use Demo Account
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Container>
  );
};

export default Home;
