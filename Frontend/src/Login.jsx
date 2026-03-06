import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Wrap async call in a separate function to safely use try/catch
        const loginUser = async () => {
            try {
                const res = await fetch('https://my-login-page-cemv.onrender.com/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });

                const data = await res.json();

                if (data.message === "Login successful") {
                    alert('Login successful!');
                    navigate('/dashboard'); // redirect
                } else {
                    alert(data.error || 'Login failed!');
                }
            } catch (err) {
                alert('Network error: ' + err.message);
            }
        };

        loginUser(); // call the async function
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Login</button>
        </form>
    );
}