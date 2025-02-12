import React from 'react'
import { Routes, Route } from "react-router-dom"
import { DetailsPack, Home, Packages, Login, Register, VerifyEmail, ForgotPassword, ResetPassword, Profile } from "./Pages"
import usePackages from './hooks/usePackages'
import { ProtectedRoute } from './Components'

function App() {
  const {packages} = usePackages()
  let isHome = true

  return (
    <>
      <Routes>
        <Route path='/' element={<Home isHome={isHome}/>}/>
        <Route path='/home' element={<Home isHome={isHome}/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path='/packages' element={<Packages/>}/>
        <Route element={<ProtectedRoute />}>
          <Route path='/packages/:id' element={<DetailsPack packages={packages}/>}/>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  )
}

export default App