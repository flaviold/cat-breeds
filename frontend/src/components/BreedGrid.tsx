import { Box, Container, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useState } from "react";
import BreedCard from "./BreedCard";
import { BreedModel } from "../models/BreedModel";

function BreedGrid () {
  const [breeds, setBreeds] = useState<BreedModel[]>([])
  const [loading, setLoading] = useState(true)
  const appUrl = import.meta.env.VITE_APP_URL

  useEffect(() => {
    fetch(`${appUrl}/breed?limit=20`)
      .then(data => data.json())
      .then(result => {
        setBreeds(result as BreedModel[])
        setLoading(false)
      })
  }, [])

  return (
    <>
      {
        loading ? 
          <h1>Loading...</h1> :
            <Box sx={{
              width: '100vw',
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              margin: 5
            }}>
              <Grid container spacing={2}  sx={{ maxWidth: 1200 }}>
                {breeds.map(breed => (
                  <Grid xs={12} sm={6} md={4} lg="auto" key={breed.id}>
                    <BreedCard breed={breed} />
                  </Grid>
                ))}
              </Grid>
            </Box>
      }
    </>
  )
}

export default BreedGrid