
import React, { Children } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "../App"
import BreedGrid from "../components/BreedGrid"

function BaseLayout (props: any) {
  return (
    <React.Fragment>
      {props.children}
    </React.Fragment>
  )
}

export default BaseLayout