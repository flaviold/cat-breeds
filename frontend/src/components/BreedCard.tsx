import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { BreedModel } from '../models/BreedModel'

type BreedCardProp = {
  breed: BreedModel
}

function BreedCard (props: BreedCardProp) {
  const { breed } = props
  const navigate = useNavigate()
  const imgUrl = import.meta.env.VITE_IMG_CDN_URL
  
  const descriptionShortener = (desc: string, size: number): string => {
    return `${desc.substring(0, size)}...`
  }

  return (
    <Card sx={{ maxWidth: 345, height:  400, margin: 'auto' }}>
      <CardMedia
        sx={{ height: 200 }}
        image={`${imgUrl}/${breed.reference_image_id}.jpg`}
      />
      <CardContent sx={{height: 150}}>
        <Typography gutterBottom variant="h5" component="div">
          {breed.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {descriptionShortener(breed.description, 100)}
        </Typography>
      </CardContent>
      <CardActions sx={{height: 50}}>
        <Button variant="contained" onClick={() => navigate(`/details/${breed.id}`)} size="small">Details</Button>
      </CardActions>
    </Card>
  )
}

export default BreedCard