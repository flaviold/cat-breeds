
import React from "react"
import NavBar from "../components/NavBar"

function BaseLayout (props: any) {
  return (
    <React.Fragment>
      <NavBar />
      {props.children}
    </React.Fragment>
  )
}

export default BaseLayout