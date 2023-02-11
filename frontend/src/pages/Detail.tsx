import React from "react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BreedDetailCard from "../components/BreedDetailCard"
import { BreedModel } from "../models/BreedModel"

function Detail() {
  const [breed, setBreed] = useState<BreedModel>()
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const appUrl = import.meta.env.VITE_APP_URL

  useEffect(() => {
    setLoading(true)
    fetch(`${appUrl}/breed/${id}`)
      .then(data => data.json())
      .then(result => {
        setBreed(result as BreedModel)
        setLoading(false)
      })
  }, [])

  return (
    <React.Fragment>
    {
      loading ? <h1>Loading...</h1> : <BreedDetailCard breed={breed} />
    }
    </React.Fragment>)
}

export default Detail