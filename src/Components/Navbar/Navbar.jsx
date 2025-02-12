import React, { useState, useContext } from 'react';
import { CloseIcon, MenuIcon } from '../../Icons';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

const Navbar = ({ isShadowBkg }) => {
  const { isAuthenticatedState, logout } = useContext(AuthContext);
  let isHomeClassBkg = isShadowBkg
    ? 'top-navbar nav-container home-bkg-active'
    : 'top-navbar nav-container';
  let isHomeClassLink = isShadowBkg ? 'nav-link nav-link-scd' : 'nav-link';
  const navigate = useNavigate();
  const [active, setActive] = useState('navbar');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(
    '¿Seguro que deseas cerrar sesión?'
  );

  const showNavbar = () => {
    setActive('navbar active-navbar');
  };
  const removeNavbar = () => {
    setActive('navbar');
  };

  const handleLogout = () => {
    setModalMessage('Sesión cerrada correctamente...');
    setTimeout(() => {
      logout();
      navigate('/home');
      setShowModal(false);
    }, 2000);
  };

  return (
    <div className={isHomeClassBkg}>
      <div className='logo-name'>
        <div className='logo-container logo-circle'>
          <Link to='/home' className='logo'>
            <img src='/assets/ruta-latina-logo-hq.png' alt='Logo' />
          </Link>
        </div>
        <h1 className='page-name'>Ruta Latina</h1>
      </div>
      <nav className={active}>
        <ul className='navbar-lists'>
          <li className='nav-item'>
            <Link to='/home' className={isHomeClassLink}>
              Inicio
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/packages' className={isHomeClassLink}>
              Paquetes
            </Link>
          </li>

          {isAuthenticatedState && (
            <li className='nav-item'>
              <Link to='/profile' className={isHomeClassLink}>
                Mi Perfil
              </Link>
            </li>
          )}

          {!isAuthenticatedState ? (
            <li className='nav-item'>
              <Link to='/login' className={isHomeClassLink}>
                Iniciar sesión
              </Link>
            </li>
          ) : (
            <li className='nav-item'>
              <a onClick={() => setShowModal(true)} className={isHomeClassLink}>
                Cerrar sesión
              </a>
            </li>
          )}
        </ul>
        <div onClick={removeNavbar} className='close-navbar'>
          <CloseIcon className='icon' />
        </div>

        {showModal && (
          <div className='modal-overlay'>
            <div className='modal-content'>
              <p>{modalMessage}</p>
              {modalMessage === '¿Seguro que deseas cerrar sesión?' && (
                <div className='modal-buttons'>
                  <button onClick={handleLogout} className='confirm-btn'>
                    Sí, cerrar sesión
                  </button>
                  <button onClick={() => setShowModal(false)} className='cancel-btn'>
                    Cancelar
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
      <div onClick={showNavbar} className='toogle-navbar logo-circle'>
        <MenuIcon className='icon logo' />
      </div>
    </div>
  );
};

export default Navbar;
