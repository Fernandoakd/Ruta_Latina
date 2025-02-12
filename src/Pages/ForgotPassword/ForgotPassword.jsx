import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import { useFetch } from '../../hooks/useFetch';
import ENVIROMENT from '../../utils/constants/enviroment';
import './ForgotPassword.css';

const ForgotPassword = () => {
    const { form_state, handleChangeInput } = useForm({ email: '' });
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [touched, setTouched] = useState(false);

    const { loading, data, error, callFetch } = useFetch(
        `${ENVIROMENT.API_URL}/api/auth/forgot-password`,
        {
            method: "POST",
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(form_state),
        },
        [],
        false
    );

    const handleSubmitForm = async (event) => {
        event.preventDefault();
        setErrorMessage(null);
        setSuccessMessage(null);
        callFetch();
    };

    useEffect(() => {
        if (data) {
            setSuccessMessage(data.message);
        }
        if (error) {
            setErrorMessage("Error al enviar la solicitud. Inténtalo de nuevo.");
        }
    }, [data, error]);

    const handleBlur = () => {
        setTouched(true);
    };

    const errores = [];

    if (!form_state.email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form_state.email)) {
        errores.push("Debes ingresar un correo válido.");
    }

    return (
        <main className='auth-screen'>
            <form className='auth-form' onSubmit={handleSubmitForm}>
                <h1 className='title'>Recuperar Contraseña</h1>
                {successMessage && <p className='success-message'>{successMessage}</p>}
                {errorMessage && <p className='error-message'>{errorMessage}</p>}
                <div className='input-container'>
                    <label htmlFor='email'>Ingresa tu correo electrónico:</label>
                    <input 
                        name='email' 
                        id='email' 
                        placeholder='joedoe@email.com' 
                        value={form_state.email} 
                        onChange={handleChangeInput}
                        onBlur={handleBlur}
                    />
                    {touched && errores.length > 0 && (
                        <p className='error-message small-text'>{errores[0]}</p>
                    )}
                </div>
                <button 
                    type='submit' 
                    className='submit-btn'
                    disabled={loading || errores.length || !form_state.email}
                >
                    {loading ? 'Enviando...' : 'Enviar enlace'}
                </button>
                <div className='extra-links'>
                    <span>¿Ya tienes cuenta? <Link to={'/login'} className='link'>Inicia sesión</Link></span>
                </div>
            </form>
        </main>
    );
};

export default ForgotPassword;
