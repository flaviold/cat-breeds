import { Box, Container, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import BreedCard from "./BreedCard";
import { BreedModel } from "../models/BreedModel";

function BreedGrid (props: any) {
  const { breeds } = props;

  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center'
    }}>
      <Grid container spacing={2}  sx={{ maxWidth: 1200 }}>
        {breeds.map((breed: BreedModel) => (
          <Grid xs={12} sm={6} md={4} lg="auto" key={breed.id}>
            <BreedCard breed={breed} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default BreedGrid