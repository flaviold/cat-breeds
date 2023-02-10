import { Fragment, useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { useSearchParams } from "react-router-dom"
import BreedGrid from "../components/BreedGrid"
import { BreedModel } from "../models/BreedModel"

function Search() {
  const [ searchParams ] = useSearchParams()
  const [breeds, setBreeds] = useState<BreedModel[]>([])
  const [loading, setLoading] = useState(true)
  const q = searchParams.get('q')
  const appUrl = import.meta.env.VITE_APP_URL

  useEffect(() => {
    if (!q) return;

    setLoading(true)
    fetch(`${appUrl}/breed?name=${q}`)
      .then(data => data.json())
      .then(result => {
        setBreeds(result as BreedModel[])
        setLoading(false)
      })
  }, [q])

  return (
    <Fragment> 
      { !q ? 
        <Navigate to="/home" /> : 
        loading ? 
          <h1>Loading...</h1> :
          <BreedGrid breeds={breeds} />}
    </Fragment>
  )
}

export default Search