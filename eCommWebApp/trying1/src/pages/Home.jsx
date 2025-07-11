import { useAuth } from '../context/AuthContext.jsx';
import { Link } from 'react-router-dom';

function Home() {
    const { user, isAuthenticated } = useAuth();
    const isAdmin = user && user.role === 'ADMIN';

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4 text-center
                        bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">

            <h1 className="text-5xl font-extrabold mb-6 text-gray-800 dark:text-white">Welcome to TechNexus!</h1>

            {isAuthenticated ? (
                <p className="text-xl mb-8 text-gray-700 dark:text-gray-300 max-w-2xl">
                    Hello, <strong className="font-semibold text-blue-600 dark:text-blue-400">{user?.name || 'Explorer'}</strong>! Discover a wide range of exclusive tech products and amazing deals below. Your next favorite item awaits!
                </p>
            ) : (
                <p className="text-xl mb-8 text-gray-700 dark:text-gray-300 max-w-2xl">
                    Unlock a world of incredible products! Please{' '}
                    <Link to="/login" className="text-blue-600 hover:underline font-semibold dark:text-blue-400">Login</Link> or{' '}
                    <Link to="/register" className="text-purple-600 hover:underline font-semibold dark:text-purple-400">Register</Link> to start your shopping journey and explore our curated collections.
                </p>
            )}

            <div className="space-x-4 flex justify-center flex-wrap gap-4">
                <Link
                    to="/products"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg
                               transition-transform duration-200 transform hover:scale-105 shadow-md hover:shadow-lg
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                >
                    Explore Products 📦
                </Link>

                {!isAuthenticated ? (
                    <>
                        <Link
                            to="/login"
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg
                                       transition-transform duration-200 transform hover:scale-105 shadow-md hover:shadow-lg
                                       focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
                        >
                            Log In 🔑
                        </Link>
                        <Link
                            to="/register"
                            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg
                                       transition-transform duration-200 transform hover:scale-105 shadow-md hover:shadow-lg
                                       focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75"
                        >
                            Sign Up! 🎉
                        </Link>
                    </>
                ) : (
                    isAdmin && ( 
                        <Link
                            to="/admin"
                            className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg
                                   transition-transform duration-200 transform hover:scale-105 shadow-md hover:shadow-lg
                                   focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75"
                        >
                            My Dashboard ⚙️
                        </Link>
                    )
                )}
            </div>

            <div className="mt-12 text-gray-600 dark:text-gray-400 text-lg">
                <p>&copy; {new Date().getFullYear()} TechNexus. Quality products, unbeatable prices. Your satisfaction, our priority.</p>
            </div>
        </div>
    );
}

export default Home;