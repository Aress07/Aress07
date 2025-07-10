import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext'; 
import { Navigate } from 'react-router-dom';

function Admin() {
    const { token, user } = useAuth();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    

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

    useEffect(() => {
        if (!token || !isAdmin) return;

        const fetchData = async () => {
            try {
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

        fetchData();
    }, [token, isAdmin]);

    const handleDelete = async (type, id) => {
        const endpoint = 
            type === 'product'
            ? `http://localhost:8080/api/products/${id}`
            : `http://localhost:8080/api/categories/${id}`;

        try {
            const res = await fetch(endpoint, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
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

    const handleCreateProduct = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8080/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: newProduct.name,
                    price: parseFloat(newProduct.price),
                    quantity: parseInt(newProduct.quantity),
                    description: newProduct.description,
                    imageUrl: newProduct.imageUrl,
                    categoryId: parseInt(newProduct.categoryId)
                })
            });

            if (!res.ok) {
                throw new Error('Failed to create product');
            }

            const result = await res.json();
            setProducts(prev => [...prev, result.data]);
            setNewProduct({ 
                name: '', 
                price: '',
                quantity: '',
                description: '',
                imageUrl: '', 
                categoryId: ''
            });
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    const handleCreateCategory = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8080/api/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: newCategory.name
                })
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.error('Create category failed with response:', errorText);
                throw new Error('Failed to create category');
            }

            const result = await res.json();
            console.log('Created category:', result.data);

            setNewCategory({name: ''});

            fetchAllData();
        } catch (error) {
            console.error("Error creating category: ", error);
        }
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
                <form onSubmit={handleCreateProduct} style={{ marginBottom: '20px'}}>
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
                    <button type="submit">Create Product</button>
                </form>

                <ul>
                    {products.map((p) => (
                        <li key={p.id}>
                            <strong>{p.name}</strong> - {p.price} MAD<br />
                            Quantity: {p.quantity}<br />
                            {p.description && <>Description: {p.description}<br /></>}
                            {p.imageUrl && <img src={p.imageUrl} alt={p.name} width="100" />}<br />
                            <button onClick={() => handleDelete('product', p.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Categories</h2>
                <form onSubmit={handleCreateCategory} style={{marginBottom: '20px'}}>
                    <input
                    type="text"
                    placeholder="Category Name"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({name: e.target.value})}
                    required 
                    />
                    <button type="submit">Create Category</button>
                </form>
                <ul>
                    {categories.map((c) => (
                        <li key={c.id}>
                            {c.name}
                            <button onClick={() => handleDelete('category', c.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}

export default Admin;