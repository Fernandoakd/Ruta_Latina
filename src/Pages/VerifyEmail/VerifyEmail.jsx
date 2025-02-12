import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './VerifyEmail.css'

const VerifyEmail = () => {
    const navigate = useNavigate()
    const [status, setStatus] = useState('')
    const [message, setMessage] = useState('')

    const navigateToLogin = () => {
        navigate('/login')

    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        setStatus(urlParams.get('status'))
        setMessage(urlParams.get('message'))

    }, [])

    return (
        <div className='verify-email-container'>
            <div className={`message-box ${status === 'success' ? 'success' : 'error'}`}>
                <h2>
                    {
                        status === 'success'
                        ? '¡Verificación Exitosa!'
                        : 'Error en la Verificación'
                    }
                </h2>
                <p>{message}</p>
                <button onClick={navigateToLogin}>
                    Ir a Iniciar Sesión
                </button>
            </div>
        </div>
    )
    
}

export default VerifyEmail
