"use client";

import {
  Box,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Grid,
  ListItemButton,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function ProductItem({ product }) {
  const {
    cantidad_vendidos,
    color,
    marca,
    memoria_interna,
    nombre_publicacion,
    precio,
    puntuacion,
    url_imagen,
    seo_slug,
    identificador,
  } = product;

  const router = useRouter();
  const formattedPrice = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(precio);

  return (
    <ListItemButton
      onClick={() => router.push(`/${seo_slug}/p/${identificador}`)}
    >
      <Grid role="button" container>
        <Grid item xs={4}>
          <CardMedia
            component="img"
            height="140"
            image={url_imagen}
            alt={nombre_publicacion}
          />
        </Grid>
        <Grid item xs={8} component={CardContent}>
          <Typography gutterBottom variant="h5" component="div">
            {nombre_publicacion}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`${marca} - ${memoria_interna} GB - ${color}`}
          </Typography>
          <Typography variant="body1" color="text.primary">
            {formattedPrice}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 2,
            }}
          >
            <Rating name="read-only" value={puntuacion} readOnly />
            <Typography variant="body2" color="text.secondary">
              {`${cantidad_vendidos} vendidos`}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </ListItemButton>
  );
}
