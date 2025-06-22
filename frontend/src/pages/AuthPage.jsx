// src/pages/AuthPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authService'; // Make sure this path is correct
import './AuthPage.css';

function AuthPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email || !password) return;

        const result = await login(email, password);
        console.log('Login result:', result);

        if (result.success) {
            localStorage.setItem('userEmail', result.data.email);
            navigate('/booking');
        } else {
            alert(`Login failed: ${result.error}`);
        }
    };

    return (
        <div className="auth-form">
            <h1>Login page</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="auth-submit-btn" onClick={handleLogin}>
                Submit
            </button>
        </div>
    );
}

export default AuthPage;