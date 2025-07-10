import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

function ProductDetails() {
    const { id } = useParams(); 
    const { token } = useAuth();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const res = await fetch(`http://localhost:8080/api/products/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const json = await res.json();
                setProduct(json.data);
            } catch (error) {
                console.error('Failed to fetch product:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [id, token]);

    if (loading) return <div>Loading product...</div>;
    if (!product) return <div>Product not found.</div>;

    return (
        <div style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '15px' }}>
            <img
                src={`http://localhost:8080${product.imageUrl}`}
                alt={product.name}
                style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    borderRadius: '8px',
                    maxHeight: '200px'
                }}
            />
            <h3>{product.name}</h3>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Price:</strong> {product.price} MAD</p>
            <p><strong>Quantity:</strong> {product.quantity}</p>
            <p><strong>Category:</strong> {product.categoryName || 'N/A'}</p>
            <p><strong>Created:</strong> {new Date(product.createdAt).toLocaleString()}</p>
        </div>
    );
}

export default ProductDetails;
