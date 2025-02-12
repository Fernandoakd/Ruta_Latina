import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import { useFetch } from '../../hooks/useFetch';
import ENVIROMENT from '../../utils/constants/enviroment';
import { OcultPassword, ViewPassword } from '../../Icons';
import './ResetPassword.css';

const ResetPassword = () => {
    const navigate = useNavigate();
    const { form_state, handleChangeInput } = useForm({ password: '' });
    const [touched, setTouched] = useState(false);
    const [resetToken, setResetToken] = useState('');
    const [status, setStatus] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { loading, data, error, callFetch } = useFetch(
        `${ENVIROMENT.API_URL}/api/auth/reset-password`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: form_state.password }),
        },
        [],
        false
    );

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('reset_token');
        const status = urlParams.get('status');
        const message = urlParams.get('message');

        if (!token) {
            setStatus('error');
            setMessage('Token inválido o faltante.');
        } else {
            setResetToken(token);
        }

        if (status) {
            setStatus(status);
            setMessage(decodeURIComponent(message));
        }
    }, []);

    const validatePassword = (password) => {
        const errors = [];
        if (!password) errors.push('La contraseña no puede estar vacía.');
        if (password.length < 8) errors.push('Debe tener al menos 8 caracteres.');
        if (!/[a-z]/.test(password)) errors.push('Debe contener al menos una letra minúscula.');
        if (!/[A-Z]/.test(password)) errors.push('Debe contener al menos una letra mayúscula.');
        if (!/\d/.test(password)) errors.push('Debe contener al menos un número.');
        return errors;
    };

    const passwordErrors = validatePassword(form_state.password);

    const handleResetPassword = async (event) => {
        event.preventDefault();
    
        if (passwordErrors.length > 0) {
            setTouched(true);
            return;
        }
    
        try {
            const response = await fetch(
                `${ENVIROMENT.API_URL}/api/auth/reset-password?reset_token=${resetToken}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ password: form_state.password }),
                }
            );
    
            const data = await response.json();
    
            setStatus(data.ok ? 'success' : 'error');
            setMessage(data.message);
    
            if (data.ok) {
                setTimeout(() => navigate('/login'), 3000);
            }
        } catch (error) {
            setStatus('error');
            setMessage('Error en la conexión con el servidor.');
        }
    };

    useEffect(() => {
        if (data && data.ok) {
            setStatus('success');
            setMessage('Contraseña cambiada correctamente. Redirigiendo...');
            setTimeout(() => navigate('/login'), 3000);
        } else if (error) {
            setStatus('error');
            setMessage('Error en la conexión con el servidor.');
        }
    }, [data, error, navigate]);

    return (
        <main className='auth-screen'>
            <form onSubmit={handleResetPassword} className='auth-form'>
                <div className='logo-name-login'>
                    <div className='logo-container-login logo-circle'>
                        <Link to='/home' className='logo'>
                            <img src='/assets/ruta-latina-logo-hq.png' alt='Logo' />
                        </Link>
                    </div>
                </div>
                <h1 className='title'>Restablecer Contraseña</h1>

                {status === 'success' ? (
                    <p className='success-message'>
                        {message} <br />
                        Redirigiendo al login...
                    </p>
                ) : (
                    <>
                        <div className='input-container password-container'>
                            <label htmlFor='password'>Nueva contraseña:</label>
                            <div className='password-wrapper'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    id='password'
                                    placeholder='Ingresa tu nueva contraseña'
                                    value={form_state.password}
                                    onChange={handleChangeInput}
                                    onBlur={() => setTouched(true)}
                                />
                                <button 
                                    type="button" 
                                    className='password-toggle' 
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <OcultPassword /> : <ViewPassword />}
                                </button>
                            </div>
                            {touched && passwordErrors.length > 0 && (
                                <div className='error-message'>
                                    {passwordErrors.map((err, idx) => (
                                        <p key={idx}>{err}</p>
                                    ))}
                                </div>
                            )}
                        </div>
                        <button
                            type='submit'
                            className='submit-btn'
                            disabled={passwordErrors.length > 0 || loading}
                        >
                            {loading ? 'Cambiando...' : 'Cambiar Contraseña'}
                        </button>
                        {message && (
                            <p className={status === 'success' ? 'success-message' : 'error-message'}>
                                {message}
                            </p>
                        )}
                    </>
                )}
            </form>
        </main>
    );
};

export default ResetPassword;
