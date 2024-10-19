import React, { useState } from 'react'
import {CloseIcon, MenuIcon} from '../../Icons'
import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = ({isShadowBkg}) => {
  let isHomeClassBkg = isShadowBkg  ? 'top-navbar nav-container home-bkg-active' : 'top-navbar nav-container'
  let isHomeClassLink = isShadowBkg  ? 'nav-link nav-link-scd' : 'nav-link'
const [active, setActive] = useState('navbar')
const showNavbar = () => {
  setActive('navbar active-navbar')
}
const removeNavbar = () => {
  setActive('navbar')
}

  return (
    <div className={isHomeClassBkg}>
      <div className='logo-name'>        
        <div className='logo-container logo-circle'>
          <Link to='/home' className='logo'>
            <img src='../../../src/assets/ruta-latina-logo-hq.png' alt='Logo' />
          </Link>
        </div>
        <h1 className='page-name'>Ruta Latina</h1>
      </div>
      <nav className={active}>
        <ul className='navbar-lists'>
          <li className='nav-item'>
            <Link to='/home' className={isHomeClassLink}>Inicio</Link>
          </li>
          <li className='nav-item'>
            <Link to='/packages' className={isHomeClassLink}>Paquetes</Link>
          </li>
        </ul>
        <div onClick={removeNavbar} className='close-navbar'>
            <CloseIcon className='icon'/>
        </div>
      </nav>
      <div onClick={showNavbar} className='toogle-navbar logo-circle'>
          <MenuIcon className='icon logo'/>
      </div>
    </div>
  )
}

export default Navbar