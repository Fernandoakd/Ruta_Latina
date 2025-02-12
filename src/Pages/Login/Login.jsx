import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import useForm from '../../hooks/useForm';
import { useFetch } from '../../hooks/useFetch';
import ENVIROMENT from '../../utils/constants/enviroment';
import { OcultPassword, ViewPassword } from '../../Icons';
import './Login.css';

const Login = () => {
    const { login, isAuthenticatedState } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const { form_state, handleChangeInput } = useForm({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState(null);
    const [touchedFields, setTouchedFields] = useState({ email: false, password: false });
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (isAuthenticatedState) {
            const redirectTo = location.state?.from?.pathname || "/home";
            navigate(redirectTo, { replace: true });
        }
    }, [isAuthenticatedState, navigate, location]);

    const { loading, data, error, callFetch } = useFetch(
        `${ENVIROMENT.API_URL}/api/auth/login`,
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
        callFetch();
    };

    useEffect(() => {
        if (data && data.ok) {
            login(data.data.access_token, data.data.user_info);
        }
        if (error || (data && !data.ok)) {
            setErrorMessage(data?.message || "Error en la autenticación. Verifica tus credenciales.");
        }
    }, [data, error, login]);
    

    const handleBlur = (event) => {
        setTouchedFields({ ...touchedFields, [event.target.name]: true });
    };

    const errores = {
        email: [],
        password: []
    };

    if (!form_state.email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form_state.email)) {
        errores.email.push("Debes ingresar un email válido.");
    }
    if (form_state.email.length > 30) errores.email.push("El límite de caracteres es 30");
    if (form_state.email.length < 5) errores.email.push("El mínimo de caracteres es 5");

    if (!form_state.password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(form_state.password)) {
        errores.password.push("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.");
    }

    return (
        <main className='auth-screen'>
            <form className='auth-form' onSubmit={handleSubmitForm}>
                <div className='logo-name-login'>        
                    <div className='logo-container-login logo-circle'>
                    <Link to='/home' className='logo'>
                        <img src='/assets/ruta-latina-logo-hq.png' alt='Logo' />
                    </Link>
                    </div>
                </div>
                <h1 className='title'>Inicia sesión</h1>
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
                    {touchedFields.email && errores.email.length > 0 && (
                        <p className='error-message small-text'>{errores.email[0]}</p>
                    )}
                </div>
                <div className='input-container password-container'>
                    <label htmlFor='password'>Ingresa tu contraseña:</label>
                    <div className='password-wrapper'>
                        <input 
                            type={showPassword ? "text" : "password"}
                            name='password' 
                            id='password' 
                            value={form_state.password} 
                            onChange={handleChangeInput}
                            onBlur={handleBlur}
                        />
                        <button type="button" className='password-toggle' onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <OcultPassword /> : <ViewPassword />}
                        </button>
                    </div>
                    {touchedFields.password && errores.password.length > 0 && (
                        <p className='error-message small-text'>{errores.password[0]}</p>
                    )}
                </div>
                <button 
                    type='submit' 
                    className='submit-btn'
                    disabled={loading || errores.email.length || errores.password.length || !form_state.email || !form_state.password}
                >
                    {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                </button>
                <div className="extra-links">
                    <span>
                        ¿Aún no tienes cuenta? <Link to={'/register'} className="link">Regístrate</Link>
                    </span>
                    <span>
                        <Link to={'/forgot-password'} className="link">Olvidé mi contraseña</Link>
                    </span>
                </div>
            </form>
        </main>
    );
};

export default Login;
