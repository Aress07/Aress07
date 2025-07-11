import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx'; 
import { Navigate } from 'react-router-dom';

function Admin() {
    const { token, user } = useAuth();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [editProductId, setEditProductId] = useState(null);
    const [editCategoryId, setEditCategoryId] = useState(null);

    const [selectedFile, setSelectedFile] = useState(null);

    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        quantity: '',
        description: '',
        imageUrl: '', 
        categoryId: ''
    });

    const [newCategory, setNewCategory] = useState({
        name: ''
    });

    const isAdmin = user?.role === 'ADMIN';

    const fetchAllData = async () => {
        setLoading(true);
        setError(null);
        try {
            if (!token) {
                throw new Error("Authentication token not available. Please log in.");
            }

            const [productsRes, categoriesRes] = await Promise.all([
                fetch('http://localhost:8080/api/products', {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                fetch('http://localhost:8080/api/categories', {
                    headers: { Authorization: `Bearer ${token}` }
                })
            ]);

            if (!productsRes.ok || !categoriesRes.ok) {
                const productError = productsRes.ok ? null : await productsRes.text();
                const categoryError = categoriesRes.ok ? null : await categoriesRes.text();
                throw new Error(`Failed to fetch data: ${productError || categoryError}`);
            }

            const productsJson = await productsRes.json();
            const categoriesJson = await categoriesRes.json();

            setProducts(productsJson?.data?.content || []);
            setCategories(categoriesJson?.data || []);
        } catch (err) {
            console.error('Error loading admin data:', err);
            setError(err.message || "Failed to load admin data.");
            setProducts([]);
            setCategories([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token && isAdmin) {
            fetchAllData();
        } else if (!isAdmin && user) { 
            setError("You do not have administrative access.");
            setLoading(false);
        } else if (!token && !user) { 
            setLoading(false);
        }
    }, [token, isAdmin, user]);

    const handleDelete = async (type, id) => {
        if (!window.confirm(`Are you sure you want to delete this ${type}?`)) {
            return;
        }

        const endpoint = type === 'product'
            ? `http://localhost:8080/api/products/${id}`
            : `http://localhost:8080/api/categories/${id}`;

        try {
            const res = await fetch(endpoint, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.ok) {
                fetchAllData(); 
            } else {
                const errorText = await res.text();
                console.error(`Failed to delete ${type} with ID ${id}:`, errorText);
                setError(`Failed to delete ${type}: ${errorText}`);
            }
        } catch (err) {
            console.error(`Error deleting ${type} with ID ${id}:`, err);
            setError(`Error deleting ${type}: ${err.message}`);
        }
    };

    const handleCreateOrUpdateProduct = async (e) => {
        e.preventDefault();
        setError(null);

        const price = parseFloat(newProduct.price);
        const quantity = parseInt(newProduct.quantity);
        const categoryId = parseInt(newProduct.categoryId);

        if (!newProduct.name.trim() || isNaN(price) || isNaN(quantity) || isNaN(categoryId) || !newProduct.description.trim()) {
            setError("All product fields (Name, Price, Quantity, Description, Category) are required and must be valid.");
            return;
        }

        let uploadedImageUrl = newProduct.imageUrl; 

        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile); 

            try {
                const uploadRes = await fetch('http://localhost:8080/api/images/upload', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                });

                if (!uploadRes.ok) {
                    const uploadErrorText = await uploadRes.text();
                    throw new Error(`Failed to upload image: ${uploadErrorText}`);
                }
                const uploadJson = await uploadRes.json();
                uploadedImageUrl = uploadJson.url; 
                console.log("Image uploaded to:", uploadedImageUrl);
            } catch (uploadErr) {
                console.error("Image upload error:", uploadErr);
                setError(uploadErr.message || "Failed to upload image.");
                return; 
            }
        }

        const productData = {
            name: newProduct.name.trim(),
            price,
            quantity,
            description: newProduct.description.trim(),
            categoryId,
            imageUrl: uploadedImageUrl 
        };

        console.log("Sending product payload to backend:", productData);

        try {
            const method = editProductId ? 'PUT' : 'POST';
            const url = editProductId
                ? `http://localhost:8080/api/products/${editProductId}`
                : 'http://localhost:8080/api/products';

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json', 
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(productData),
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.error('Backend error (product):', errorText);
                throw new Error(`Failed to ${editProductId ? 'update' : 'create'} product: ${errorText}`);
            }

            await fetchAllData();

            setNewProduct({
                name: '', price: '', quantity: '', description: '', imageUrl: '', categoryId: '',
            });
            setSelectedFile(null); 
            setEditProductId(null);
        } catch (err) {
            console.error('Error creating/updating product:', err);
            setError(err.message || "An error occurred while saving product.");
        }
    };

    const startEditProduct = (product) => {
        setEditProductId(product.id);
        setNewProduct({
            name: product.name || '',
            price: product.price?.toString() || '',
            quantity: product.quantity?.toString() || '',
            description: product.description || '',
            imageUrl: product.imageUrl || '',
            categoryId: product.categoryId?.toString() || ''
        });
        setSelectedFile(null); 
        setError(null);
    };

    const handleCreateOrUpdateCategory = async (e) => {
        e.preventDefault();
        setError(null); 

        if (!newCategory.name.trim()) {
            setError("Category name is required.");
            return;
        }

        try {
            const method = editCategoryId ? 'PUT' : 'POST';
            const url = editCategoryId
                ? `http://localhost:8080/api/categories/${editCategoryId}`
                : `http://localhost:8080/api/categories`;

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ name: newCategory.name.trim() })
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.error("Backend error (category):", errorText);
                throw new Error(`Failed to ${editCategoryId ? 'update' : 'create'} category: ${errorText}`);
            }

            await fetchAllData(); 
            setNewCategory({ name: '' });
            setEditCategoryId(null);
        } catch (err) {
            console.error("Error creating/updating category:", err);
            setError(err.message || "An error occurred while saving category.");
        }
    };
    const startEditCategory = (category) => {
        setEditCategoryId(category.id);
        setNewCategory({ name: category.name || '' });
        setError(null);
    };

    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    if (!isAdmin) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-8 rounded-md transition-colors duration-300 text-center">
                <i className="fas fa-exclamation-triangle text-6xl mb-4"></i>
                <h1 className="text-3xl font-bold mb-3">Access Denied!</h1>
                <p className="text-xl">You do not have administrative privileges to view this page.</p>
                <p className="mt-4 text-lg">Please log in with an administrator account.</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 transition-colors duration-300">
                <p className="text-xl font-semibold">Loading admin panel... ⚙️</p>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-64px)] py-12 px-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-5xl font-extrabold text-center mb-10 text-gray-800 dark:text-white">
                    Admin Panel <i className="fas fa-user-shield ml-3 text-blue-600 dark:text-blue-400"></i>
                </h1>

                {error && (
                    <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-200 px-4 py-3 rounded relative mb-6" role="alert">
                        <strong className="font-bold mr-2">Error!</strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <section className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 mb-10 border border-gray-200 dark:border-gray-700">
                    <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white flex items-center">
                        <i className="fas fa-boxes mr-3 text-purple-600 dark:text-purple-400"></i> Manage Products
                    </h2>

                    <form onSubmit={handleCreateOrUpdateProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner border border-gray-100 dark:border-gray-600">
                        <input
                            type="text"
                            placeholder="Product Name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            step="0.01" 
                            required
                        />
                        <input
                            type="number"
                            placeholder="Quantity"
                            value={newProduct.quantity}
                            onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        {/* Image Upload Input */}
                        <div className="col-span-1 md:col-span-2">
                            <label htmlFor="product-image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Product Image (Upload)</label>
                            <input
                                type="file"
                                id="product-image"
                                onChange={(e) => setSelectedFile(e.target.files[0])}
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                accept="image/*" 
                            />
                            {selectedFile && (
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Selected: {selectedFile.name}</p>
                            )}
                            {editProductId && newProduct.imageUrl && !selectedFile && ( 
                                <div className="mt-4">
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Current Image:</p>
                                    <img src={`http://localhost:8080${newProduct.imageUrl}`} alt="Current Product" className="w-32 h-32 object-cover rounded-md border border-gray-300" />
                                </div>
                            )}
                        </div>
                        <textarea
                            placeholder="Description"
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-1 md:col-span-2 min-h-[80px]"
                            required
                        />
                        <select
                            value={newProduct.categoryId}
                            onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-1 md:col-span-2"
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        <div className="col-span-1 md:col-span-2 flex justify-end gap-3 mt-4">
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 text-lg shadow-md"
                            >
                                {editProductId ? 'Update Product' : 'Create Product'}
                            </button>
                            {editProductId && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditProductId(null);
                                        setNewProduct({ name: '', price: '', quantity: '', description: '', imageUrl: '', categoryId: '' });
                                        setSelectedFile(null); 
                                    }}
                                    className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 text-lg shadow-md"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.length === 0 ? (
                            <p className="col-span-full text-center text-gray-600 dark:text-gray-400">No products available.</p>
                        ) : (
                            products.map((p) => (
                                <div key={p.id} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-600 flex flex-col">
                                    <img
                                        src={p.imageUrl ? `http://localhost:8080${p.imageUrl}` : 'https://via.placeholder.com/150x100?text=No+Image'}
                                        alt={p.name}
                                        className="w-full h-32 object-contain rounded-md mb-4 border border-gray-300 dark:border-gray-500"
                                    />
                                    <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{p.name}</h3>
                                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">
                                        <strong>Price:</strong> {p.price?.toFixed(2) || 'N/A'} MAD
                                    </p>
                                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">
                                        <strong>Quantity:</strong> {p.quantity !== undefined ? p.quantity : 'N/A'}
                                    </p>
                                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                                        <strong>Description:</strong> {p.description || 'N/A'}
                                    </p>
                                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                                        <strong>Category:</strong> {categories.find(cat => cat.id === p.categoryId)?.name || 'N/A'}
                                    </p>
                                    <div className="mt-auto flex justify-end gap-2">
                                        <button
                                            onClick={() => startEditProduct(p)}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete('product', p.id)}
                                            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>

                <hr className="my-10 border-gray-300 dark:border-gray-700" />
                <section className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 mb-10 border border-gray-200 dark:border-gray-700">
                    <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white flex items-center">
                        <i className="fas fa-tags mr-3 text-teal-600 dark:text-teal-400"></i> Manage Categories
                    </h2>
                    <form onSubmit={handleCreateOrUpdateCategory} className="flex flex-col md:flex-row gap-4 mb-10 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner border border-gray-100 dark:border-gray-600 items-end">
                        <input
                            type="text"
                            placeholder="Category Name"
                            value={newCategory.name}
                            onChange={(e) => setNewCategory({ name: e.target.value })}
                            className="flex-grow p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <div className="flex gap-3">
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 text-lg shadow-md"
                            >
                                {editCategoryId ? 'Update Category' : 'Create Category'}
                            </button>
                            {editCategoryId && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditCategoryId(null);
                                        setNewCategory({ name: '' });
                                    }}
                                    className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 text-lg shadow-md"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>

                    <div className="space-y-4">
                        {categories.length === 0 ? (
                            <p className="text-center text-gray-600 dark:text-gray-400">No categories available.</p>
                        ) : (
                            categories.map((c) => (
                                <div key={c.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-600 flex justify-between items-center">
                                    <span className="text-lg font-medium text-gray-800 dark:text-white">{c.name}</span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => startEditCategory(c)}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete('category', c.id)}
                                            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Admin;