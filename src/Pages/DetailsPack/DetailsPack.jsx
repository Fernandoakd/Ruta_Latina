import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Header, Footer} from '../../Components'
import './DetailsPack.css'

const DetailsPack = ({ packages }) => {
  const { id } = useParams()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  })
  const [formValid, setFormValid] = useState(false)

  const product = packages.find((item) => item.id === parseInt(id))
  const { imgSrc, destTitle, location, grade, fees, description } = product || {}

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
    validateForm({ ...formData, [name]: value })
  }

  const validateForm = (data) => {
    const { name, phone, email } = data
    const validPhone = /^\d{10,15}$/
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (name && validPhone.test(phone) && validEmail.test(email)) {
      setFormValid(true)
    } else {
      setFormValid(false)
    }
  }

  const handleSubmit = () => {
    const encodedMessage = encodeURIComponent(
      `Hola, estoy interesado en el paquete a ${destTitle}. Mi nombre es ${formData.name}, mi teléfono es ${formData.phone} y mi email es ${formData.email}.`
    )
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  if (!product) {
    return <div>Producto no encontrado.</div>
  }

  return (
    <>
        <Header/>
            <div className='product-details-container'>
            <div className='product-header'>
                <div className='product-header-info'>
                <h2 className='product-destination'>Viaja a {destTitle}</h2>
                </div>
                <img
                src={`../../../src/assets/${imgSrc}`}
                alt={destTitle}
                className='product-image'
                />
            </div>
            
            <div className='product-info'>
                <p><strong className='info-title'>Ubicación:</strong> {location}</p>
                <p><strong className='info-title'>Calificación:</strong> {grade}</p>
                <p><strong className='info-title'>Precio:</strong> {fees}</p>
                <p><strong className='info-title'>Descripción:</strong> {description}</p>
            </div>

            <div className='product-form-container'>
                <h3>Solicitar información</h3>
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
                    disabled={!formValid}
                >
                    Solicitar
                </button>
                </form>
            </div>
            </div>
        <Footer/>
    </>
  )
}

export default DetailsPack
