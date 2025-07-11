import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Link } from 'react-router-dom';

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 
    const { token } = useAuth();

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            setError(null);   

            try {
                if (!token) {
                    throw new Error("Authentication token not available. Please log in.");
                }

                const res = await fetch('http://localhost:8080/api/products', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message || `Failed to fetch products: ${res.status}`);
                }

                const json = await res.json();
                console.log("Fetched products:", json);

                setProducts(Array.isArray(json.data?.content) ? json.data.content : []);
            } catch (err) {
                console.error("Failed to fetch products:", err);
                setError(err.message || "An unexpected error occurred while fetching products.");
                setProducts([]); 
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();

    }, [token]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 transition-colors duration-300">
                <p className="text-xl font-semibold">Loading products... 📦</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-md transition-colors duration-300">
                <p className="text-xl font-semibold mb-4">Error: {error}</p>
                <p>Please try again later or contact support if the issue persists.</p>
            </div>
        );
    }

    if (!products || products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors duration-300 p-4">
                <p className="text-xl font-semibold mb-4">No products found. 😔</p>
                <p className="text-md">It looks like there are no products available at the moment. Please check back later!</p>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-64px)] py-8 px-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-800 dark:text-white">
                    Our Products <i className="fas fa-box-open ml-2 text-green-600 dark:text-green-400"></i>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                                       rounded-lg shadow-md hover:shadow-xl transition-all duration-300
                                       p-6 flex flex-col items-center text-center group" 
                        >
                            <img
                                src={`http://localhost:8080${product.imageUrl}`}
                                alt={product.name}
                                className="w-full h-40 object-contain mb-4 rounded-md transform group-hover:scale-105 transition-transform duration-300"
                            />
                            

                            <Link to={`/products/${product.id}`} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-xl font-semibold no-underline hover:underline transition-colors duration-200 mb-2">
                                <h3>{product.name}</h3>
                            </Link>

                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                                <strong>Description:</strong> {product.description || 'No description available.'}
                            </p>
                            <p className="text-md font-bold text-gray-800 dark:text-white mb-2">
                                <strong>Price:</strong> {product.price ? `${product.price.toFixed(2)} MAD` : 'N/A'}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                <strong>Quantity:</strong> {product.quantity !== undefined ? product.quantity : 'N/A'}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                <strong>Category:</strong> {product.categoryName || 'N/A'}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-auto">
                                <strong>Created:</strong> {product.createdAt ? new Date(product.createdAt).toLocaleString() : 'N/A'}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Products;