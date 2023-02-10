import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { BreedModel } from "../models/BreedModel";
import BreedGrid from "../components/BreedGrid";

function Home() {
  const [breeds, setBreeds] = useState<BreedModel[]>([])
  const [loading, setLoading] = useState(true)
  const appUrl = import.meta.env.VITE_APP_URL

  useEffect(() => {
    setLoading(true)
    fetch(`${appUrl}/breed?limit=5`)
      .then(data => data.json())
      .then(result => {
        setBreeds(result as BreedModel[])
        setLoading(false)
      })
  }, [])
  
  return (
    <React.Fragment>
    {
      loading ? <h1>Loading...</h1> :<BreedGrid className="123" breeds={breeds} />
    }
    </React.Fragment>)
}

export default Home