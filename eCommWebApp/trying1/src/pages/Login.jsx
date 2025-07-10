import {useState} from 'react';
import {useAuth} from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';


export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {login} = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (!res.ok) throw new Error('Login failed');

            const data = await res.json();
            console.log("Login response body:", data);

            const { token, username: returnedUsername, role } = data.data;

            if (!token) throw new Error("Token missing in response");

            login(returnedUsername, role, token);

            navigate('/');
        } catch (err) {
            console.error(err);
            setError('Invalid credentials');
        }
    };


    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="text"
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Username" required />
                <input type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password' required />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
    );
}