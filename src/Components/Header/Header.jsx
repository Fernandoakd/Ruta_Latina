import React from 'react'
import './Header.css'
import Navbar from '../Navbar/Navbar'
import imageBkgHeader from '../../assets/bkg-ppal.png'
import HomeSearch from '../HomeSearch/HomeSearch'


const Header = ({isHome, packages, onSearch}) => {

  return (
      isHome
      ? <header>
          <div className='home-header-container pb-medium'>
            <Navbar/>
            <img className='image-bkg-header' src={imageBkgHeader} alt='Ruta Latina'/>
            <div className='home-header-info'>
              <h2 className='subtitle'>Viví la experiencia de viajar</h2>
              <p className='home-header-text'>Aquí podrás encontrar las mejores ofertas de paquetes turisticos a distintas ciudades y playas de latinoamérica.</p>
            </div>
            <HomeSearch packages={packages} onSearch={onSearch}/>
          </div>
        </header>
      : <header>
          <div className='home-header-container'>
            <Navbar isShadowBkg={!isHome}/>
          </div>
        </header>
  )
}

export default Header