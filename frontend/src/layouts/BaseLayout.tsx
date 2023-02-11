
import { Box } from "@mui/material";
import styled from "@mui/styled-engine-sc";
import { boxSizing } from "@mui/system";
import React from "react"
import NavBar from "../components/NavBar"

const Wrapper = styled('div')(({ theme }) => ({
  width: '100vw',
  height: '100vh',
  margin: 0,
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box'
}));

const Content = styled('section')(({ theme }) => ({
  margin: 0,
  padding: 20,
  boxSizing: 'border-box',
  overflow: 'auto'
}))

function BaseLayout (props: any) {
  return (
    <React.Fragment>
      <Wrapper>
        <NavBar />
        <Content>
          {props.children}
        </Content>
      </Wrapper>
    </React.Fragment>
  )
}

export default BaseLayout