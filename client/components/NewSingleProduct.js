import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  ButtonGroup,
  CardActionArea,
  CardActions,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PageviewIcon from "@mui/icons-material/Pageview";
import SearchIcon from "@mui/icons-material/Search";

export default function MultiActionAreaCard(props) {
  const { id, imageUrl, name, price, description, stock } = props;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={imageUrl} alt={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
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
            <ButtonGroup>
              <Button size="small" color="primary" href={`/products/${id}`}>
                <PageviewIcon />
              </Button>
              <Button size="small" color="primary">
                <SearchIcon />
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item>
            <Button size="small" color="primary">
              <AddShoppingCartIcon />
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
