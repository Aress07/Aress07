import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx'; 

function ProductDetails() {
    const { id } = useParams();
    const { token } = useAuth();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    useEffect(() => {
        async function fetchProduct() {
            setLoading(true); 
            setProduct(null); 
            setError(null);   

            try {
                if (!token) {
                    throw new Error("Authentication token not available. Please log in.");
                }
                if (!id) {
                    throw new Error("Product ID is missing from the URL.");
                }

                const res = await fetch(`http://localhost:8080/api/products/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message || `Failed to fetch product details: ${res.status}`);
                }

                const json = await res.json();
                console.log("Fetched product details:", json);

                setProduct(json.data);
            } catch (err) {
                console.error('Failed to fetch product:', err);
                setError(err.message || 'An unexpected error occurred while fetching product details.');
                setProduct(null); 
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [id, token]); 

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 transition-colors duration-300">
                <p className="text-xl font-semibold">Loading product details... 🔍</p>
            </div>
        );
    }


    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-md transition-colors duration-300">
                <p className="text-xl font-semibold mb-4">Error: {error}</p>
                <p>Please ensure the product ID is valid and you are logged in.</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors duration-300 p-4">
                <p className="text-xl font-semibold mb-4">Product not found. 🤷‍♀️</p>
                <p className="text-md">The product you are looking for might not exist or has been removed.</p>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-64px)] py-12 px-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <div className="max-w-5xl mx-auto bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl p-8 flex flex-col md:flex-row items-start gap-10"> 

                <div className="w-full md:w-1/2 flex items-center justify-center p-4 bg-white dark:bg-gray-900 rounded-lg shadow-inner"> 
                    <img
                        src={product.imageUrl ? `http://localhost:8080${product.imageUrl}` : 'https://via.placeholder.com/400x300?text=No+Image+Available'}
                        alt={product.name}
                        className="w-full max-h-[28rem] object-contain rounded-lg border border-gray-300 dark:border-gray-600" 
                    />
                                    </div>

                <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left pt-4">
                    <h2 className="text-5xl font-extrabold mb-4 text-gray-900 dark:text-white leading-tight">{product.name}</h2> 

                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                        <strong className="font-semibold text-gray-800 dark:text-white">Description:</strong> {product.description || 'No description available.'}
                    </p>

                    <div className="mb-6"> 
                        <p className="text-4xl font-bold text-green-600 dark:text-green-400">
                            {product.price ? `${product.price.toFixed(2)} MAD` : 'N/A'}
                        </p>
                    </div>

                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
                        <strong className="font-semibold text-gray-800 dark:text-white">Quantity:</strong> {product.quantity !== undefined ? product.quantity : 'N/A'}
                    </p>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-6"> 
                        <strong className="font-semibold text-gray-800 dark:text-white">Category:</strong> {product.categoryName || 'N/A'}
                    </p>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                        <strong className="font-semibold">Added On:</strong> {product.createdAt ? new Date(product.createdAt).toLocaleString() : 'N/A'}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;