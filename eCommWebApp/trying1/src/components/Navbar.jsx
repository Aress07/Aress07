import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import ThemeToggle from './ThemeToggle.jsx';

function Navbar() {
    const { user, logout, isAuthenticated } = useAuth();
    const isAdmin = user && user.role === 'ADMIN';

    return (
        <nav className="bg-blue-600 dark:bg-gray-800 p-4 shadow-lg flex justify-between items-center transition-colors duration-300">
            <div className="text-white text-2xl font-bold">
                <Link to="/" className="hover:text-blue-200 dark:hover:text-gray-400">TechNexus</Link>
            </div>

            <ul className="flex space-x-6 items-center">
                {isAuthenticated ? ( 
                    <>
                        <li>
                            <Link to="/" className="text-white hover:text-blue-200 dark:text-gray-300 dark:hover:text-white transition-colors duration-300">Home</Link>
                        </li>
                        <li>
                            <Link to="/about" className="text-white hover:text-blue-200 dark:text-gray-300 dark:hover:text-white transition-colors duration-300">About</Link>
                        </li>
                        <li>
                            <Link to="/categories" className="text-white hover:text-blue-200 dark:text-gray-300 dark:hover:text-white transition-colors duration-300">Categories</Link>
                        </li>
                        <li>
                            <Link to="/products" className="text-white hover:text-blue-200 dark:text-gray-300 dark:hover:text-white transition-colors duration-300">Products</Link>
                        </li>
                        {isAdmin && ( 
                            <li>
                                <Link to="/admin" className="text-white hover:text-blue-200 dark:text-gray-300 dark:hover:text-white transition-colors duration-300">Admin</Link>
                            </li>
                        )}
                        <li>
                            <button
                                onClick={logout}
                                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
                            >
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300">Login</Link>
                        </li>
                        <li>
                            <Link to="/register" className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300">Register</Link>
                        </li>
                    </>
                )}
                <li>
                    <ThemeToggle />
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;