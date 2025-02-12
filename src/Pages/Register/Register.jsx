import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useForm from '../../hooks/useForm'
import { useFetch } from '../../hooks/useFetch'
import ENVIROMENT from '../../utils/constants/enviroment'
import { OcultPassword, ViewPassword } from '../../Icons'
import './Register.css'

const Register = () => {
    const navigate = useNavigate()
    const { form_state, handleChangeInput } = useForm({username: '', email: '', password: ''})
    const [errorMessage, setErrorMessage] = useState(null)
    const [touchedFields, setTouchedFields] = useState({username: false, email: false, password: false})
    const [showPassword, setShowPassword] = useState(false)

    const { loading, data, error, callFetch } = useFetch(
        `${ENVIROMENT.API_URL}/api/auth/register`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form_state),
        },
        [],
        false
    )

    const handleSubmitForm = async (event) => {
        event.preventDefault()
        callFetch()

    }

    useEffect(() => {
        if (data && data.ok) {
            alert('Registro exitoso. Verifica tu correo electrónico.')
            navigate('/login')

        }
        if (error || (data && !data.ok)) {
            setErrorMessage(data?.message || 'Error en el registro. Verifica los datos ingresados.')

        }

    }, [data, error, navigate])

    const handleBlur = (event) => {
        setTouchedFields({ ...touchedFields, [event.target.name]: true })
    }

    const errores = {
        username: [],
        email: [],
        password: [],
    }

    if (!form_state.username || !/^[a-zA-Z0-9_]{3,20}$/.test(form_state.username)) {
        errores.username.push('El nombre de usuario debe ser alfanumérico y tener entre 3-20 caracteres.')

    }
    if (!form_state.email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form_state.email)) {
        errores.email.push('Debes ingresar un email válido.')
        
    }
    if (form_state.email.length > 30){
        errores.email.push('El límite de caracteres es 30')

    }
    if (form_state.email.length < 5){
        errores.email.push('El mínimo de caracteres es 5')

    }

    if (!form_state.password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(form_state.password)) {
        errores.password.push('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.')
        
    }

    return (
        <main className='auth-screen'>
            <form className='auth-form' onSubmit={handleSubmitForm}>
                <div className='logo-name-login'>
                    <div className='logo-container-login logo-circle'>
                        <Link to='/home' className='logo'>
                            <img
                                src='/assets/ruta-latina-logo-hq.png'
                                alt='Logo'
                            />
                        </Link>
                    </div>
                </div>
                <h1 className='title'>Regístrate</h1>
                {errorMessage && (
                    <p className='error-message'>{errorMessage}</p>
                )}
                <div className='input-container'>
                    <label htmlFor='username'>Nombre de usuario:</label>
                    <input
                        name='username'
                        id='username'
                        placeholder='Tu nombre de usuario'
                        value={form_state.username}
                        onChange={handleChangeInput}
                        onBlur={handleBlur}
                    />
                    {touchedFields.username && errores.username.length > 0 && (
                        <p className='error-message small-text'>
                            {errores.username[0]}
                        </p>
                    )}
                </div>
                <div className='input-container'>
                    <label htmlFor='email'>Correo electrónico:</label>
                    <input
                        name='email'
                        id='email'
                        placeholder='joedoe@email.com'
                        value={form_state.email}
                        onChange={handleChangeInput}
                        onBlur={handleBlur}
                    />
                    {touchedFields.email && errores.email.length > 0 && (
                        <p className='error-message small-text'>
                            {errores.email[0]}
                        </p>
                    )}
                </div>
                <div className='input-container password-container'>
                    <label htmlFor='password'>Contraseña:</label>
                    <div className='password-wrapper'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name='password'
                            id='password'
                            value={form_state.password}
                            onChange={handleChangeInput}
                            onBlur={handleBlur}
                        />
                        <button
                            type='button'
                            className='password-toggle'
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <OcultPassword />
                            ) : (
                                <ViewPassword />
                            )}
                        </button>
                    </div>
                    {touchedFields.password && errores.password.length > 0 && (
                        <p className='error-message small-text'>
                            {errores.password[0]}
                        </p>
                    )}
                </div>
                <button
                    type='submit'
                    className='submit-btn'
                    disabled={
                        loading ||
                        errores.username.length ||
                        errores.email.length ||
                        errores.password.length ||
                        !form_state.username ||
                        !form_state.email ||
                        !form_state.password
                    }
                >
                    {loading ? 'Registrando...' : 'Registrarse'}
                </button>
                <div className='extra-links'>
                    <span>
                        ¿Ya tienes cuenta?{' '}
                        <Link to={'/login'} className='link'>
                            Inicia sesión
                        </Link>
                    </span>
                </div>
            </form>
        </main>
    )
}

export default Register
