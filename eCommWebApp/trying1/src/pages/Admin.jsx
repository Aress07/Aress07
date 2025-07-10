import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext'; 
import { Navigate } from 'react-router-dom';

function Admin() {
    const { token, user } = useAuth();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const [editProductId, setEditProductId] = useState(null);
    const [editCategoryId, setEditCategoryId] = useState(null);

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
        try {
            setLoading(true);
            const [productsRes, categoriesRes] = await Promise.all([
                fetch('http://localhost:8080/api/products', {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                fetch('http://localhost:8080/api/categories', {
                    headers: { Authorization: `Bearer ${token}` }
                })
            ]);

            const productsJson = await productsRes.json();
            const categoriesJson = await categoriesRes.json();

            setProducts(productsJson?.data?.content || []);
            setCategories(categoriesJson?.data || []);
        } catch (error) {
            console.error('Error loading admin data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!token || !isAdmin) return;
        fetchAllData();
    }, [token, isAdmin]);

    const handleDelete = async (type, id) => {
        const endpoint = type === 'product'
            ? `http://localhost:8080/api/products/${id}`
            : `http://localhost:8080/api/categories/${id}`;

        try {
            const res = await fetch(endpoint, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.ok) {
                if (type === 'product') {
                    setProducts(prev => prev.filter(p => p.id !== id));
                } else {
                    setCategories(prev => prev.filter(c => c.id !== id));
                }
            } else {
                console.error(`Failed to delete ${type} with ID ${id}`);
            }
        } catch (error) {
            console.error(`Error deleting ${type} with ID ${id}:`, error);
        }
    };

    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch {
            return false;
        }
    };    
    
    const handleCreateOrUpdateProduct = async (e) => {
        e.preventDefault();

        const price = parseFloat(newProduct.price);
        const quantity = parseInt(newProduct.quantity);
        const categoryId = parseInt(newProduct.categoryId);

        if (!newProduct.name || isNaN(price) || isNaN(quantity) || isNaN(categoryId)) {
            console.error("Invalid product data before sending");
            return;
        }

        const productData = {
            name: newProduct.name,
            price,
            quantity,
            description: newProduct.description,
            categoryId, 
        };

        if (newProduct.imageUrl && newProduct.imageUrl.trim() !== '') {
            productData.imageUrl = newProduct.imageUrl.trim();
        }

        console.log("Sending payload to backend:", productData); 

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
                console.error('Backend error:', errorText);
                throw new Error('Failed to create/update product');
            }

            await fetchAllData();

            setNewProduct({
                name: '',
                price: '',
                quantity: '',
                description: '',
                imageUrl: '',
                categoryId: '',
            });
            setEditProductId(null);
        } catch (error) {
            console.error('Error creating/updating product:', error);
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
    };

    const handleCreateOrUpdateCategory = async (e) => {
        e.preventDefault();

        if (!newCategory.name.trim()) {
            console.error("Category name required");
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
                body: JSON.stringify({name: newCategory.name})
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.errror("Backend error:", errorText);
                throw new Error("Failed to create/update category");
            }

            await fetchAllData();

            setNewCategory({ name: ''});
            setEditCategoryId(null);
        } catch (error) {
            console.error("Error creating/updating category:", error);
        }
    };
    
    const startEditCategory = (category) => {
        setEditCategoryId(category.id);
        setNewCategory({ name: category.name });
    };

    if (!token || !isAdmin) {
        return <div>No Access</div>;
    }

    if (loading) return <div>Loading admin panel...</div>;

    return (
        <div>
            <h1>Admin Panel</h1>

            <section>
                <h2>Products</h2>
                <form onSubmit={handleCreateOrUpdateProduct} style={{ marginBottom: '20px'}}>
                    <input 
                        type="text"
                        placeholder="Product Name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({...newProduct, name: e.target.value })}
                        required
                    />
                    <input 
                        type="number"
                        placeholder="Price"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        required 
                    />
                    <input 
                        type="number"
                        placeholder="Quantity"
                        value={newProduct.quantity}
                        onChange={(e) => setNewProduct({...newProduct, quantity: e.target.value})}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={newProduct.imageUrl}
                        onChange={(e) => setNewProduct({...newProduct, imageUrl: e.target.value})}
                    />
                    <textarea
                        placeholder="Description"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                        required 
                    />
                    <select 
                        value={newProduct.categoryId}
                        onChange={(e) => setNewProduct({...newProduct, categoryId: e.target.value })}
                        required 
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                    <button type="submit">{editProductId ? 'Update Product' : 'Create Product'}</button>
                    {editProductId && <button type="button" onClick={() => {
                        setEditProductId(null);
                        setNewProduct({ name: '', price: '', quantity: '', description: '', imageUrl: '', categoryId: '' });
                    }}>Cancel</button>}
                </form>

                <ul>
                    {products.map((p) => (
                        <li key={p.id}>
                            <strong>{p.name}</strong> - {p.price} MAD<br />
                            Quantity: {p.quantity}<br />
                            {p.description && <>Description: {p.description}<br /></>}
                            {p.imageUrl && <img src={p.imageUrl} alt={p.name} width="100" />}<br />
                            <button onClick={() => handleDelete('product', p.id)}>Delete</button>
                            <button onClick={() => startEditProduct(p)}>Edit</button>
                        </li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Categories</h2>
                <form onSubmit={handleCreateOrUpdateCategory} style={{marginBottom: '20px'}}>
                    <input
                        type="text"
                        placeholder="Category Name"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({name: e.target.value})}
                        required 
                    />
                    <button type="submit">{editCategoryId ? 'Update Category' : 'Create Category'}</button>
                    {editCategoryId && <button type="button" onClick={() => {
                        setEditCategoryId(null);
                        setNewCategory({ name: '' });
                    }}>Cancel</button>}
                </form>
                <ul>
                    {categories.map((c) => (
                        <li key={c.id}>
                            {c.name}
                            <button onClick={() => handleDelete('category', c.id)}>Delete</button>
                            <button onClick={() => startEditCategory(c)}>Edit</button>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}

export default Admin;
