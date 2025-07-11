import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx'; 
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
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

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Login failed. Please check your credentials.');
            }

            const data = await res.json();
            console.log("Login response body:", data);

            const { token, username: returnedUsername, role } = data.data || {};

            if (!token) {
                throw new Error("Authentication token missing in response from server.");
            }

            login(returnedUsername, role, token);

            navigate('/'); 
        } catch (err) {
            console.error("Login Error:", err);
            setError(err.message || 'Login failed. An unexpected error occurred.'); 
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md text-gray-900 dark:text-gray-100">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Login</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                            required
                        />
                    </div>

                    {error && <p className="text-red-600 dark:text-red-400 text-sm mt-2">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                    >
                        Login
                    </button>
                </form>

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-blue-600 hover:underline dark:text-blue-400">Register here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}