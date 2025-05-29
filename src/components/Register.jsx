import React, { useState } from 'react';
import colors from '../styles/colors'; 
import '../styles/Register.css';     

export default function Register({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); 

        if (!username || !password || !fullName) {
            setError('Todos los campos son obligatorios.');
            setSuccess('');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.username === username);

        if (userExists) {
            setError('El nombre de usuario ya existe. Por favor, elige otro.');
            setSuccess('');
            return;
        }

        const newUser = { username, password, fullName };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        setSuccess('¡Registro exitoso! Ya puedes iniciar sesión.');
        setError('');
        setUsername('');
        setPassword('');
        setFullName('');
    };

    return (
        <div className="register-container" style={{ backgroundColor: colors.background }}>
            <form className="register-form" onSubmit={handleSubmit}>
                <h2 style={{ color: colors.primary }}>Registro de Usuario</h2>

                {error && <p className="error-message" style={{ backgroundColor: colors.error, color: colors.textLight }}>{error}</p>}
                {success && <p className="success-message" style={{ backgroundColor: colors.success, color: colors.textLight }}>{success}</p>}

                <div className="form-group">
                    <label htmlFor="username" style={{ color: colors.textDark }}>Nombre de Usuario:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ borderColor: colors.primary }}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password" style={{ color: colors.textDark }}>Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ borderColor: colors.primary }}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="fullName" style={{ color: colors.textDark }}>Nombre Completo:</label>
                    <input
                        type="text"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        style={{ borderColor: colors.primary }}
                    />
                </div>

                <button type="submit" style={{ backgroundColor: colors.primary, color: colors.textLight }}>
                    Registrar
                </button>
            </form>
        </div>
    );
};

