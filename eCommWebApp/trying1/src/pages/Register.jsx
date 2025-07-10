import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');  
    const [error, setError] = useState('');  
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, password, email}),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Registration failed");
            }
            
            navigate('/login');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text"
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username" required />
                <input type="email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Choose an email" required />                
                <input type="password" value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Choose a password" required />                
                <button type="submit">Register</button>
            </form>

            {error && <p style={{color: "red"}}>{error}</p>}
            <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
    );
}