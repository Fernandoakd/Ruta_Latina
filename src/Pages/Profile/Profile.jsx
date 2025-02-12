import React, { useContext, useEffect, useState } from "react";
import { Header, Footer } from "../../Components";
import ENVIROMENT from "../../utils/constants/enviroment";
import { useFetch } from "../../hooks/useFetch";
import { AuthContext } from "../../Context/AuthContext"; 
import "./Profile.css";

const Profile = () => {
    const { user } = useContext(AuthContext); 
    const { callFetch, data, loading, error } = useFetch(
        `${ENVIROMENT.API_URL}/api/orders/my-orders`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
            },
        },
        [],
        true
    );

    const [passwordMessage, setPasswordMessage] = useState({ text: "", type: "" });

    useEffect(() => {
        callFetch();
    }, []);

    const handleResetPassword = async () => {
        try {
            const response = await fetch(`${ENVIROMENT.API_URL}/api/auth/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: user?.email }),
            });
            const result = await response.json();

            if (result.ok) {
                setPasswordMessage({ text: "Correo de recuperación enviado con éxito.", type: "success" });
            } else {
                setPasswordMessage({ text: result.message || "Error al enviar el correo.", type: "error" });
            }
        } catch (error) {
            setPasswordMessage({ text: "Error en el servidor. Inténtalo de nuevo más tarde.", type: "error" });
        }
    };

    return (
        <>
            <Header />
            <main className="profile-container">
                
                <div className="profile-section">
                    <h2>Mi Perfil</h2>
                    {user ? (
                        <div className="profile-info">
                            <p><strong>Usuario:</strong> {user.username}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <button className="reset-password-btn" onClick={handleResetPassword}>
                                Cambiar contraseña
                            </button>
                            {passwordMessage.text && (
                                <p className={`password-message ${passwordMessage.type}`}>
                                    {passwordMessage.text}
                                </p>
                            )}
                        </div>
                    ) : (
                        <p>Cargando perfil...</p>
                    )}
                </div>

                <div className="reservations-section">
                    <h2>Mis Reservas</h2>
                    {loading && <p>Cargando órdenes...</p>}
                    {error && <p>Error al cargar órdenes.</p>}
                    {data?.orders?.length > 0 ? (
                        <div className="orders-list">
                            {data.orders.map((order) => (
                                <div key={order._id} className="order-card">
                                    <img src={order.package.package_img} alt={order.package.destTitle} />
                                    <div className="order-info">
                                        <h3>{order.package.destTitle}</h3>
                                        <p><strong>Ubicación:</strong> {order.package.location}</p>
                                        <p><strong>Precio:</strong> ${order.package.fees}</p>
                                        <p><strong>Fecha de reserva:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                                        <p><strong>Estado:</strong> <span className={`status-${order.status.toLowerCase()}`}>{order.status}</span></p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        !loading && <p>No tienes reservas realizadas.</p>
                    )}
                </div>

            </main>
            <Footer />
        </>
    );
};

export default Profile;
