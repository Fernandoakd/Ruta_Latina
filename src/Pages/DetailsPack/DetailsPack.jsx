import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header, Footer } from '../../Components';
import ENVIROMENT from "../../utils/constants/enviroment";
import { useFetch } from "../../hooks/useFetch"; 
import './DetailsPack.css';

const DetailsPack = ({ packages }) => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [formValid, setFormValid] = useState(false);
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  if (!packages || packages.length === 0) {
    return <div>Cargando paquetes...</div>;
  }

  const product = packages.find((item) => item._id === id);

  if (!product) {
    return <div>Producto no encontrado.</div>;
  }

  const { package_img, destTitle, location, grade, fees, description } = product || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    validateForm({ ...formData, [name]: value });
  };

  const validateForm = (data) => {
    const { name, phone, email } = data;
    const validPhone = /^\d{10,15}$/;
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (name && validPhone.test(phone) && validEmail.test(email)) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  const handleSubmit = async () => {
    setStatus('loading');
    try {
      const response = await fetch(`${ENVIROMENT.API_URL}/api/orders/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem("access_token")}`,
        },
              body: JSON.stringify({
          packageId: id,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
        }),
      });

      const data = await response.json();

      if (data.ok) {
        setStatus('success');
        setMessage('Reserva enviada correctamente. Revisa tu correo.');
      } else {
        setStatus('error');
        setMessage(data.message || 'Ocurrió un error.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Error en la conexión con el servidor.');
    }
};


  return (
    <>
      <Header />
      <div className='product-details-container'>
        <div className='product-header'>
          <div className='product-header-info'>
            <h2 className='product-destination'>Viaja a {destTitle}</h2>
          </div>
          <img src={package_img} alt={destTitle} className='product-image' />
        </div>

        <div className='product-info'>
          <p><strong className='info-title'>Ubicación:</strong> {location}</p>
          <p><strong className='info-title'>Calificación:</strong> {grade}</p>
          <p><strong className='info-title'>Precio:</strong> {fees}</p>
          <p><strong className='info-title'>Descripción:</strong> {description}</p>
        </div>

        <div className='product-form-container'>
          <h3>Solicitar información</h3>
          {status === 'success' ? (
            <p className='success-message'>{message}</p>
          ) : (
            <form>
              <div className='form-group'>
                <label>Nombre y Apellido</label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='form-group'>
                <label>Teléfono</label>
                <input
                  type='tel'
                  name='phone'
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='form-group'>
                <label>Email</label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                type='button'
                className='btn-submit'
                onClick={handleSubmit}
                disabled={!formValid || status === 'loading'}
              >
                {status === 'loading' ? 'Enviando...' : 'Solicitar'}
              </button>
              {status === 'error' && <p className='error-message'>{message}</p>}
            </form>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DetailsPack;
