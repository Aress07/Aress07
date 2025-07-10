import {useEffect, useState} from 'react';
import {useAuth} from '../context/AuthContext';

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch('http://localhost:8080/api/products' ,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                const json = await res.json();
                console.log(json);

                setProducts(Array.isArray(json.data?.content) ? json.data.content : []);
            } catch (error) {
                console.log("Failed to fetch products: ", error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();

    }, [token]);

    if (loading) return <div>Loading products...</div>

    if (!products || products.length === 0) {
        return <p>No products found.</p>
    }

    return (
        <div>
            <h2>Product List</h2>
            <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                {products.map((product) => (
                    <div key={product.id} style={{border: '1px solid #ccc', borderRadius: '10px', padding: '15px'}}>
                        <img
                        src={`http://localhost:8080${product.imageUrl}`}
                        alt={product.name}
                        style={{ width: '100%', height: 'auto', objectFit: 'contain', borderRadius: '8px', maxHeight: '200px'}} />

                        <h3>{product.name}</h3>
                        <p><strong>Description:</strong> {product.description}</p>
                        <p><strong>Price:</strong> {product.price} MAD</p>
                        <p><strong>Quantity:</strong> {product.quantity}</p>  
                        <p><strong>Category:</strong> {product.categoryName || 'N/A'}</p>                                              
                        <p><strong>Created:</strong> {new Date(product.createdAt).toLocaleString()}</p>                      
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;