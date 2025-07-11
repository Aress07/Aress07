import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx'; 

function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 
    const { token } = useAuth();

    useEffect(() => {
        async function fetchCategories() {
            setLoading(true); 
            setError(null); 
            try {
                if (!token) {
                    throw new Error("Authentication token not available. Please log in.");
                }

                const res = await fetch('http://localhost:8080/api/categories', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message || `Failed to fetch categories: ${res.status}`);
                }

                const json = await res.json();
                console.log("Fetched categories:", json);

                setCategories(Array.isArray(json?.data) ? json.data : []);
            } catch (err) {
                console.error("Failed to fetch categories:", err);
                setError(err.message || "An unexpected error occurred while fetching categories.");
                setCategories([]); 
            } finally {
                setLoading(false);
            }
        }

        fetchCategories();
    }, [token]); 

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 transition-colors duration-300">
                <p className="text-xl font-semibold">Loading categories... 🚀</p>
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

    if (!categories || categories.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors duration-300 p-4">
                <p className="text-xl font-semibold mb-4">No categories found. 😔</p>
                <p className="text-md">It looks like there are no categories available at the moment. Please check back later!</p>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-64px)] py-8 px-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-800 dark:text-white">
                    Explore Categories <i className="fas fa-cubes ml-2 text-blue-600 dark:text-blue-400"></i>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                                       rounded-lg shadow-md hover:shadow-xl transition-all duration-300
                                       p-6 flex flex-col items-center justify-center text-center
                                       cursor-default"
                        >

                            <i className={`fas ${getCategoryIcon(category.name)} text-4xl mb-4 text-blue-500 dark:text-blue-300`}></i>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{category.name}</h3> 
                            {category.description && ( 
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{category.description}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


function getCategoryIcon(categoryName) {
    const lowerCaseName = categoryName.toLowerCase();
    if (lowerCaseName.includes('electronics')) return 'fa-desktop';
    if (lowerCaseName.includes('clothing') || lowerCaseName.includes('apparel')) return 'fa-tshirt';
    if (lowerCaseName.includes('books')) return 'fa-book';
    if (lowerCaseName.includes('food')) return 'fa-utensils';
    if (lowerCaseName.includes('home')) return 'fa-home';
    if (lowerCaseName.includes('sports')) return 'fa-dumbbell';
    if (lowerCaseName.includes('beauty')) return 'fa-spa';
    if (lowerCaseName.includes('toys')) return 'fa-toy-dinosaur';
    return 'fa-tag';
}

export default Categories;