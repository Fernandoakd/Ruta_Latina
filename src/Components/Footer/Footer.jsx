import React from 'react'
import './Footer.css'
import {
    ChevronRightIcon,
    FacebookIcon,
    GitHubIcon,
    InstagramIcon,
    TwitterIcon,
} from '../../Icons'

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='footer-container'>
                <div className='company-information-container'>
                    <div className='company-info'>
                        <h2 className='company-name'>Ruta Latina</h2>
                        <p className='company-purpose'>
                            Elige nuestra agencia de viajes para disfrutar de paquetes turísticos personalizados por toda Latinoamérica, con experiencias únicas, atención a los detalles y destinos inolvidables llenos de cultura y aventura.
                        </p>
                    </div>
                    <div className='company-links'>
                        <h3 className='company-info-title'>Enlaces</h3>
                        <ul>
                            <a href='' className='link'>
                                <ChevronRightIcon className='icon' />
                                <li className='company-link'>Descubrir</li>
                            </a>
                            <a href='' className='link'>
                                <ChevronRightIcon className='icon'/>
                                <li className='company-link'>Ofertas especiales</li>
                            </a>
                            <a href='' className='link'>
                                <ChevronRightIcon className='icon'/>
                                <li className='company-link'>Servicios</li>
                            </a>
                            <a href='' className='link'>
                                <ChevronRightIcon className='icon'/>
                                <li className='company-link'>Comunidad</li>
                            </a>
                            <a href='' className='link'>
                                <ChevronRightIcon className='icon'/>
                                <li className='company-link'>Sobre nosotros</li>
                            </a>
                        </ul>
                    </div>
                    <div className='company-services'>
                        <h3 className='company-info-title'>Servicios</h3>
                        <ul>
                            <a href='' className='link'>
                                <ChevronRightIcon className='icon'/>
                                <li className='company-service'>Sobre nosotros</li>
                            </a>
                            <a href='' className='link'>
                                <ChevronRightIcon className='icon'/>
                                <li className='company-service'>Blogs y artículos</li>
                            </a>
                            <a href='' className='link'>
                                <ChevronRightIcon className='icon'/>
                                <li className='company-service'>Términos y condiciones</li>
                            </a>
                            <a href='' className='link'>
                                <ChevronRightIcon className='icon'/>
                                <li className='company-service'>Política de privacidad</li>
                            </a>
                            <a href='' className='link'>
                                <ChevronRightIcon className='icon'/>
                                <li className='company-service'>Contáctenos</li>
                            </a>
                        </ul>
                    </div>
                    <div className='company-contact'>
                        <h3 className='company-info-title'>Contacto</h3>
                        <span>Dirección: J.B. Justo No 2590</span>
                        <span>Mendoza - Argentina</span>
                        <span>Teléfono: 261 701 8899</span>
                        <span>Email: info@rutalatina.com</span>
                        <span>Maps: Mendoza - Argentina</span>
                    </div>
                </div>
                <div className='redes-container'>
                    <h3 className='owner'>Fer Valdez</h3>
                    <div className='redes-icons'>
                        <a href='' className='link'><InstagramIcon className='icon-redes' /></a>
                        <a href='' className='link'><FacebookIcon className='icon-redes' /></a>
                        <a href='' className='link'><TwitterIcon className='icon-redes' /></a>
                        <a href='' className='link'><GitHubIcon className='icon-redes' /></a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
