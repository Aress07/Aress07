import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); 
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); 

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const res = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, email }), 
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Registration failed. Please try again.");
            }

            navigate('/login');
        } catch (err) {
            setError(err.message); 
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md text-gray-900 dark:text-gray-100">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">Register</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Choose a username"
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
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
                            placeholder="Choose a password"
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your password"
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                            required
                        />
                    </div>
                    {error && <p className="text-red-600 dark:text-red-400 text-sm mt-2">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                    >
                        Register
                    </button>
                </form>

                <p className="text-center text-sm mt-4 text-gray-700 dark:text-gray-300">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-600 hover:underline dark:text-blue-400">Login here</Link>
                </p>
            </div>
        </div>
    );
}