import { Button, Card, CardActions, CardContent, CardMedia, Rating, Typography } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"

const metaData = [
  { legend: 'Adaptability', prop: 'adaptability' },
  { legend: 'Affection Level', prop: 'affection_level' },
  { legend: 'Child Friendly', prop: 'child_friendly' },
  { legend: 'Dog Friendly', prop: 'dog_friendly' },
  { legend: 'Energy Level', prop: 'energy_level' },
  { legend: 'Grooming', prop: 'grooming' },
  { legend: 'Health Issues', prop: 'health_issues' },
  { legend: 'Intelligence', prop: 'intelligence' },
  { legend: 'Shedding Level', prop: 'shedding_level' },
  { legend: 'Social Needs', prop: 'social_needs' },
  { legend: 'Stranger Friendly', prop: 'stranger_friendly' },
  { legend: 'Vocalisation', prop: 'vocalisation' }
]

function BreedDetailCard (props: any) {
  const { breed } = props
  const imgUrl = import.meta.env.VITE_IMG_CDN_URL

  return (
    <Card sx={{ width: '80vw', maxWidth: 800, minHeight: '70vh', margin: 'auto'}}>
      <CardMedia
        sx={{ height: '40vh' }}
        image={`${imgUrl}/${breed.reference_image_id}.jpg`}
      />
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {breed.name}
        </Typography>
        <Typography variant="h6" sx={{ marginTop: 2 }} component="legend">Description:</Typography>
        <Typography variant="body1" color="text.secondary">
          {breed.description}
        </Typography>
        <Typography variant="h6" sx={{ marginTop: 2 }} component="legend">Temperament:</Typography>
        <Typography variant="body1" color="text.secondary">
          {breed.temperament}
        </Typography>
        <Typography variant="h6" sx={{ marginTop: 2 }} component="legend">Origin:</Typography>
        <Typography variant="body1" color="text.secondary">
          {breed.origin}
        </Typography>
        <Grid container spacing={2}>
          { metaData.map(data => (
            <Grid xs={12} sm={6} md={4} lg={3} key={data.prop}>
              <Typography sx={{ marginTop: 2 }} component="legend">{data.legend}</Typography>
              <Rating name="read-only" value={breed[data.prop]} readOnly />
            </Grid>
          )) }
        </Grid>
      </CardContent>
      <CardActions sx={{height: 50}}>
        <Button href={breed.wikipedia_url} variant="contained" size="small">Learn more</Button>
      </CardActions>
    </Card>
  )
}

export default BreedDetailCard