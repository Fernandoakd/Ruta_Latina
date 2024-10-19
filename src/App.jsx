import React from 'react'
import { Routes, Route } from "react-router-dom"
import { DetailsPack, Home, Packages } from "./Pages"
import usePackages from './hooks/usePackages'

function App() {
  const {packages} = usePackages()
  let isHome = true

  return (
    <>
      <Routes>
        <Route path='/' element={<Home isHome={isHome}/>}/>
        <Route path='/home' element={<Home isHome={isHome}/>}/>
        <Route path='/packages' element={<Packages/>}/>
        <Route path='/packages/:id' element={<DetailsPack packages={packages}/>}/>
      </Routes>
    </>
  )
}

export default App